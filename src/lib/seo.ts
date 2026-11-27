import { SERVICES, SITE } from '@/lib/site'
import { getPost, posts } from '@/lib/blog'
import { getToolBySlug, TOOLS, toolPath } from '@/tools/registry'
import { AUDIENCES } from '@/landing/audiences'
import { AUDIENCE_SLUGS } from '@/landing/slugs'

/**
 * Per-route SEO metadata — the single source for <title>, description,
 * canonical URL, Open Graph / Twitter cards and JSON-LD.
 *
 * Used in two places:
 *  - At build time, `vite/seo-prerender.ts` writes one HTML file per route
 *    with these tags already in <head>, so crawlers and link previews
 *    (WhatsApp, LinkedIn, Slack…), which do not run JavaScript, see the
 *    right title and card for every page. It also generates sitemap.xml.
 *  - At runtime, `RouteMeta` in SiteLayout swaps the tags on client-side
 *    navigation.
 *
 * Adding a page: add it to STATIC_PAGES (services come from SERVICES in
 * site.ts). Blog posts and tools are picked up automatically. A route missing
 * here falls back to the 404 metadata, which is noindex — so every new
 * <Route> in main.tsx needs an entry.
 */

export interface PageMeta {
  title: string
  description: string
  /** Canonical path, e.g. "/blog/mi-post". */
  path: string
  type?: 'website' | 'article'
  /** Absolute image URL for social cards. */
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
  /** ISO date, used for sitemap <lastmod>. */
  updated?: string
  /** Sitemap priority hint, 0–1. */
  priority?: number
}

export const DEFAULT_IMAGE = `${SITE.url}/pictures/nubitlan_thumbnail.png`

const ORG_ID = `${SITE.url}/#organization`

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/android-chrome-512x512.png`,
  image: DEFAULT_IMAGE,
  email: SITE.email,
  description:
    'Ciberseguridad y cumplimiento de la Ley de Protección de Datos Personales para empresas en El Salvador.',
  areaServed: { '@type': 'Country', name: 'El Salvador' },
  address: { '@type': 'PostalAddress', addressCountry: 'SV' },
  sameAs: [SITE.linkedin],
  knowsAbout: [
    'Ciberseguridad',
    'Protección de datos personales',
    'Ley de Protección de Datos Personales de El Salvador',
    'Seguridad de correo electrónico',
  ],
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'es-SV',
  publisher: { '@id': ORG_ID },
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path === '/' ? '' : item.path}`,
    })),
  }
}

function service(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE.url}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'El Salvador' },
  }
}

const SERVICE_COPY: Record<string, { title: string; description: string }> = {
  '/servicios/evaluacion-seguridad-ia': {
    title: 'Evaluación de seguridad externa con IA',
    description:
      'Análisis de vulnerabilidades y exposición externa de tu empresa con apoyo de inteligencia artificial. Reporte priorizado para gerencia y equipo técnico.',
  },
  '/servicios/pruebas-de-penetracion-ia': {
    title: 'Pruebas de penetración asistidas por IA',
    description:
      'Pruebas de penetración seguras y de bajo riesgo para empresas en El Salvador, potenciadas por inteligencia artificial. Hallazgos verificados y priorizados.',
  },
  '/servicios/evaluacion-proteccion-datos': {
    title: 'Evaluación de cumplimiento de la Ley de Protección de Datos',
    description:
      'Diagnóstico inicial del cumplimiento de tu empresa con la Ley de Protección de Datos Personales de El Salvador, con un plan de acción concreto.',
  },
  '/servicios/capacitacion-seguridad': {
    title: 'Capacitación en ciberseguridad para empresas',
    description:
      'Entrenamiento en ciberseguridad para tu equipo: concientización, phishing y buenas prácticas con casos reales de empresas salvadoreñas.',
  },
}

