import { Link } from 'react-router-dom'
import { ArrowRightIcon, ChevronDownIcon, ExternalLinkIcon, LinkedinIcon } from 'lucide-react'

import { asset } from '@/lib/asset'
import { SELF_ASSESSMENT, SITE, TRAINING_URL } from '@/lib/site'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PixelSky } from '@/components/pixel/pixel-sky'
import { PixelIcon, type PixelIconName } from '@/components/pixel/icon'
import { SectionHeading } from '@/components/SectionHeading'
import { AUDIENCES, OBLIGATIONS, STEPS, type Audience } from './audiences'
import type { AudienceSlug } from './slugs'

/**
 * Shared template for the flyer landing pages (/escuelas, /isp, /empresas).
 * Follows the home page (src/pages/LandingPage.tsx) section for section; see
 * docs/STYLE_GUIDE.md. All per-audience copy is in ./audiences.ts.
 *
 * Path offered to visitors: 1) self-assess at /guia_completa, 2) train the
 * team on TRX Lite, 3) contact Nubitlan for more help.
 *
 * Mobile-first differences from the home page, because these open from a QR
 * code on mobile data: phones get static pixel clouds instead of the WebGL
 * sky (`mobileLite`), and the hero text is not animated in, so it paints
 * immediately.
 */
