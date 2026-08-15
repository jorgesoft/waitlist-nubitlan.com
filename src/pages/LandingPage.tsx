import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  FileBarChartIcon,
  ListChecksIcon,
  ScanSearchIcon,
  SparklesIcon,
  TargetIcon,
  XIcon,
} from 'lucide-react'

import { SERVICES } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PixelSky, PixelHorizon } from '@/components/pixel/pixel-sky'
import { PixelSprite } from '@/components/pixel/pixel-art'
import { ICON_BOOK, ICON_LOCK, ICON_ROBOT, ICON_WARN, iconPalette } from '@/components/pixel/sprites'

const RISKS = [
  {
    title: 'Multas y sanciones',
    body: 'La Ley de Protección de Datos contempla sanciones económicas para quienes no cumplan.',
  },
  {
    title: 'Brechas de datos personales',
    body: 'Un incidente expone información de tus clientes y activa obligaciones de notificación.',
  },
  {
    title: 'Pérdida de confianza',
    body: 'Recuperar la reputación después de una filtración cuesta mucho más que prevenirla.',
  },
  {
    title: 'Interrupciones operativas',
    body: 'Tras un incidente, la operación puede detenerse días mientras se contiene el daño.',
  },
]

const BENEFITS = [
  {
    icon: ScanSearchIcon,
    title: 'Identificación de riesgos reales',
    body: 'Analizamos tu exposición concreta, no una lista genérica de buenas prácticas.',
  },
  {
    icon: TargetIcon,
    title: 'Recomendaciones priorizadas',
    body: 'Sabes exactamente qué resolver primero y qué puede esperar al siguiente trimestre.',
  },
  {
    icon: FileBarChartIcon,
    title: 'Reporte claro para gerencia',
    body: 'Un documento que gerencia y auditoría entienden sin traducción técnica.',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Enfoque en datos personales',
    body: 'Alineado con lo que la Ley salvadoreña exige, no con un estándar importado.',
  },
]

const SERVICE_SPRITES = [ICON_ROBOT, ICON_LOCK, ICON_BOOK] as const

