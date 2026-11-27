import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  LifeBuoyIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  ScaleIcon,
  type LucideIcon,
} from 'lucide-react'

import { asset } from '@/lib/asset'
import { SELF_ASSESSMENT, SITE, TRAINING_URL } from '@/lib/site'
import { PageHeader } from '@/components/PageHeader'
import { PixelIcon } from '@/components/pixel/icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AUDIENCES, OBLIGATIONS, STEPS, type Audience } from './audiences'
import type { AudienceSlug } from './slugs'

/**
 * Shared template for the flyer landing pages (/escuelas, /isp, /empresas),
 * built from the same components as the rest of the site. All per-audience
 * copy comes from `AUDIENCES` in ./audiences.ts.
 *
 * The page leads to three steps: self-assess at /guia_completa, train the
 * team on TRX Lite, then contact Nubitlan for anything more.
 */
export default function AudienceLandingPage({ slug }: { slug: AudienceSlug }) {
  const audience = AUDIENCES[slug]

  return (
    <>
      <PageHeader
        eyebrow={audience.eyebrow}
        title={audience.headline}
        description={audience.subtitle}
        icon={<PixelIcon name="shield" className="text-primary size-14" />}
        lightweight
      >
        <Button asChild variant="pixel" size="lg">
          <a href="#pasos">
            Cómo empezar
            <ArrowDownIcon />
          </a>
        </Button>
      </PageHeader>

      {/* Los riesgos reales */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-balance">
            Los riesgos reales
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {audience.risks.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Card className="h-full">
                  <CardContent className="flex gap-4 p-6 sm:p-7">
                    <IconChip icon={Icon} />
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{body}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ley de Protección de Datos Personales */}
      <section className="bg-sky-50 py-16 sm:py-20 dark:bg-sky-950/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="eyebrow text-primary inline-flex items-center gap-2">
              <ScaleIcon className="size-4" aria-hidden="true" />
              {audience.lpdpLead}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance">
              Ley de Protección de Datos Personales
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-3xl leading-relaxed text-pretty">
              {audience.lpdpBody}
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {OBLIGATIONS.map((item, i) => (
              <li key={item.title}>
                <Card className="h-full">
                  <CardContent className="p-5">
                    <span className="text-primary font-mono text-sm font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-bold tracking-tight text-pretty">{item.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.body}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <div className="bg-card mx-auto mt-8 max-w-3xl rounded-lg border-l-4 border-sky-400 px-5 py-4">
            <p className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Multas desde <span className="text-sky-700 dark:text-sky-300">$409</span> hasta{' '}
              <span className="text-sky-700 dark:text-sky-300">$16,352</span>*
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              *Entre 1 y 40 salarios mínimos del sector comercio ($408.80).
            </p>
          </div>
        </div>
      </section>

      {/* Cómo empezar: 1) autoevaluación, 2) capacitación, 3) contacto */}
      <section id="pasos" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-balance">
            Cómo empezar, en 3 pasos
          </h2>

          <ol className="mt-10 space-y-6">
            <Step number={1} icon={ScaleIcon} title={STEPS.assess.title} body={STEPS.assess.body}>
              <Button asChild variant="pixel">
                <Link to={SELF_ASSESSMENT.guide}>
                  Hacer la autoevaluación
                  <ArrowRightIcon />
                </Link>
              </Button>
            </Step>

            <Step
              number={2}
              icon={GraduationCapIcon}
              title={STEPS.train.title}
              body={`${STEPS.train.body} ${audience.trainingFor}${STEPS.train.bodyEnd}`}
            >
              <Button asChild variant="pixel">
                <a href={TRAINING_URL} target="_blank" rel="noopener noreferrer">
                  Ir a trx.nubitlan.com
                  <ExternalLinkIcon />
                </a>
              </Button>
            </Step>

            <Step number={3} icon={LifeBuoyIcon} title={STEPS.help.title} body={STEPS.help.body}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild variant="pixel">
                  <a href={mailtoHref(audience)}>
                    <MailIcon />
                    Escribir por correo
                  </a>
                </Button>
                <Button asChild variant="pixelOutline">
                  <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon />
                    LinkedIn
                  </a>
                </Button>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                O escríbanos directamente a{' '}
                <a href={`mailto:${SITE.email}`} className="text-primary font-medium underline underline-offset-4">
                  {SITE.email}
                </a>
                .
              </p>
            </Step>
          </ol>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-balance">¿Quiénes somos?</h2>
          <p className="text-muted-foreground mx-auto mt-4 flex max-w-2xl items-start justify-center gap-2 text-center leading-relaxed">
            <MapPinIcon className="text-primary mt-1 size-4 shrink-0" aria-hidden="true" />
            <span>Nubitlan es una empresa salvadoreña de ciberseguridad y protección de datos con sede en Apopa.</span>
          </p>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            <Founder
              photo="/pictures/jorge-192.webp"
              name="Jorge Carrillo Silva"
              credential="CISSP · M.S. Ciberseguridad, NYU"
              linkedin="https://www.linkedin.com/in/jorgeecsilva/"
            />
            <Founder
              photo="/pictures/chris-192.webp"
              name="Chris Sánchez"
              credential="Abogado especializado en ciberseguridad y protección de datos"
              linkedin="https://www.linkedin.com/in/chrisitlaw/"
            />
          </ul>
        </div>
      </section>
    </>
  )
}

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
      <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}

function Step({
  number,
  icon: Icon,
  title,
  body,
  children,
}: {
  number: number
  icon: LucideIcon
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <li>
      <Card className="border-2 border-foreground shadow-[6px_6px_0_0_var(--sky-400)]">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded font-mono text-base font-bold">
              {number}
            </span>
            <Icon className="text-primary size-6" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-xl font-extrabold tracking-tight">
            <span className="sr-only">Paso {number}: </span>
            {title}
          </h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">{body}</p>
          <div className="mt-5">{children}</div>
        </CardContent>
      </Card>
    </li>
  )
}

function Founder({
  photo,
  name,
  credential,
  linkedin,
}: {
  photo: string
  name: string
  credential: string
  linkedin: string
}) {
  return (
    <li>
      <Card className="h-full">
        <CardContent className="flex items-center gap-5 p-6">
          <img
            src={asset(photo)}
            alt={`Foto de ${name}`}
            width={80}
            height={80}
            loading="lazy"
            decoding="async"
            className="size-20 shrink-0 rounded-full border-4 border-sky-200 object-cover dark:border-sky-800"
          />
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-primary mt-0.5 text-sm font-semibold">{credential}</p>
            <p className="text-muted-foreground mt-0.5 text-sm">Co-fundador de Nubitlan</p>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
            >
              <LinkedinIcon className="size-4" aria-hidden="true" />
              LinkedIn<span className="sr-only"> de {name}</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}

/** Opens the visitor's mail app with a subject and a short template. */
function mailtoHref(audience: Audience): string {
  const body = [
    'Hola, equipo de Nubitlan:',
    '',
    'Me gustaría recibir ayuda con la ciberseguridad y el cumplimiento de la ley.',
    '',
    'Nombre completo:',
    'Cargo:',
    `${audience.organizationNoun}:`,
    'Teléfono / WhatsApp:',
    'Número aproximado de empleados:',
    '',
    `(Enviado desde nubitlan.com/${audience.slug})`,
  ].join('\n')
  return `mailto:${SITE.email}?subject=${encodeURIComponent(audience.emailSubject)}&body=${encodeURIComponent(body)}`
}
