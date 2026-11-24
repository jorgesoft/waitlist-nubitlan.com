import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer, type Plugin, type ResolvedConfig } from 'vite'

// Structural copies of the types in src/lib/seo.ts. Importing them would pull
// the app's sources (and its `@/` alias) into the Node tsconfig project.
interface HeadTag {
  tag: string
  attrs: Record<string, string>
  text?: string
}

interface PageMeta {
  path: string
  updated?: string
  priority?: number
}

interface SeoModule {
  prerenderPaths(): string[]
  resolveMeta(path: string): PageMeta
  headTags(meta: PageMeta): { title: string; tags: HeadTag[] }
  sitemapEntries(): PageMeta[]
}

/**
 * Writes one HTML file per route with that route's <head> already filled in,
 * plus sitemap.xml.
 *
 * The app is still a client-rendered SPA — every file boots the same bundle —
 * but crawlers and link-preview bots that do not run JavaScript now see the
 * correct title, description, canonical URL, social card and JSON-LD.
 *
 * Output layout: `/blog/post` → `dist/blog/post.html`. Cloudflare Pages (and
 * GitHub Pages) serve `x.html` at `/x` without a trailing-slash redirect.
 * Unknown paths fall through to Pages' SPA fallback (index.html), which works
 * because there is no top-level 404.html.
 *
 * Metadata comes from `src/lib/seo.ts`, loaded through a throwaway Vite SSR
 * server so its `@/` aliases, `import.meta.glob` and `?raw` imports resolve
 * exactly as in the app.
 */

const START = '<!-- seo:start -->'
const END = '<!-- seo:end -->'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

function renderTag({ tag, attrs, text }: HeadTag): string {
  const attributes = Object.entries(attrs)
    .map(([name, value]) => `${name}="${escapeAttr(value)}"`)
    .join(' ')
  if (tag === 'script') return `<script ${attributes} data-seo>${text ?? ''}</script>`
  return `<${tag} ${attributes} data-seo />`
}

function outputFile(routePath: string): string {
  return routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`
}

function renderSitemap(siteUrl: string, entries: PageMeta[]): string {
  const urls = entries.map((entry) => {
    const loc = `${siteUrl}${entry.path === '/' ? '/' : entry.path}`
    return [
      '  <url>',
      `    <loc>${escapeText(loc)}</loc>`,
      entry.updated ? `    <lastmod>${entry.updated}</lastmod>` : null,
      entry.priority !== undefined ? `    <priority>${entry.priority.toFixed(1)}</priority>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n')
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

/**
 * Preloads the Latin Inter file, which every page needs for its first paint.
 * Its name is content-hashed, so it can only be found after the bundle is
 * written.
 */
async function withFontPreload(html: string, outDir: string, base: string): Promise<string> {
  const assets = await fs.readdir(path.join(outDir, 'assets')).catch(() => [])
  const font = assets.find((file) => /^inter-latin-wght-normal-.*\.woff2$/.test(file))
  if (!font) return html
  const link = `<link rel="preload" href="${base}assets/${font}" as="font" type="font/woff2" crossorigin />`
  return html.replace('</head>', `    ${link}\n  </head>`)
}

export function seoPrerender(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'nubitlan:seo-prerender',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },

    async closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir)
      let template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8')
      template = await withFontPreload(template, outDir, config.base)
      if (!template.includes(START) || !template.includes(END)) {
        throw new Error(`[seo-prerender] index.html is missing the ${START} … ${END} markers.`)
      }

      const server = await createServer({
        configFile: false,
        root: config.root,
        mode: 'production',
        logLevel: 'error',
        appType: 'custom',
        resolve: { alias: config.resolve.alias },
        server: { middlewareMode: true, hmr: false, ws: false },
        // pixelarticons is imported as `?raw` SVG and must be handled by Vite.
        ssr: { noExternal: ['pixelarticons'] },
        optimizeDeps: { noDiscovery: true, include: [] },
      })

      try {
        const seo = (await server.ssrLoadModule('/src/lib/seo.ts')) as unknown as SeoModule
        const site = (await server.ssrLoadModule('/src/lib/site.ts')) as { SITE: { url: string } }

        const paths = seo.prerenderPaths()
        for (const routePath of paths) {
          const { title, tags } = seo.headTags(seo.resolveMeta(routePath))
          const head = [`<title>${escapeText(title)}</title>`, ...tags.map(renderTag)]
            .map((line) => `    ${line}`)
            .join('\n')

          const html = template.replace(
            new RegExp(`${START}[\\s\\S]*?${END}`),
            `${START}\n${head}\n    ${END}`
          )

          const file = path.join(outDir, outputFile(routePath))
          await fs.mkdir(path.dirname(file), { recursive: true })
          await fs.writeFile(file, html)
        }

        const entries = seo.sitemapEntries()
        await fs.writeFile(path.join(outDir, 'sitemap.xml'), renderSitemap(site.SITE.url, entries))

        config.logger.info(
          `[seo-prerender] wrote ${paths.length} route files and sitemap.xml (${entries.length} URLs)`
        )
      } finally {
        await server.close()
      }
    },
  }
}
