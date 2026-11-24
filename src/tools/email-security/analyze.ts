/**
 * Email security analysis: SPF, DKIM and DMARC.
 *
 * Runtime-agnostic on purpose — it only needs `fetch`, so the same module runs
 * in the Cloudflare Pages Function (`functions/api/email-security.ts`) in
 * production and in the Vite dev-server middleware (`vite.config.ts`) locally.
 * It must not import anything browser- or React-specific.
 *
 * DNS is resolved over HTTPS against Cloudflare's public resolver, which works
 * the same from a Worker and from Node.
 *
 * Subrequest budget: Workers on the free plan allow 50 subrequests per
 * invocation. One analysis uses at most
 *   1 (MX) + 1 (TXT) + 1 (DMARC) + MAX_SPF_LOOKUPS + DKIM selectors + 1 (custom)
 * which stays well under that limit.
 */

const DOH_ENDPOINT = 'https://cloudflare-dns.com/dns-query'

/** RFC 7208 §4.6.4: evaluating SPF may not take more than 10 DNS lookups. */
const SPF_LOOKUP_LIMIT = 10
const MAX_SPF_LOOKUPS = SPF_LOOKUP_LIMIT + 1

/**
 * DKIM selectors cannot be enumerated from DNS, so we probe the ones the most
 * common providers use. Order is irrelevant; they run in parallel.
 */
export const COMMON_DKIM_SELECTORS = [
  'google', // Google Workspace
  'selector1', // Microsoft 365
  'selector2', // Microsoft 365
  'default',
  'dkim',
  'mail',
  'k1', // Mailchimp / Mandrill
  'k2',
  's1', // SendGrid
  's2',
  'smtp',
  'zoho', // Zoho Mail
  'zmail',
  'protonmail', // Proton
  'fm1', // Fastmail
  'sig1', // iCloud custom domains
  'mxvault',
  'everlytickey1',
] as const

export type Status = 'pass' | 'warn' | 'fail'

export interface Finding {
  status: Status
  message: string
}

export interface SpfResult {
  status: Status
  record: string | null
  lookups: number
  findings: Finding[]
}

export interface DkimSelectorResult {
  selector: string
  record: string
  keyType: string
  /** Estimated RSA key size in bits; null for non-RSA or unparsable keys. */
  keyBits: number | null
  revoked: boolean
}

export interface DkimResult {
  status: Status
  selectors: DkimSelectorResult[]
  checked: string[]
  findings: Finding[]
}

export interface DmarcResult {
  status: Status
  record: string | null
  policy: string | null
  findings: Finding[]
}

export interface EmailSecurityReport {
  domain: string
  checkedAt: string
  mx: string[]
  spf: SpfResult
  dkim: DkimResult
  dmarc: DmarcResult
  /** 0–100, weighted across the three checks. */
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
}

export class InputError extends Error {}

// --------------------------------------------------------------------------
// DNS
// --------------------------------------------------------------------------

const DNS_TYPE = { TXT: 16, MX: 15 } as const

interface DohAnswer {
  name: string
  type: number
  data: string
}

interface DohResponse {
  Status: number
  Answer?: DohAnswer[]
}

async function resolve(name: string, type: keyof typeof DNS_TYPE): Promise<string[]> {
  const url = `${DOH_ENDPOINT}?name=${encodeURIComponent(name)}&type=${type}`
  const response = await fetch(url, {
    headers: { accept: 'application/dns-json' },
  })

  if (!response.ok) {
    throw new Error(`DNS lookup failed for ${name} (${response.status})`)
  }

  const body = (await response.json()) as DohResponse
  // NXDOMAIN (3) and NOERROR-without-answers both mean "no record".
  if (body.Status !== 0 || !body.Answer) return []

  // A CNAME chain (common for Microsoft 365 DKIM) comes back as several
  // answers; keep only the records of the type we asked for.
  return body.Answer.filter((answer) => answer.type === DNS_TYPE[type]).map(
    (answer) => answer.data
  )
}

