/**
 * nubitlan-api Worker — see wrangler.toml for routing and deployment.
 *
 * GET  /api/email-security?domain=example.com[&selector=s1]
 * POST /api/solicitud   (flyer landing-page form; see src/landing/solicitud-api.ts)
 *
 * The analysis lives in src/tools/email-security/analyze.ts so `npm run dev`
 * (Vite middleware) and this Worker run exactly the same code.
 *
 * CORS is open: the endpoint only reads public DNS, and Vercel PR previews
 * call it cross-origin from *.vercel.app.
 *
 * Abuse protection: responses are cached at the edge for five minutes per
 * domain/selector. For stricter limits, add a rate-limiting rule on /api/* in
 * the Cloudflare dashboard (Security → WAF → Rate limiting rules).
 */

import { analyzeEmailSecurity, InputError } from '../src/tools/email-security/analyze'
import { handleSolicitud, type SolicitudEnv } from '../src/landing/solicitud-api'

const CACHE_SECONDS = 300

const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-max-age': '86400',
}

function json(body: unknown, status: number, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-robots-tag': 'noindex',
      ...CORS_HEADERS,
      ...extra,
    },
  })
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
}

async function emailSecurity(request: Request, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url)
  const domain = url.searchParams.get('domain') ?? ''
  const selector = url.searchParams.get('selector')

  // Normalise the cache key so `Empresa.com` and `empresa.com` share an entry.
  const cacheKey = new Request(
    `${url.origin}/api/email-security?domain=${encodeURIComponent(domain.trim().toLowerCase())}` +
      `&selector=${encodeURIComponent(selector?.trim().toLowerCase() ?? '')}`
  )
  const cache = (caches as unknown as { default: Cache }).default
  const cached = await cache.match(cacheKey)
  if (cached) return cached

  try {
    const report = await analyzeEmailSecurity(domain, selector)
    const response = json(report, 200, { 'cache-control': `public, max-age=${CACHE_SECONDS}` })
    ctx.waitUntil(cache.put(cacheKey, response.clone()))
    return response
  } catch (error) {
    if (error instanceof InputError) return json({ error: error.message }, 400)
    console.error('email-security failed', error)
    return json(
      { error: 'No pudimos consultar el DNS en este momento. Intenta de nuevo en unos segundos.' },
      502
    )
  }
}

export default {
  async fetch(request: Request, env: SolicitudEnv, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url)

    // Has its own origin-restricted CORS, so it is routed before the open
    // OPTIONS handler below.
    if (pathname === '/api/solicitud') {
      const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
      return handleSolicitud(request, env, ip)
    }

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS })

    if (pathname === '/api/email-security') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET, OPTIONS' })
      return emailSecurity(request, ctx)
    }

    return json({ error: 'Not found' }, 404)
  },
}
