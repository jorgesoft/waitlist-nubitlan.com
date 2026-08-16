import { Link } from 'react-router-dom'
import { LinkedinIcon, MailIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PixelIcon, type PixelIconName } from '@/components/pixel/icon'

export interface ServiceFeature {
  /** Optional bolded lead-in, e.g. "Desarrollo Seguro:". */
  label?: string
  text: string
}

export interface ServiceHighlight {
  icon: PixelIconName
  title: string
  body: string
  tone?: 'primary' | 'success' | 'warning'
}

export interface ServiceSection {
  title: string
  items: ServiceHighlight[]
  /** Alternating tinted band, so consecutive sections stay distinguishable. */
  tinted?: boolean
}

export interface ServiceCta {
  title: string
  body: string
  extra?: { to: string; label: string; icon: LucideIcon }
}

export interface ServicePageProps {
  icon: PixelIconName
  eyebrow: string
  title: string
  description: string
  overviewTitle: string
  overviewBody: string
  featuresTitle: string
  features: ServiceFeature[]
  sections: ServiceSection[]
  cta: ServiceCta
}

const TONE_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/15 text-warning',
} as const

export function ServicePageTemplate({
  icon,
  eyebrow,
  title,
  description,
  overviewTitle,
  overviewBody,
  featuresTitle,
  features,
  sections,
  cta,
}: ServicePageProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        icon={<PixelIcon name={icon} className="text-primary size-16" />}
      />

      {/* Overview + feature checklist */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
            <CardContent className="p-8 sm:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {overviewTitle}
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {overviewBody}
              </p>

              <h3 className="eyebrow text-primary mt-10">{featuresTitle}</h3>
              <ul className="mt-5 space-y-4">
                {features.map((feature) => (
                  <li key={feature.text} className="flex gap-3">
                    <PixelIcon
                      name="check"
                      className="text-primary mt-0.5 size-5 shrink-0"
                    />
                    <span className="leading-relaxed">
                      {feature.label ? (
                        <strong className="font-semibold">
                          {feature.label}{' '}
                        </strong>
                      ) : null}
                      <span
                        className={cn(
                          feature.label && 'text-muted-foreground block text-sm'
                        )}
                      >
                        {feature.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.title}
          className={cn(
            'py-20 sm:py-24',
            section.tinted && 'bg-sky-50 dark:bg-sky-950/60'
          )}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-balance">
              {section.title}
            </h2>

            <div
              className={cn(
                'stagger mt-12 grid gap-6',
                section.items.length % 3 === 0
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-2'
              )}
            >
              {section.items.map((item) => (
                <Card
                  key={item.title}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="flex gap-4 p-7">
                    <span
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-xl',
                        TONE_CLASSES[item.tone ?? 'primary']
                      )}
                    >
                      <PixelIcon name={item.icon} className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Card>
            <CardContent className="p-8 text-center sm:p-12">
              <h2 className="text-3xl font-extrabold tracking-tight text-balance">
                {cta.title}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg text-pretty">
                {cta.body}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild variant="pixel" size="lg">
                  <a href={`mailto:${SITE.email}`}>
                    <MailIcon />
                    Contáctanos
                  </a>
                </Button>
                <Button asChild variant="pixelOutline" size="lg">
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon />
                    LinkedIn
                  </a>
                </Button>
                {cta.extra ? (
                  <Button asChild variant="outline" size="lg">
                    <Link to={cta.extra.to}>
                      <cta.extra.icon />
                      {cta.extra.label}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