/**
 * DoH returns TXT data as one or more quoted chunks: `"v=spf1 " "include:…"`.
 * Records longer than 255 bytes are split, so the chunks must be joined.
 */
function joinTxt(data: string): string {
  const chunks = data.match(/"((?:[^"\\]|\\.)*)"/g)
  if (!chunks) return data.trim()
  return chunks.map((chunk) => chunk.slice(1, -1).replace(/\\(.)/g, '$1')).join('')
}

async function resolveTxt(name: string): Promise<string[]> {
  return (await resolve(name, 'TXT')).map(joinTxt)
}

// --------------------------------------------------------------------------
// Input
// --------------------------------------------------------------------------

const HOSTNAME_PATTERN =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{0,61}[a-z0-9]$/

/**
 * Accepts a bare domain, an email address or a URL and returns the domain.
 * Internationalised names are converted to punycode by the URL parser.
 */
export function normalizeDomain(input: string): string {
  let value = input.trim().toLowerCase()
  if (!value) throw new InputError('Escribe un dominio, por ejemplo empresa.com.')

  if (value.includes('@')) value = value.slice(value.lastIndexOf('@') + 1)

  let hostname: string
  try {
    hostname = new URL(value.includes('://') ? value : `http://${value}`).hostname
  } catch {
    throw new InputError('Ese dominio no parece válido.')
  }

  hostname = hostname.replace(/\.$/, '').replace(/^www\./, '')

  if (!HOSTNAME_PATTERN.test(hostname)) {
    throw new InputError('Ese dominio no parece válido.')
  }

  return hostname
}

const SELECTOR_PATTERN = /^[a-z0-9](?:[a-z0-9._-]{0,62})$/i

export function normalizeSelector(input: string | null | undefined): string | null {
  const value = input?.trim().toLowerCase()
  if (!value) return null
  if (!SELECTOR_PATTERN.test(value)) {
    throw new InputError('El selector DKIM solo puede tener letras, números, puntos y guiones.')
  }
  return value
}

// --------------------------------------------------------------------------
// SPF
// --------------------------------------------------------------------------

/** Mechanisms and modifiers that cost a DNS lookup (RFC 7208 §4.6.4). */
const LOOKUP_TERMS = /^[+\-~?]?(include:|a\b|a:|a\/|mx\b|mx:|mx\/|ptr\b|ptr:|exists:)|^redirect=/i

function isSpf(record: string): boolean {
  return /^v=spf1(\s|$)/i.test(record)
}

/**
 * Counts the DNS lookups an SPF evaluation would make, following `include:`
 * and `redirect=` recursively. Stops once the limit is exceeded — past that
 * point the record already fails, and we stay within the subrequest budget.
 */
async function countSpfLookups(
  record: string,
  state: { lookups: number; fetched: number; visited: Set<string>; problems: string[] }
): Promise<void> {
  const terms = record.split(/\s+/).slice(1)

  for (const term of terms) {
    if (!LOOKUP_TERMS.test(term)) continue
    state.lookups += 1
    if (state.lookups > SPF_LOOKUP_LIMIT) return

    const target = term.match(/^[+\-~?]?include:(.+)$/i)?.[1] ?? term.match(/^redirect=(.+)$/i)?.[1]
    if (!target) continue

    const name = target.toLowerCase()
    if (state.visited.has(name)) {
      state.problems.push(`${name} se incluye más de una vez (posible bucle).`)
      continue
    }
    state.visited.add(name)

    if (state.fetched >= MAX_SPF_LOOKUPS) return
    state.fetched += 1

    let nested: string[]
    try {
      nested = (await resolveTxt(name)).filter(isSpf)
    } catch {
      state.problems.push(`No se pudo consultar ${name}.`)
      continue
    }

    if (nested.length === 0) {
      state.problems.push(`${name} no publica un registro SPF, así que ese include falla.`)
      continue
    }

    await countSpfLookups(nested[0], state)
  }
}

