/**
 * Cloudflare Pages Function: GET /api/email-security?domain=example.com[&selector=s1]
 *
 * Deployed automatically by Cloudflare Pages from the `functions/` directory.
 * The analysis itself lives in `src/tools/email-security/analyze.ts` so the
 * Vite dev server can run the exact same code locally.
 *
 * Abuse protection: responses are cached at the edge for five minutes per
 * domain/selector pair. For stricter limits, add a Cloudflare rate-limiting
 * rule on `/api/*` in the dashboard (Security → WAF → Rate limiting rules).
 */

import {
  analyzeEmailSecurity,
  InputError,
} from '../../src/tools/email-security/analyze'

const CACHE_SECONDS = 300

function json(body: unknown, status: number, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-robots-tag': 'noindex',
      ...extra,
    },
  })
}

interface Context {
  request: Request
  waitUntil(promise: Promise<unknown>): void
}

export async function onRequestGet(context: Context): Promise<Response> {
  const url = new URL(context.request.url)
  const domain = url.searchParams.get('domain') ?? ''
  const selector = url.searchParams.get('selector')

  // Normalise the cache key so `Empresa.com` and `empresa.com` share an entry.
  const cacheKey = new Request(
    `${url.origin}/api/email-security?domain=${encodeURIComponent(domain.trim().toLowerCase())}&selector=${encodeURIComponent(selector?.trim().toLowerCase() ?? '')}`
  )
  const cache = (caches as unknown as { default: Cache }).default
  const cached = await cache.match(cacheKey)
  if (cached) return cached

  try {
    const report = await analyzeEmailSecurity(domain, selector)
    const response = json(report, 200, {
      'cache-control': `public, max-age=${CACHE_SECONDS}`,
    })
    context.waitUntil(cache.put(cacheKey, response.clone()))
    return response
  } catch (error) {
    if (error instanceof InputError) {
      return json({ error: error.message }, 400)
    }
    console.error('email-security failed', error)
    return json(
      { error: 'No pudimos consultar el DNS en este momento. Intenta de nuevo en unos segundos.' },
      502
    )
  }
}