function LandingPage() {
  const navigate = useNavigate()

  // JotForm posts a message to the parent window on submit; move the visitor
  // straight into the readiness quiz when that happens.
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === 'https://form.jotform.com' &&
        event.data === 'form-submitted'
      ) {
        navigate('/evaluacion?joined=true')
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [navigate])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ============================ Hero ============================ */}
      <PixelSky className="flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6">
          <div className="stagger">
            <div className="flex justify-center">
              <Badge variant="pixel" size="lg" className="gap-2">
                <SparklesIcon className="size-3" />
                Impulsado por IA
              </Badge>
            </div>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Evalúa tu seguridad y{' '}
              <span className="text-sky-gradient">cumplimiento</span> con
              inteligencia artificial
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
              Diagnósticos rápidos, recomendaciones prácticas y una ruta clara
              hacia el cumplimiento de la Ley de Protección de Datos.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="pixel"
                size="xl"
                onClick={() => scrollTo('lista-de-espera')}
              >
                <ListChecksIcon />
                Únete a la lista de espera
              </Button>

              <Button asChild variant="pixelOutline" size="xl">
                <Link to="/herramientas">
                  Herramientas gratuitas
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground mt-6 text-sm">
              Recibe nuestra guía de la Ley de Datos + mini evaluación de
              preparación.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          type="button"
          onClick={() => scrollTo('riesgos')}
          aria-label="Ir a la siguiente sección"
          className="text-primary absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 transition-colors hover:bg-accent"
        >
          <ChevronDownIcon
            className="size-7"
            style={{ animation: 'bob 2.4s ease-in-out infinite' }}
          />
        </button>
      </PixelSky>

      {/* =========================== Risks ============================ */}
      <section id="riesgos" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            sprite={ICON_WARN}
            eyebrow="El problema"
            title="Riesgos si no te preparas"
            description="Lo que está en juego cuando la Ley entra en vigor y tu empresa aún no tiene un diagnóstico."
          />

          <div className="stagger mt-12 grid gap-4 sm:grid-cols-2">
            {RISKS.map((risk) => (
              <Card
                key={risk.title}
                className="group border-destructive/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="flex gap-4 p-6">
                  <span className="bg-destructive/10 text-destructive flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <XIcon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{risk.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {risk.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= Solution =========================== */}
      <div className="relative">
        <PixelHorizon className="text-sky-50 dark:text-sky-950/60" flip />
        <section className="bg-sky-50 py-20 sm:py-24 dark:bg-sky-950/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="La solución"
              title="Cómo te ayuda Nubitlan"
              description="Un diagnóstico que traduce el riesgo técnico en decisiones que tu equipo puede tomar esta semana."
            />

            <div className="stagger mt-12 grid gap-5 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card flex gap-4 rounded-xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <benefit.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <PixelHorizon className="text-sky-50 dark:text-sky-950/60" />
      </div>

      {/* ========================= Services =========================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Servicios"
            title="Elige por dónde empezar"
            description="Tres formas de trabajar con nosotros, según qué tan avanzada esté tu empresa."
          />

          <div className="stagger mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Link
                key={service.to}
                to={service.to}
                className="group bg-card focus-visible:ring-ring/50 flex flex-col rounded-xl border border-border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl focus-visible:ring-[3px] focus-visible:outline-none"
              >
                <PixelSprite
                  matrix={SERVICE_SPRITES[i]}
                  palette={iconPalette}
                  width={44}
                  height={44}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mt-5 text-lg font-semibold">{service.label}</h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {service.description}
                </p>
                <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Ver detalle
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== Trust ============================= */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Confianza"
            title="Por qué confiar en Nubitlan"
          />

          <div className="stagger mt-12 grid gap-6 md:grid-cols-2">
            <TrustCard
              title="Equipo con experiencia real"
              body="Especialistas en ciberseguridad y privacidad que han trabajado dentro de operaciones como la tuya."
              to="/quienes-somos"
              cta="Conoce al equipo"
            />
            <TrustCard
              title="Resultados comprobados"
              body="Ya ayudamos a una empresa salvadoreña a prepararse para la Ley de Protección de Datos."
              to="/caso-de-estudio"
              cta="Ver caso de estudio"
            />
          </div>
        </div>
      </section>

      {/* ========================= Waitlist =========================== */}
      <section
        id="lista-de-espera"
        className="scroll-mt-20 pb-4"
        aria-labelledby="lista-de-espera-titulo"
      >
        <PixelSky className="border-y border-border py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <Badge variant="pixel" size="lg">
                Lista de espera
              </Badge>
              <h2
                id="lista-de-espera-titulo"
                className="mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
              >
                Sé de los primeros en probarlo
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg text-pretty">
                Déjanos tus datos y recibirás la guía de la Ley de Protección de
                Datos junto con tu mini evaluación de preparación.
              </p>
            </div>

            <div className="bg-card mt-10 overflow-hidden rounded-xl border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
              <iframe
                id="JotFormIFrame-253112397254051"
                title="Únete a la lista de espera"
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/253112397254051"
                className="w-full border-0"
                style={{ height: 1000 }}
                scrolling="no"
              />
            </div>
          </div>
        </PixelSky>
      </section>
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  sprite,
}: {
  eyebrow: string
  title: string
  description?: string
  sprite?: readonly string[]
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {sprite ? (
        <div className="mb-5 flex justify-center">
          <PixelSprite
            matrix={sprite}
            palette={iconPalette}
            width={40}
            height={40}
          />
        </div>
      ) : null}
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function TrustCard({
  title,
  body,
  to,
  cta,
}: {
  title: string
  body: string
  to: string
  cta: string
}) {
  return (
    <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-7">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-2.5 leading-relaxed">{body}</p>
        <Link
          to={to}
          className="text-primary mt-5 inline-flex items-center gap-1.5 font-semibold hover:underline"
        >
          {cta}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default LandingPage