async function analyzeSpf(txt: string[]): Promise<SpfResult> {
  const records = txt.filter(isSpf)
  const findings: Finding[] = []

  if (records.length === 0) {
    return {
      status: 'fail',
      record: null,
      lookups: 0,
      findings: [
        {
          status: 'fail',
          message:
            'No hay registro SPF. Cualquier servidor puede enviar correo diciendo ser tu dominio.',
        },
      ],
    }
  }

  if (records.length > 1) {
    findings.push({
      status: 'fail',
      message: `Hay ${records.length} registros SPF. Solo puede existir uno; con más, SPF falla siempre.`,
    })
  }

  const record = records[0]
  const terms = record.toLowerCase().split(/\s+/)
  const all = terms.find((term) => /^[+\-~?]?all$/.test(term))
  const hasRedirect = terms.some((term) => term.startsWith('redirect='))

  if (all === '-all') {
    findings.push({ status: 'pass', message: 'Termina en -all: rechaza a los remitentes no autorizados.' })
  } else if (all === '~all') {
    findings.push({
      status: 'pass',
      message: 'Termina en ~all (softfail). Es aceptable si DMARC está en quarantine o reject.',
    })
  } else if (all === '?all') {
    findings.push({ status: 'fail', message: 'Termina en ?all (neutral): no protege contra suplantación.' })
  } else if (all === 'all' || all === '+all') {
    findings.push({
      status: 'fail',
      message: 'Termina en +all: autoriza a cualquier servidor del mundo a enviar como tu dominio.',
    })
  } else if (!hasRedirect) {
    findings.push({
      status: 'warn',
      message: 'No tiene un mecanismo "all" final. Agrega -all o ~all al final del registro.',
    })
  }

  if (terms.some((term) => /^[+\-~?]?ptr/.test(term))) {
    findings.push({ status: 'warn', message: 'Usa el mecanismo ptr, que el estándar desaconseja por lento y poco fiable.' })
  }

  const state = { lookups: 0, fetched: 0, visited: new Set<string>(), problems: [] as string[] }
  await countSpfLookups(record, state)

  if (state.lookups > SPF_LOOKUP_LIMIT) {
    findings.push({
      status: 'fail',
      message: `Requiere más de ${SPF_LOOKUP_LIMIT} consultas DNS. Los receptores lo tratan como error (permerror).`,
    })
  } else if (state.lookups >= 8) {
    findings.push({
      status: 'warn',
      message: `Usa ${state.lookups} de ${SPF_LOOKUP_LIMIT} consultas DNS permitidas. Estás cerca del límite.`,
    })
  } else {
    findings.push({ status: 'pass', message: `Usa ${state.lookups} de ${SPF_LOOKUP_LIMIT} consultas DNS permitidas.` })
  }

  for (const problem of state.problems) findings.push({ status: 'warn', message: problem })

  return {
    status: worst(findings),
    record,
    lookups: Math.min(state.lookups, SPF_LOOKUP_LIMIT + 1),
    findings,
  }
}

// --------------------------------------------------------------------------
// DKIM
// --------------------------------------------------------------------------

function parseTags(record: string): Map<string, string> {
  const tags = new Map<string, string>()
  for (const part of record.split(';')) {
    const index = part.indexOf('=')
    if (index === -1) continue
    const key = part.slice(0, index).trim().toLowerCase()
    const value = part.slice(index + 1).trim()
    if (key) tags.set(key, value)
  }
  return tags
}

/**
 * Estimates the RSA modulus size from a base64 SubjectPublicKeyInfo blob.
 * The DER overhead is ~38 bytes, so the decoded length lands close to the
 * key size in bytes; snapping to the usual sizes is accurate enough here.
 */
function estimateRsaBits(base64: string): number | null {
  const clean = base64.replace(/\s+/g, '')
  if (!clean) return null
  const bytes = Math.floor((clean.length * 3) / 4) - (clean.match(/=+$/)?.[0].length ?? 0)
  if (bytes >= 540) return 4096
  if (bytes >= 290) return 2048
  if (bytes >= 160) return 1024
  if (bytes >= 90) return 512
  return null
}