const STATIC_PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Nubitlan — Ciberseguridad y Ley de Protección de Datos en El Salvador',
    description:
      'Evaluaciones de ciberseguridad y cumplimiento de la Ley de Protección de Datos Personales para PYMEs en El Salvador. Herramientas gratuitas y diagnóstico con IA.',
    priority: 1,
    jsonLd: [ORGANIZATION, WEBSITE],
  },
  {
    path: '/evaluacion',
    title: 'Evaluación gratuita: ¿está tu empresa lista para la Ley de Datos?',
    description:
      'Responde unas preguntas y descubre en cinco minutos qué tan preparada está tu empresa para la Ley de Protección de Datos Personales de El Salvador.',
    priority: 0.9,
  },
  ...SERVICES.map((item) => {
    const copy = SERVICE_COPY[item.to] ?? { title: item.label, description: item.description ?? '' }
    return {
      path: item.to,
      title: copy.title,
      description: copy.description,
      priority: 0.8,
      jsonLd: [
        service(item.to, copy.title, copy.description),
        breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: copy.title, path: item.to },
        ]),
      ],
    }
  }),
  {
    path: '/herramientas',
    title: 'Herramientas gratuitas de ciberseguridad',
    description:
      'Herramientas de seguridad gratuitas y sin registro: revisa SPF, DKIM y DMARC de tu dominio y genera contraseñas seguras.',
    priority: 0.8,
  },
  {
    path: '/blog',
    title: 'Blog de ciberseguridad y protección de datos',
    description:
      'Guías prácticas sobre la Ley de Protección de Datos de El Salvador, ciberseguridad para PYMEs y cómo aplicarlas en tu empresa.',
    priority: 0.7,
  },
  {
    path: '/quienes-somos',
    title: 'Quiénes somos',
    description:
      'El equipo de Nubitlan: especialistas en ciberseguridad y derecho digital ayudando a empresas salvadoreñas a proteger sus datos.',
    priority: 0.5,
  },
  {
    path: '/caso-de-estudio',
    title: 'Caso de estudio: de la incertidumbre a un plan de cumplimiento',
    description:
      'Cómo ayudamos a una empresa salvadoreña a identificar sus riesgos y prepararse para la Ley de Protección de Datos Personales.',
    priority: 0.6,
  },
  {
    path: '/guia_completa',
    title: 'Guía de cumplimiento de la Ley de Protección de Datos (LPDP)',
    description:
      'Mide en menos de una hora qué tan cerca está tu empresa de cumplir la Ley de Protección de Datos Personales de El Salvador, con nuestra autoevaluación gratuita.',
    priority: 0.8,
  },
  // Flyer landing pages (QR codes). Each has its own branded social card.
  ...AUDIENCE_SLUGS.map((slug): PageMeta => {
    const { seo } = AUDIENCES[slug]
    const path = `/${slug}`
    return {
      path,
      title: seo.title,
      description: seo.description,
      image: `${SITE.url}/og/${slug}.png`,
      priority: 0.8,
      jsonLd: [
        service(path, seo.title, seo.description),
        breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: seo.title, path },
        ]),
      ],
    }
  }),
  {
    path: '/privacidad',
    title: 'Política de privacidad',
    description:
      'Política de privacidad de Nubitlan: cómo tratamos los datos en nubitlan.com, el Portal Nubitlan y TRX Lite.',
    priority: 0.2,
  },
  {
    path: '/terminos',
    title: 'Términos y condiciones',
    description: 'Términos y condiciones de uso del sitio y los servicios de Nubitlan.',
    priority: 0.2,
  },
]

function withSiteName(title: string): string {
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
}

function postMeta(slug: string): PageMeta | null {
  const post = getPost(slug)
  if (!post) return null
  const path = `/blog/${post.slug}`

  return {
    path,
    title: post.title,
    description: post.excerpt,
    type: 'article',
    updated: post.date,
    priority: 0.7,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'es-SV',
        mainEntityOfPage: `${SITE.url}${path}`,
        image: DEFAULT_IMAGE,
        keywords: post.tags.join(', '),
        author: { '@type': 'Organization', name: post.author, url: SITE.url },
        publisher: { '@id': ORG_ID },
      },
      breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ]),
    ],
  }
}

