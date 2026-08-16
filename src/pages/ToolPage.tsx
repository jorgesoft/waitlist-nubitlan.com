import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, SearchXIcon } from 'lucide-react'

import { SITE } from '@/lib/site'
import { getToolBySlug, type Tool } from '@/tools/registry'
import { Button } from '@/components/ui/button'
import { PixelSky } from '@/components/pixel/pixel-sky'
import { PixelIcon } from '@/components/pixel/icon'
import { ShortUrlChip } from '@/pages/ToolsIndexPage'

/**
 * Renders a tool. Mounted twice per tool — once at the canonical
 * `/herramientas/<slug>` path and once at its short alias (e.g. `/ps`) — so a
 * shared short link loads the tool directly instead of redirecting.
 */
function ToolPage({ tool: toolProp }: { tool?: Tool }) {
  const { slug } = useParams<{ slug: string }>()
  const tool = toolProp ?? (slug ? getToolBySlug(slug) : undefined)

  React.useEffect(() => {
    if (!tool) return
    const previous = document.title
    document.title = `${tool.name} — ${SITE.name}`
    return () => {
      document.title = previous
    }
  }, [tool])

  if (!tool) return <ToolNotFound />

  const ToolComponent = tool.component

  return (
    <>
      <PixelSky className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-6">
            <Link to="/herramientas">
              <ArrowLeftIcon />
              Todas las herramientas
            </Link>
          </Button>

          <div className="flex items-start gap-5">
            <PixelIcon name={tool.icon} className="text-primary mt-1 size-12" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                {tool.name}
              </h1>
              <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
                {tool.description}
              </p>
              <div className="mt-5">
                <ShortUrlChip path={tool.shortPath} />
              </div>
            </div>
          </div>
        </div>
      </PixelSky>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ToolComponent />
        </div>
      </section>
    </>
  )
}

function ToolNotFound() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <SearchXIcon className="text-muted-foreground mx-auto size-12" />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Herramienta no encontrada
        </h1>
        <p className="text-muted-foreground mt-4">
          La herramienta que buscas no existe o cambió de dirección.
        </p>
        <Button asChild variant="pixel" className="mt-8">
          <Link to="/herramientas">
            <ArrowLeftIcon />
            Ver todas las herramientas
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default ToolPage
