import type { Plugin } from 'vite'

/**
 * Serves POST /api/solicitud during `vite dev`, mirroring the Cloudflare
 * Worker in `worker/index.ts`. Both run src/landing/solicitud-api.ts, so the
 * validation, honeypot and rate limit behave the same locally.
 */
export function solicitudDevApi(): Plugin {
  return {
    name: 'nubitlan:solicitud-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/solicitud', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)

          const headers = new Headers()
          for (const [name, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(name, value)
          }

          const request = new Request('http://localhost/api/solicitud', {
            method: req.method,
            headers,
            body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
          })

          const { handleSolicitud } = (await server.ssrLoadModule('/src/landing/solicitud-api.ts')) as {
            handleSolicitud(request: Request, env: object, ip: string): Promise<Response>
          }
          const response = await handleSolicitud(
            request,
            { NOTIFY_TO: 'contact@nubitlan.com' },
            req.socket.remoteAddress ?? 'local'
          )

          res.statusCode = response.status
          response.headers.forEach((value, name) => res.setHeader(name, value))
          res.end(await response.text())
        } catch (error) {
          server.config.logger.error(`[solicitud] ${String(error)}`)
          res.statusCode = 500
          res.end('{"error":"Error interno."}')
        }
      })
    },
  }
}
