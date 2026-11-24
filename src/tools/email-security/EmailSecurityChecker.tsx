import * as React from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  Loader2Icon,
  MailIcon,
  SearchIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { EmailSecurityReport, Finding, Status } from './analyze'

/**
 * Served by the `nubitlan-api` Cloudflare Worker (worker/) on the
 * nubitlan.com/api/* route. Production calls it same-origin; any other
 * build (Vercel previews, GitHub Pages) calls the production URL, which
 * allows CORS. `npm run dev` serves it locally through a Vite middleware.
 * Override with VITE_EMAIL_SECURITY_API, e.g. to point at `npm run api:dev`.
 */
const ENDPOINT =
  import.meta.env.VITE_EMAIL_SECURITY_API ??
  (import.meta.env.DEV ||
  (typeof window !== 'undefined' && window.location.hostname === 'nubitlan.com')
    ? '/api/email-security'
    : 'https://nubitlan.com/api/email-security')

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'done'; report: EmailSecurityReport }

const STATUS_STYLE: Record<Status, { icon: typeof CheckCircle2Icon; text: string; label: string; ring: string }> = {
  pass: { icon: CheckCircle2Icon, text: 'text-success', label: 'Correcto', ring: 'border-success/40 bg-success/10' },
  warn: {
    icon: TriangleAlertIcon,
    text: 'text-warning-foreground dark:text-warning',
    label: 'Mejorable',
    ring: 'border-warning/45 bg-warning/15',
  },
  fail: { icon: XCircleIcon, text: 'text-destructive', label: 'Problema', ring: 'border-destructive/35 bg-destructive/10' },
}

const GRADE_COPY: Record<EmailSecurityReport['grade'], string> = {
  A: 'Tu dominio está bien protegido contra la suplantación.',
  B: 'Buena base, con algunos ajustes pendientes.',
  C: 'Protección parcial: todavía es posible suplantar tu dominio en algunos casos.',
  D: 'Protección débil: es fácil enviar correos falsos en nombre de tu empresa.',
  F: 'Sin protección efectiva: cualquiera puede enviar correo como tu dominio.',
}

async function fetchReport(domain: string, selector: string): Promise<EmailSecurityReport> {
  const params = new URLSearchParams({ domain })
  if (selector) params.set('selector', selector)

  let response: Response
  try {
    response = await fetch(`${ENDPOINT}?${params}`)
  } catch {
    throw new Error('No hay conexión con el servidor. Revisa tu internet e intenta de nuevo.')
  }

  // An HTML body means the request reached the static site instead of the
  // Worker, i.e. the /api route is not deployed where this page is served.
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('La revisión no está disponible en este momento. Intenta más tarde.')
  }

  const body = await response.json().catch(() => null)
  if (!response.ok || !body) {
    throw new Error(body?.error ?? 'No pudimos completar la revisión. Intenta de nuevo.')
  }
  return body as EmailSecurityReport
}