export default function AudienceLandingPage({ slug }: { slug: AudienceSlug }) {
  const audience = AUDIENCES[slug]

  return (
    <>
      {/* ============================ Hero ============================ */}
      <PixelSky mobileLite className="flex min-h-[calc(100svh-4rem)] items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6">
          <div className="flex justify-center">
            <Badge variant="pixel" size="lg" className="gap-2">
              <PixelIcon name="shield" className="size-3.5" />
              {audience.eyebrow}
            </Badge>
          </div>

          <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            <Highlighted text={audience.headline} highlight={audience.headlineHighlight} />
          </h1>

          <p className="text-foreground/80 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
            {audience.subtitle}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="pixel" size="xl">
              <Link to={SELF_ASSESSMENT.guide}>
                <PixelIcon name="clipboard" className="size-5" />
                Haga la autoevaluación
              </Link>
            </Button>
            <Button asChild variant="pixelOutline" size="xl">
              <a href="#pasos">
                Cómo empezar
                <ArrowRightIcon />
              </a>
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Autoevaluación gratuita, capacitación en línea y asesoría de Nubitlan.
          </p>
        </div>

        <a
          href="#riesgos"
          aria-label="Ir a la siguiente sección"
          className="text-primary absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 transition-colors hover:bg-accent"
        >
          <ChevronDownIcon className="size-7" style={{ animation: 'bob 2.4s ease-in-out infinite' }} />
        </a>
      </PixelSky>

      {/* =========================== Risks ============================ */}
      <section id="riesgos" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            icon="alert"
            eyebrow="El problema"
            title="Los riesgos reales"
            description="Lo que está en juego si un ataque llega antes que la prevención."
          />

          <div className="stagger mt-12 grid gap-4 md:grid-cols-3">
            {audience.risks.map((risk) => (
              <Card
                key={risk.title}
                className="border-destructive/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="flex gap-4 p-6">
                  <span className="bg-destructive/10 text-destructive flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <PixelIcon name="close" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{risk.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{risk.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= The law ============================ */}
      <section className="border-y border-border bg-sky-50 py-20 sm:py-24 dark:bg-sky-950/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={audience.lpdpLead} title="Ley de Protección de Datos Personales" description={audience.lpdpBody} />

          <div className="stagger mt-12 grid gap-5 sm:grid-cols-2">
            {OBLIGATIONS.map((item) => (
              <div
                key={item.title}
                className="bg-card flex gap-4 rounded-xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <PixelIcon name={item.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card mx-auto mt-10 max-w-3xl rounded-xl border border-destructive/15 p-6 text-center sm:p-8">
            <p className="eyebrow text-destructive">Si no cumple</p>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Multas desde <span className="text-sky-gradient">$409</span> hasta{' '}
              <span className="text-sky-gradient">$16,352</span>*
            </p>
            <p className="text-muted-foreground mt-3 text-sm">
              *Entre 1 y 40 salarios mínimos del sector comercio ($408.80).
            </p>
          </div>
        </div>
      </section>

      {/* ========================== Steps ============================= */}
      <section id="pasos" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Cómo empezar"
            title="Tres pasos para protegerse"
            description="Empiece por su cuenta hoy mismo, y cuente con nosotros cuando necesite más."
          />

          <ol className="stagger mt-12 grid gap-6 md:grid-cols-3">
            <StepCard
              step={1}
              icon="clipboard"
              title={STEPS.assess.title}
              body={STEPS.assess.body}
              cta="Hacer la autoevaluación"
              to={SELF_ASSESSMENT.guide}
            />
            <StepCard
              step={2}
              icon="teach"
              title={STEPS.train.title}
              body={`${STEPS.train.body} ${audience.trainingFor}${STEPS.train.bodyEnd}`}
              cta="Ir a trx.nubitlan.com"
              href={TRAINING_URL}
              external
            />
            <StepCard
              step={3}
              icon="mail"
              title={STEPS.help.title}
              body={STEPS.help.body}
              cta="Contactar a Nubitlan"
              href="#contacto"
            />
          </ol>
        </div>
      </section>

      {/* ========================== Trust ============================= */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Confianza"
            title="Quiénes somos"
            description="Nubitlan es una empresa salvadoreña de ciberseguridad y protección de datos con sede en Apopa."
          />

          <div className="stagger mt-12 grid gap-6 md:grid-cols-2">
            <FounderCard
              photo="/pictures/jorge-192.webp"
              name="Jorge Carrillo Silva"
              credential="CISSP · M.S. Ciberseguridad, NYU"
              linkedin="https://www.linkedin.com/in/jorgeecsilva/"
            />
            <FounderCard
              photo="/pictures/chris-192.webp"
              name="Chris Sánchez"
              credential="Abogado especializado en ciberseguridad y protección de datos"
              linkedin="https://www.linkedin.com/in/chrisitlaw/"
            />
          </div>
        </div>
      </section>

      {/* ========================= Contact ============================ */}
      <section id="contacto" className="scroll-mt-20 pb-4" aria-labelledby="contacto-titulo">
        <PixelSky mobileLite className="border-y border-border py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Badge variant="pixel" size="lg">
              Contacto
            </Badge>
            <h2
              id="contacto-titulo"
              className="mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
            >
              Hablemos de su {audience.contactNoun}
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg text-pretty">
              Cuéntenos qué le preocupa y le ayudamos a definir los siguientes pasos. Escríbanos por
              correo o por LinkedIn.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="pixel" size="xl">
                <a href={mailtoHref(audience)}>
                  <PixelIcon name="mail" className="size-5" />
                  Escríbanos
                </a>
              </Button>
              <Button asChild variant="pixelOutline" size="xl">
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon />
                  LinkedIn
                </a>
              </Button>
            </div>
            <p className="text-muted-foreground mt-6 text-sm">{SITE.email}</p>
          </div>
        </PixelSky>
      </section>
    </>
  )
}

/** Renders `text` with `highlight` in the brand sky gradient, as on the home page. */
function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight)
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="text-sky-gradient">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  )
}

/** Same card as the home page's service cards, with a step number. */
function StepCard({
  step,
  icon,
  title,
  body,
  cta,
  to,
  href,
  external = false,
}: {
  step: number
  icon: PixelIconName
  title: string
  body: string
  cta: string
  to?: string
  href?: string
  external?: boolean
}) {
  const className =
    'group bg-card focus-visible:ring-ring/50 flex h-full flex-col rounded-xl border border-border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl focus-visible:ring-[3px] focus-visible:outline-none'
  const content = (
    <>
      <div className="flex items-center justify-between">
        <PixelIcon
          name={icon}
          className="text-primary size-11 transition-transform duration-300 group-hover:scale-110"
        />
        <span className="eyebrow text-primary">Paso {step}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">{body}</p>
      <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
        {cta}
        {external ? (
          <ExternalLinkIcon className="size-4" />
        ) : (
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  )

  return (
    <li>
      {to ? (
        <Link to={to} className={className}>
          {content}
        </Link>
      ) : (
        <a
          href={href}
          className={className}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      )}
    </li>
  )
}

/** The home page's trust card, with the founder's photo. */
function FounderCard({
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
    <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-center gap-5 p-7">
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
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{credential}</p>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            <LinkedinIcon className="size-4" />
            Ver perfil en LinkedIn<span className="sr-only"> de {name}</span>
          </a>
        </div>
      </CardContent>
    </Card>
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
