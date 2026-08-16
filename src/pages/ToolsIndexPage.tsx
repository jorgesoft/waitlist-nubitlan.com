import { Link } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'

import { TOOLS, toolPath } from '@/tools/registry'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PixelIcon } from '@/components/pixel/icon'

function ToolsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramientas"
        title="Herramientas gratuitas"
        description="Utilidades de seguridad que funcionan por completo en tu navegador. Sin registro, sin enviar datos a ningún servidor."
        icon={
          <PixelIcon name="lock" className="text-primary size-14" />
        }
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="stagger grid gap-6 md:grid-cols-2">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                to={toolPath(tool)}
                className="group focus-visible:ring-ring/50 flex focus-visible:ring-[3px] focus-visible:outline-none"
              >
                <Card className="flex-1 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-sky-300 group-hover:shadow-xl">
                  <CardContent className="flex h-full flex-col p-7">
                    <PixelIcon
                      name={tool.icon}
                      className="text-primary size-10 transition-transform duration-300 group-hover:scale-110"
                    />

                    <h2 className="group-hover:text-primary mt-5 text-xl font-bold tracking-tight transition-colors">
                      {tool.name}
                    </h2>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {tool.tagline}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {tool.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" size="sm">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold">
                        Abrir herramienta
                        <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <ShortUrlChip path={tool.shortPath} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <p className="text-muted-foreground mt-12 text-center text-sm">
            ¿Te falta alguna herramienta?{' '}
            <a
              href="mailto:contact@nubitlan.com?subject=Idea%20para%20una%20herramienta"
              className="text-primary font-medium underline underline-offset-4"
            >
              Cuéntanos qué necesitas
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}

/** Shows the memorable short link, e.g. "nubitlan.com/ps". */
export function ShortUrlChip({ path }: { path: string }) {
  return (
    <span className="font-mono border-2 border-dashed border-sky-300 px-2 py-1 text-[0.7rem] font-semibold text-sky-700 dark:border-sky-700 dark:text-sky-300">
      nubitlan.com{path}
    </span>
  )
}

export default ToolsIndexPage