function EmailSecurityChecker() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [domain, setDomain] = React.useState(searchParams.get('d') ?? '')
  const [selector, setSelector] = React.useState(searchParams.get('s') ?? '')
  const [showAdvanced, setShowAdvanced] = React.useState(Boolean(searchParams.get('s')))
  const [state, setState] = React.useState<State>({ kind: 'idle' })
  const resultRef = React.useRef<HTMLDivElement>(null)

  const run = React.useCallback(async (targetDomain: string, targetSelector: string) => {
    setState({ kind: 'loading' })
    try {
      const report = await fetchReport(targetDomain, targetSelector)
      setState({ kind: 'done', report })
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch (error) {
      setState({ kind: 'error', message: error instanceof Error ? error.message : String(error) })
    }
  }, [])

  // A shared link such as /correo?d=empresa.com runs the check on load.
  const initialDomain = React.useRef(searchParams.get('d'))
  React.useEffect(() => {
    if (initialDomain.current) run(initialDomain.current, searchParams.get('s') ?? '')
    // Only on first mount; later checks are triggered by the form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!domain.trim()) return
    const next = new URLSearchParams({ d: domain.trim() })
    if (selector.trim()) next.set('s', selector.trim())
    setSearchParams(next, { replace: true })
    run(domain, selector)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
        <CardContent className="p-5 sm:p-7">
          <form onSubmit={onSubmit} noValidate>
            <Label htmlFor="email-domain" className="eyebrow text-muted-foreground">
              Dominio o correo
            </Label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Input
                id="email-domain"
                name="domain"
                inputMode="url"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="empresa.com o tu@empresa.com"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                className="h-12 font-mono text-base"
                aria-describedby="email-domain-hint"
              />
              <Button type="submit" variant="pixel" size="lg" className="h-12" disabled={state.kind === 'loading'}>
                {state.kind === 'loading' ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}
                Revisar
              </Button>
            </div>
            <p id="email-domain-hint" className="text-muted-foreground mt-2 text-xs">
              Solo consultamos registros DNS públicos. No enviamos correos ni guardamos el dominio.
            </p>

            <button
              type="button"
              onClick={() => setShowAdvanced((open) => !open)}
              className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              aria-expanded={showAdvanced}
              aria-controls="dkim-selector-field"
            >
              <ChevronDownIcon className={cn('size-4 transition-transform', showAdvanced && 'rotate-180')} />
              Selector DKIM personalizado
            </button>
            {showAdvanced ? (
              <div id="dkim-selector-field" className="mt-3">
                <Label htmlFor="dkim-selector" className="text-sm">
                  Selector (opcional)
                </Label>
                <Input
                  id="dkim-selector"
                  value={selector}
                  onChange={(event) => setSelector(event.target.value)}
                  placeholder="por ejemplo: s1, mail, 20230601"
                  className="mt-1.5 font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="text-muted-foreground mt-1.5 text-xs">
                  Lo encuentras en la cabecera <code>DKIM-Signature</code> de un correo que hayas enviado,
                  en la etiqueta <code>s=</code>.
                </p>
              </div>
            ) : null}
          </form>
        </CardContent>
      </Card>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.kind === 'error' ? (
          <div role="alert" className="border-destructive/35 bg-destructive/10 rounded-xl border-2 p-5 text-sm">
            {state.message}
          </div>
        ) : null}
        {state.kind === 'done' ? <Report report={state.report} /> : null}
      </div>

      <Guide />
    </div>
  )
}

/**
 * Plain-language explainer. Doubles as indexable content for searches such
 * as "qué es DMARC", which the interactive tool alone would not rank for.
 */
function Guide() {
  return (
    <section className="prose-sm pt-8" aria-labelledby="email-guide-title">
      <h2 id="email-guide-title" className="text-2xl font-extrabold tracking-tight">
        ¿Qué son SPF, DKIM y DMARC?
      </h2>
      <p className="text-muted-foreground mt-3 leading-relaxed">
        Son tres registros DNS que, juntos, evitan que alguien envíe correos falsos usando el nombre de tu
        empresa. Es la base contra el phishing que suplanta a gerencia, proveedores o tu propio banco.
      </p>
      <dl className="mt-6 space-y-5">
        <div>
          <dt className="font-mono font-bold">SPF</dt>
          <dd className="text-muted-foreground mt-1 leading-relaxed">
            Lista los servidores autorizados a enviar correo con tu dominio (por ejemplo, Microsoft 365 o
            Google Workspace). Debe ser un único registro y terminar en <code>-all</code> o <code>~all</code>.
          </dd>
        </div>
        <div>
          <dt className="font-mono font-bold">DKIM</dt>
          <dd className="text-muted-foreground mt-1 leading-relaxed">
            Firma cada correo con una llave criptográfica. El receptor verifica la firma con la llave pública
            publicada en tu DNS, así sabe que el mensaje no fue alterado. Usa llaves de 2048 bits.
          </dd>
        </div>
        <div>
          <dt className="font-mono font-bold">DMARC</dt>
          <dd className="text-muted-foreground mt-1 leading-relaxed">
            Le dice al receptor qué hacer cuando un correo falla SPF y DKIM: dejarlo pasar (<code>p=none</code>),
            mandarlo a spam (<code>p=quarantine</code>) o rechazarlo (<code>p=reject</code>). También te envía
            reportes de quién está usando tu dominio. Empieza con <code>p=none</code> y un <code>rua=</code>,
            revisa los reportes unas semanas y luego sube a <code>quarantine</code> y <code>reject</code>.
          </dd>
        </div>
      </dl>
    </section>
  )
}

