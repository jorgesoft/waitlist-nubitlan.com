import { formatNotification, parseSolicitud, type Solicitud } from './solicitud'

/**
 * POST /api/solicitud — the request form on /escuelas, /isp and /empresas.
 *
 * Runs in the `nubitlan-api` Cloudflare Worker (worker/index.ts) in
 * production and in the `vite dev` middleware locally (vite/solicitud-dev.ts),
 * so both apply the same validation, spam checks and rate limit.
 *
 * Spam and abuse:
 *  - Server-side validation of every field (src/landing/solicitud.ts); any
 *    field not on the form is dropped.
 *  - Honeypot input plus a minimum fill time. A bot that trips either gets a
 *    normal-looking success response and nothing is delivered.
 *  - Rate limit per client IP: the Worker's `SOLICITUD_LIMITER` binding when
 *    deployed (wrangler.toml), an in-memory window otherwise.
 *  - Only accepted from the site's own origins.
 */

export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>
}

export interface SolicitudEnv {
  /** Cloudflare Workers rate-limiting binding (see wrangler.toml). */
  SOLICITUD_LIMITER?: RateLimiter
  /** Where the notification email goes. Set in wrangler.toml [vars]. */
  NOTIFY_TO?: string
}

const ALLOWED_ORIGINS = [
  'https://nubitlan.com',
  'https://www.nubitlan.com',
  // GitHub Pages PR previews call the production API cross-origin.
  'https://jorgesoft.github.io',
]

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true // same-origin form posts from some browsers omit it
  if (ALLOWED_ORIGINS.includes(origin)) return true
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !isAllowedOrigin(origin)) return {}
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'origin',
  }
}

function json(body: unknown, status: number, origin: string | null, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex',
      ...corsHeaders(origin),
      ...extra,
    },
  })
}

/**
 * Fallback limiter for local dev and for a Worker deployed without the
 * binding: 5 requests per IP per 10 minutes, per isolate.
 */
const WINDOW_MS = 10 * 60 * 1000
const WINDOW_MAX = 5
const hits = new Map<string, number[]>()

const memoryLimiter: RateLimiter = {
  async limit({ key }) {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS)
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) hits.clear() // bound memory under a flood
    return { success: recent.length <= WINDOW_MAX }
  },
}

const MAX_BODY_BYTES = 8 * 1024

/**
 * PLACEHOLDER — where a valid submission goes.
 *
 * Not wired to a store or mail provider yet. Until it is, submissions are
 * written to the Worker log only (`npx wrangler tail nubitlan-api`, or
 * Workers → nubitlan-api → Logs in the Cloudflare dashboard), so nothing is
 * lost while the flyer campaign is being tested.
 *
 * To finish: store `data` (e.g. KV, D1 or Firestore) and email
 * `formatNotification(data)` to `env.NOTIFY_TO` (contact@nubitlan.com), e.g.
 * with Cloudflare's `send_email` binding or a provider such as Resend. Keep
 * the API key in a Worker secret (`npx wrangler secret put …`), never in
 * wrangler.toml. Throwing here makes the form show its error state and offer
 * WhatsApp instead.
 */
export async function deliverSolicitud(env: SolicitudEnv, data: Solicitud): Promise<void> {
  const { subject, text } = formatNotification(data, new Date())
  console.log(
    JSON.stringify({
      event: 'solicitud',
      notifyTo: env.NOTIFY_TO ?? 'contact@nubitlan.com',
      subject,
      text,
    })
  )
}

export async function handleSolicitud(
  request: Request,
  env: SolicitudEnv,
  clientIp: string
): Promise<Response> {
  const origin = request.headers.get('origin')

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }
  if (request.method !== 'POST') {
    return json({ error: 'Método no permitido.' }, 405, origin, { allow: 'POST, OPTIONS' })
  }
  if (!isAllowedOrigin(origin)) {
    return json({ error: 'Origen no permitido.' }, 403, origin)
  }

  const limiter = env.SOLICITUD_LIMITER ?? memoryLimiter
  const { success } = await limiter.limit({ key: `solicitud:${clientIp}` })
  if (!success) {
    return json(
      { error: 'Recibimos varias solicitudes desde su conexión. Espere unos minutos o escríbanos por WhatsApp.' },
      429,
      origin,
      { 'retry-after': '600' }
    )
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: 'La solicitud es demasiado grande.' }, 413, origin)
  }

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'No pudimos leer la solicitud.' }, 400, origin)
  }

  const result = parseSolicitud(body)
  if (!result.ok) {
    if ('spam' in result) return json({ ok: true }, 200, origin)
    return json({ error: 'Revise los campos marcados.', fields: result.errors }, 422, origin)
  }

  try {
    await deliverSolicitud(env, result.data)
  } catch (error) {
    console.error('solicitud delivery failed', error)
    return json(
      { error: 'No pudimos registrar su solicitud en este momento. Intente de nuevo o escríbanos por WhatsApp.' },
      502,
      origin
    )
  }

  return json({ ok: true }, 200, origin)
}