function toolMeta(slug: string): PageMeta | null {
  const tool = getToolBySlug(slug)
  if (!tool) return null
  const path = toolPath(tool)

  return {
    path,
    title: `${tool.name} gratis`,
    description: tool.description,
    priority: 0.8,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.description,
        url: `${SITE.url}${path}`,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Any',
        inLanguage: 'es-SV',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@id': ORG_ID },
      },
      breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Herramientas', path: '/herramientas' },
        { name: tool.name, path },
      ]),
    ],
  }
}

const NOT_FOUND: PageMeta = {
  path: '/404',
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o cambió de dirección.',
  noindex: true,
}

/** Metadata for any pathname the router can render. */
export function resolveMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/'

  const page = STATIC_PAGES.find((candidate) => candidate.path === path)
  if (page) return page

  const blog = path.match(/^\/blog\/([^/]+)$/)
  if (blog) return postMeta(blog[1]) ?? NOT_FOUND

  const tool = path.match(/^\/herramientas\/([^/]+)$/)
  if (tool) return toolMeta(tool[1]) ?? NOT_FOUND

  // Short aliases (/ps, /correo) render the tool and point their canonical
  // at the full path, so search engines index one URL per tool.
  const alias = TOOLS.find((candidate) => candidate.shortPath === path)
  if (alias) return toolMeta(alias.slug)!

  return NOT_FOUND
}

/**
 * Extra preloads written into a route's prerendered HTML, so the browser
 * fetches the page's lazy chunk and font alongside the main bundle instead
 * of discovering them one round trip later. Used for the QR-code landing
 * pages, which are opened on mobile data.
 *
 *   module  Source path of the route's lazy page component.
 *   fonts   File-name prefixes of .woff2 files in dist/assets to preload.
 *   body    Also render the page's HTML at build time (src/entry-server.tsx),
 *           so it paints before the JavaScript has loaded.
 */
export function routePreloads(pathname: string): { module?: string; fonts?: string[]; body?: boolean } {
  const path = pathname.replace(/\/+$/, '') || '/'
  if ((AUDIENCE_SLUGS as readonly string[]).includes(path.slice(1))) {
    return {
      module: 'src/landing/AudienceLandingPage.tsx',
      fonts: ['plus-jakarta-sans-latin-wght-normal-'],
      body: true,
    }
  }
  return {}
}

/** Every path that gets its own prerendered HTML file. */
export function prerenderPaths(): string[] {
  return [
    ...STATIC_PAGES.map((page) => page.path),
    ...posts.map((post) => `/blog/${post.slug}`),
    ...TOOLS.map(toolPath),
    ...TOOLS.map((tool) => tool.shortPath),
  ]
}

/** Canonical, indexable pages for sitemap.xml. */
export function sitemapEntries(): PageMeta[] {
  const seen = new Set<string>()
  return prerenderPaths()
    .map(resolveMeta)
    .filter((meta) => {
      if (meta.noindex || seen.has(meta.path)) return false
      seen.add(meta.path)
      return true
    })
}

export interface HeadTag {
  tag: 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  text?: string
}

/**
 * The <head> tags for a page, minus <title>. Each carries `data-seo` so the
 * runtime can replace exactly the set the build wrote.
 */
export function headTags(meta: PageMeta): { title: string; tags: HeadTag[] } {
  const title = withSiteName(meta.title)
  const url = `${SITE.url}${meta.path === '/' ? '/' : meta.path}`
  const image = meta.image ?? DEFAULT_IMAGE

  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'es_SV' } },
    { tag: 'meta', attrs: { property: 'og:type', content: meta.type ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:title', content: title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]

  if (!meta.noindex) {
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      { tag: 'meta', attrs: { property: 'og:url', content: url } }
    )
  }

  if (meta.type === 'article' && meta.updated) {
    tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: meta.updated } })
  }

  for (const data of meta.jsonLd ?? []) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      // Escape "<" so a value can never close the script element early.
      text: JSON.stringify(data).replace(/</g, '\\u003c'),
    })
  }

  return { title, tags }
}