async function probeSelector(domain: string, selector: string): Promise<DkimSelectorResult | null> {
  let records: string[]
  try {
    records = await resolveTxt(`${selector}._domainkey.${domain}`)
  } catch {
    return null
  }

  const record = records.find((value) => /(^|;)\s*(v=DKIM1|k=|p=)/i.test(value))
  if (!record) return null

  const tags = parseTags(record)
  const keyType = (tags.get('k') ?? 'rsa').toLowerCase()
  const publicKey = tags.get('p') ?? ''

  return {
    selector,
    record,
    keyType,
    keyBits: keyType === 'rsa' ? estimateRsaBits(publicKey) : null,
    revoked: publicKey.length === 0,
  }
}

async function analyzeDkim(domain: string, customSelector: string | null): Promise<DkimResult> {
  const checked: string[] = [...COMMON_DKIM_SELECTORS]
  if (customSelector && !checked.includes(customSelector)) checked.unshift(customSelector)

  const results = await Promise.all(checked.map((selector) => probeSelector(domain, selector)))
  let selectors = results.filter((result): result is DkimSelectorResult => result !== null)

  // A wildcard `*._domainkey` record answers for every selector. Report it
  // once instead of as eighteen identical keys.
  if (selectors.length >= 3 && selectors.every((s) => s.record === selectors[0].record)) {
    selectors = [{ ...selectors[0], selector: '*' }]
  }
  const active = selectors.filter((selector) => !selector.revoked)
  const findings: Finding[] = []

  if (active.length === 0) {
    findings.push({
      status: 'fail',
      message: customSelector
        ? `No encontramos una llave DKIM activa con el selector "${customSelector}" ni con los selectores comunes.`
        : 'No encontramos llaves DKIM en los selectores comunes. Si usas otro proveedor, indica tu selector.',
    })
  } else {
    findings.push({
      status: 'pass',
      message: `Encontramos ${active.length} llave${active.length === 1 ? '' : 's'} DKIM activa${active.length === 1 ? '' : 's'}.`,
    })
  }

  for (const selector of active) {
    if (selector.keyBits !== null && selector.keyBits < 2048) {
      findings.push({
        status: selector.keyBits < 1024 ? 'fail' : 'warn',
        message: `La llave "${selector.selector}" es de ~${selector.keyBits} bits. Se recomienda 2048 bits.`,
      })
    }
  }

  for (const selector of selectors.filter((s) => s.revoked)) {
    findings.push({
      status: 'pass',
      message: `La llave "${selector.selector}" está revocada (p= vacío), lo cual es correcto si ya no se usa.`,
    })
  }

  return { status: worst(findings), selectors, checked, findings }
}

// --------------------------------------------------------------------------
// DMARC
// --------------------------------------------------------------------------

