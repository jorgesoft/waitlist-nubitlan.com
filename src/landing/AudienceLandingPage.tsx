import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  CheckIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  MapPinIcon,
  ScaleIcon,
} from 'lucide-react'

import './landing.css'
import { asset } from '@/lib/asset'
import { SELF_ASSESSMENT, TRAINING_URL } from '@/lib/site'
import { AUDIENCES, OBLIGATIONS, STEPS } from './audiences'
import { RequestForm } from './RequestForm'
import type { AudienceSlug } from './slugs'

/**
 * Shared template for the flyer landing pages (/escuelas, /isp, /empresas).
 * All per-audience copy comes from `AUDIENCES` in ./audiences.ts.
 *
 * Built for a QR scan on a mid-range phone over mobile data: no WebGL sky,
 * no entrance animations, inline SVG clouds, one font, small images loaded
 * lazily below the fold, and no analytics or third-party scripts.
 */
export default function AudienceLandingPage({ slug }: { slug: AudienceSlug }) {
  const audience = AUDIENCES[slug]

  return (
    <div className="flyer">
      <Hero eyebrow={audience.eyebrow} headline={audience.headline} subtitle={audience.subtitle} />

      {/* 2. Los riesgos reales */}
      <section aria-labelledby="riesgos" className="px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading id="riesgos">Los riesgos reales</SectionHeading>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {audience.risks.map(({ icon: Icon, title, body }) => (
              <li key={title} className="fl-card p-5 sm:p-6">
                <Icon className="fl-icon size-9" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Ley de Protección de Datos Personales */}
      <section aria-labelledby="lpdp" className="px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="fl-panel mx-auto max-w-5xl p-5 sm:p-10">
          <div className="flex items-start gap-3">
            <ScaleIcon className="fl-icon mt-1 size-8 flex-none" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="fl-eyebrow">{audience.lpdpLead}</p>
              <h2 id="lpdp" className="mt-1 text-2xl font-extrabold text-balance sm:text-3xl">
                Ley de Protección de Datos Personales
              </h2>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-base leading-relaxed sm:text-lg">{audience.lpdpBody}</p>

          <h3 className="mt-8 text-lg font-bold">Lo que la ley le pide, en palabras sencillas</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {OBLIGATIONS.map((item) => (
              <li key={item.title} className="fl-card flex gap-3 p-4">
                <CheckIcon className="fl-icon mt-0.5 size-5 flex-none" strokeWidth={2.5} aria-hidden="true" />
                <div>
                  <p className="font-bold text-[var(--fl-navy)]">{item.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="fl-card mt-6 border-l-4 border-l-[var(--fl-sky)] p-5 sm:p-6">
            <p className="text-sm font-semibold tracking-wide uppercase">Si no cumple</p>
            <p className="mt-1 text-2xl font-extrabold text-[var(--fl-navy)] sm:text-3xl">
              Multas desde <span className="fl-accent">$409</span> hasta{' '}
              <span className="fl-accent">$16,352</span>*
            </p>
            <p className="mt-2 text-sm">*Entre 1 y 40 salarios mínimos del sector comercio ($408.80).</p>
          </div>

          <p className="mt-6 leading-relaxed">
            ¿Quiere saber dónde está hoy? Haga la autoevaluación gratuita en{' '}
            <Link to={SELF_ASSESSMENT.guide} className="fl-link">
              nubitlan.com/guia_completa
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 4. Nubitlan le ayuda gratis */}
      <section aria-labelledby="ayuda" className="px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading id="ayuda">Nubitlan le ayuda gratis</SectionHeading>

          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            <li className="fl-card flex flex-col p-5 sm:p-6">
              <GraduationCapIcon className="fl-icon size-9" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold">
                Capacitación de concientización en seguridad para su personal
              </h3>
              <p className="mt-2 leading-relaxed">
                Cursos cortos en línea para {audience.trainingFor}: cómo reconocer correos falsos, crear
                contraseñas seguras y manejar datos personales con cuidado.
              </p>
              <p className="mt-auto pt-4">
                <a href={TRAINING_URL} className="fl-link" target="_blank" rel="noopener">
                  Conozca la plataforma en trx.nubitlan.com
                </a>
              </p>
            </li>
            <li className="fl-card flex flex-col p-5 sm:p-6">
              <ClipboardCheckIcon className="fl-icon size-9" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold">
                Plan de ciberseguridad y cumplimiento con la LPDP para su organización
              </h3>
              <p className="mt-2 leading-relaxed">
                Revisamos con usted sus sistemas y cómo maneja los datos, y le entregamos un plan priorizado
                con pasos concretos para protegerse y cumplir la ley.
              </p>
            </li>
          </ul>

          <h3 className="mt-12 text-xl font-extrabold">¿Cómo funciona?</h3>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="fl-step" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold text-[var(--fl-navy)]">
                    <span className="sr-only">Paso {index + 1}: </span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-[0.9375rem]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Formulario */}
      <section aria-labelledby="solicitud-titulo" className="px-4 pb-14 sm:px-6 sm:pb-20">
        <div id="solicitud" className="fl-panel mx-auto max-w-3xl p-5 sm:p-10">
          <h2 id="solicitud-titulo" className="text-2xl font-extrabold text-balance sm:text-3xl">
            Solicite su evaluación gratuita
          </h2>
          <p className="mt-2 leading-relaxed">
            Sin costo y sin compromiso. Le contactaremos para coordinar una reunión corta.
          </p>
          <RequestForm audience={audience} />
        </div>
      </section>

      {/* 6. Credibilidad */}
      <section aria-labelledby="quienes" className="px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeading id="quienes">¿Quiénes somos?</SectionHeading>
          <p className="mt-4 flex items-start gap-2 leading-relaxed sm:text-lg">
            <MapPinIcon className="fl-icon mt-1 size-5 flex-none" aria-hidden="true" />
            <span>
              Nubitlan es una empresa salvadoreña de ciberseguridad y protección de datos con sede en Apopa.
            </span>
          </p>

          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <Founder
              photo="/pictures/jorge-192.webp"
              name="Jorge Carrillo Silva"
              credential="CISSP · M.S. Ciberseguridad, NYU"
              role="Co-fundador"
            />
            <Founder
              photo="/pictures/chris-192.webp"
              name="Chris Sánchez"
              credential="Abogado especializado en ciberseguridad y protección de datos"
              role="Co-fundador"
            />
          </ul>

          <p className="mt-8">
            <a href="#solicitud" className="fl-link inline-flex items-center gap-1.5">
              Solicitar evaluación gratuita
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

function Hero({ eyebrow, headline, subtitle }: { eyebrow: string; headline: string; subtitle: string }) {
  return (
    <section className="fl-hero">
      <CloudOutline className="top-6 -left-10 w-44 sm:left-[4%] sm:w-60" />
      <CloudOutline className="top-28 -right-12 w-40 sm:top-16 sm:right-[6%] sm:w-72" />
      <CloudOutline className="bottom-20 left-[38%] hidden w-36 md:block" />

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-12 text-center sm:px-6 sm:pt-16 sm:pb-16">
        <p className="fl-eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-[1.875rem] leading-[1.15] font-extrabold text-balance sm:text-5xl">
          {headline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">{subtitle}</p>
        <span className="fl-rule mx-auto mt-6" aria-hidden="true" />
        <a href="#solicitud" className="fl-btn mt-7 w-full sm:w-auto">
          Solicitar evaluación gratuita
          <ArrowDownIcon className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div>
      <h2 id={id} className="text-2xl font-extrabold text-balance sm:text-3xl">
        {children}
      </h2>
      <span className="fl-rule mt-3" aria-hidden="true" />
    </div>
  )
}

function Founder({
  photo,
  name,
  credential,
  role,
}: {
  photo: string
  name: string
  credential: string
  role: string
}) {
  return (
    <li className="fl-card flex items-center gap-4 p-4 sm:p-5">
      <img
        src={asset(photo)}
        alt={`Foto de ${name}`}
        width={72}
        height={72}
        loading="lazy"
        decoding="async"
        className="size-18 flex-none rounded-full border-2 border-[var(--fl-border)] object-cover"
      />
      <div>
        <p className="text-lg font-bold text-[var(--fl-navy)]">{name}</p>
        <p className="fl-accent mt-0.5 font-semibold">{credential}</p>
        <p className="mt-0.5 text-sm">{role} de Nubitlan</p>
      </div>
    </li>
  )
}

/** Faint line-drawn cloud, as on the printed flyers. */
function CloudOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -6 120 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`fl-cloud ${className ?? ''}`}
    >
      <path d="M28 56h64a18 18 0 0 0 2-35.9A26 26 0 0 0 45 14a20 20 0 0 0-19 13.2A14.5 14.5 0 0 0 28 56Z" />
    </svg>
  )
}