function Report({ report }: { report: EmailSecurityReport }) {
  const gradeTone = report.grade === 'A' || report.grade === 'B' ? 'pass' : report.grade === 'C' ? 'warn' : 'fail'

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
          <div
            className={cn(
              'flex size-20 shrink-0 items-center justify-center rounded-xl border-2 font-mono text-4xl font-extrabold',
              STATUS_STYLE[gradeTone].ring,
              STATUS_STYLE[gradeTone].text
            )}
            aria-label={`Calificación ${report.grade}`}
          >
            {report.grade}
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">
              {report.domain} · {report.score}/100
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-balance">{GRADE_COPY[report.grade]}</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              {report.mx.length > 0
                ? `Recibe correo en ${report.mx[0]}${report.mx.length > 1 ? ` y ${report.mx.length - 1} servidor(es) más` : ''}.`
                : 'Este dominio no tiene servidores de correo (MX).'}
            </p>
          </div>
        </CardContent>
      </Card>

      <CheckCard
        title="SPF"
        subtitle="Quién puede enviar correo por tu dominio"
        status={report.spf.status}
        record={report.spf.record}
        findings={report.spf.findings}
      />
      <CheckCard
        title="DKIM"
        subtitle="Firma criptográfica de tus correos"
        status={report.dkim.status}
        findings={report.dkim.findings}
        extra={
          report.dkim.selectors.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {report.dkim.selectors.map((selector) => (
                <li key={selector.selector} className="bg-muted rounded-lg p-3 font-mono text-xs break-all">
                  <span className="font-bold">{selector.selector}</span>
                  {' · '}
                  {selector.revoked
                    ? 'revocada'
                    : `${selector.keyType.toUpperCase()}${selector.keyBits ? ` ~${selector.keyBits} bits` : ''}`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground mt-3 text-xs">
              Revisamos {report.dkim.checked.length} selectores comunes: {report.dkim.checked.join(', ')}.
            </p>
          )
        }
      />
      <CheckCard
        title="DMARC"
        subtitle="Qué hacer con los correos que fallan"
        status={report.dmarc.status}
        record={report.dmarc.record}
        findings={report.dmarc.findings}
      />

      {report.grade !== 'A' ? (
        <div className="bg-sky-50 flex flex-col gap-4 rounded-xl border border-sky-200 p-5 sm:flex-row sm:items-center dark:border-sky-800 dark:bg-sky-950/50">
          <p className="flex-1 text-sm leading-relaxed">
            <strong className="font-semibold">¿Quieres que lo configuremos contigo?</strong> Corregir SPF, DKIM
            y DMARC sin interrumpir tu correo requiere cuidado. Te ayudamos a hacerlo paso a paso.
          </p>
          <Button asChild variant="pixelOutline">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                `Seguridad de correo para ${report.domain} (nota ${report.grade})`
              )}`}
            >
              <MailIcon />
              Escríbenos
            </a>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function CheckCard({
  title,
  subtitle,
  status,
  record,
  findings,
  extra,
}: {
  title: string
  subtitle: string
  status: Status
  record?: string | null
  findings: Finding[]
  extra?: React.ReactNode
}) {
  const style = STATUS_STYLE[status]
  const StatusIcon = style.icon

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-mono text-lg font-bold">{title}</h3>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-bold uppercase',
              style.ring,
              style.text
            )}
          >
            <StatusIcon className="size-3.5" aria-hidden="true" />
            {style.label}
          </span>
        </div>

        {record ? (
          <pre className="bg-muted mt-4 overflow-x-auto rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all">
            {record}
          </pre>
        ) : null}

        <ul className="mt-4 space-y-2.5">
          {findings.map((finding, index) => {
            const FindingIcon = STATUS_STYLE[finding.status].icon
            return (
              <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <FindingIcon
                  className={cn('mt-0.5 size-4 shrink-0', STATUS_STYLE[finding.status].text)}
                  aria-label={STATUS_STYLE[finding.status].label}
                />
                <span>{finding.message}</span>
              </li>
            )
          })}
        </ul>

        {extra}
      </CardContent>
    </Card>
  )
}

export default EmailSecurityChecker