async function analyzeDmarc(domain: string): Promise<DmarcResult> {
  const records = (await resolveTxt(`_dmarc.${domain}`)).filter((value) =>
    /^v=DMARC1(\s*;|\s*$)/i.test(value)
  )
  const findings: Finding[] = []

  if (records.length === 0) {
    return {
      status: 'fail',
      record: null,
      policy: null,
      findings: [
        {
          status: 'fail',
          message:
            'No hay registro DMARC. Los receptores no saben qué hacer con correos que suplantan tu dominio, y no recibes reportes.',
        },
      ],
    }
  }

  if (records.length > 1) {
    findings.push({
      status: 'fail',
      message: `Hay ${records.length} registros DMARC. Con más de uno, los receptores ignoran DMARC por completo.`,
    })
  }

  const record = records[0]
  const tags = parseTags(record)
  const policy = tags.get('p')?.toLowerCase() ?? null

  if (policy === 'reject') {
    findings.push({ status: 'pass', message: 'Política p=reject: los correos que suplantan tu dominio se rechazan.' })
  } else if (policy === 'quarantine') {
    findings.push({ status: 'pass', message: 'Política p=quarantine: los correos sospechosos van a spam.' })
  } else if (policy === 'none') {
    findings.push({
      status: 'warn',
      message: 'Política p=none: solo monitorea, no protege. Úsala como paso temporal antes de quarantine o reject.',
    })
  } else {
    findings.push({ status: 'fail', message: 'Falta la etiqueta p= o tiene un valor inválido.' })
  }

  const subdomainPolicy = tags.get('sp')?.toLowerCase()
  if (subdomainPolicy === 'none' && policy !== 'none') {
    findings.push({ status: 'warn', message: 'sp=none deja los subdominios sin protección.' })
  }

  const pct = tags.get('pct')
  if (pct !== undefined && Number(pct) < 100) {
    findings.push({ status: 'warn', message: `pct=${pct}: la política solo se aplica al ${pct}% de los correos.` })
  }

  if (tags.get('rua')) {
    findings.push({ status: 'pass', message: 'Recibe reportes agregados (rua), así puedes ver quién envía en tu nombre.' })
  } else {
    findings.push({
      status: 'warn',
      message: 'No define rua=: no recibes reportes de quién está enviando correo con tu dominio.',
    })
  }

  return { status: worst(findings), record, policy, findings }
}

// --------------------------------------------------------------------------
// Report
// --------------------------------------------------------------------------

function worst(findings: Finding[]): Status {
  if (findings.some((finding) => finding.status === 'fail')) return 'fail'
  if (findings.some((finding) => finding.status === 'warn')) return 'warn'
  return 'pass'
}

const STATUS_POINTS: Record<Status, number> = { pass: 1, warn: 0.5, fail: 0 }

function scoreReport(spf: SpfResult, dkim: DkimResult, dmarc: DmarcResult): number {
  // DMARC carries the most weight: without it, SPF and DKIM alone do not stop
  // spoofing of the visible From address.
  // A p=none policy protects nothing, so it scores well below enforcement.
  const policyPoints: Record<string, number> = { reject: 1, quarantine: 0.85, none: 0.3 }
  const dmarcPoints =
    dmarc.status === 'fail'
      ? 0
      : (policyPoints[dmarc.policy ?? ''] ?? 0) * (dmarc.status === 'pass' ? 1 : 0.9)

  return Math.round(
    STATUS_POINTS[spf.status] * 30 + STATUS_POINTS[dkim.status] * 30 + dmarcPoints * 40
  )
}

function gradeFor(score: number): EmailSecurityReport['grade'] {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 55) return 'C'
  if (score >= 35) return 'D'
  return 'F'
}

export async function analyzeEmailSecurity(
  rawDomain: string,
  rawSelector?: string | null
): Promise<EmailSecurityReport> {
  const domain = normalizeDomain(rawDomain)
  const selector = normalizeSelector(rawSelector)

  const [mx, txt, dmarc, dkim] = await Promise.all([
    resolve(domain, 'MX').then((records) =>
      records
        .map((record) => record.split(/\s+/).pop()?.replace(/\.$/, '') ?? '')
        .filter(Boolean)
    ),
    resolveTxt(domain),
    analyzeDmarc(domain),
    analyzeDkim(domain, selector),
  ])

  const spf = await analyzeSpf(txt)

  // A domain that never sends mail needs no DKIM key: "v=spf1 -all" plus a
  // DMARC reject policy is the complete, correct setup.
  const sendsNoMail = mx.length === 0 && spf.record?.trim().toLowerCase() === 'v=spf1 -all'
  if (sendsNoMail && dkim.status === 'fail') {
    dkim.status = 'pass'
    dkim.findings = [
      {
        status: 'pass',
        message: 'El dominio no recibe ni envía correo (SPF -all, sin MX), así que no necesita DKIM.',
      },
    ]
  }

  const score = scoreReport(spf, dkim, dmarc)

  return {
    domain,
    checkedAt: new Date().toISOString(),
    mx,
    spf,
    dkim,
    dmarc,
    score,
    grade: gradeFor(score),
  }
}
