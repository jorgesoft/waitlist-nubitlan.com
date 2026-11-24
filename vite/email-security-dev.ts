import type { Plugin } from 'vite'

/**
 * Serves GET /api/email-security during `vite dev`, mirroring the Cloudflare
 * Pages Function in `functions/api/email-security.ts`. Both call the same
 * analysis module, so local results match production.
 *
 * To run the real Pages runtime locally instead:
 *   npm run build && npx wrangler pages dev dist
 */
export function emailSecurityDevApi(): Plugin {
  return {
    name: 'nubitlan:email-security-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/email-security', async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status
          res.setHeader('content-type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(body))
        }

        try {
          const url = new URL(req.url ?? '', 'http://localhost')
          const { analyzeEmailSecurity, InputError } = (await server.ssrLoadModule(
            '/src/tools/email-security/analyze.ts'
          )) as {
            analyzeEmailSecurity(domain: string, selector: string | null): Promise<unknown>
            InputError: new (...args: never[]) => Error
          }

          try {
            send(200, await analyzeEmailSecurity(url.searchParams.get('domain') ?? '', url.searchParams.get('selector')))
          } catch (error) {
            if (error instanceof InputError) send(400, { error: error.message })
            else throw error
          }
        } catch (error) {
          server.config.logger.error(`[email-security] ${String(error)}`)
          send(502, { error: 'No pudimos consultar el DNS en este momento.' })
        }
      })
    },
  }
}
