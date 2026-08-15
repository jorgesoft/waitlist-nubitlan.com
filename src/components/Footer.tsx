import { Link } from 'react-router-dom'
import { LinkedinIcon, MailIcon } from 'lucide-react'

import { SERVICES, SITE } from '@/lib/site'
import { PixelLogo } from '@/components/pixel/pixel-logo'
import { PixelHorizon } from '@/components/pixel/pixel-sky'
import { Separator } from '@/components/ui/separator'

function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Pixel skyline capping the footer band */}
      <PixelHorizon className="text-sky-100 dark:text-sky-950" />

      <div className="bg-sky-100 dark:bg-sky-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <PixelLogo size={30} />
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Cumplimiento y ciberseguridad práctica para empresas
              salvadoreñas.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nubitlan en LinkedIn"
                className="text-muted-foreground hover:text-primary rounded-md p-1.5 transition-colors"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label={`Escríbenos a ${SITE.email}`}
                className="text-muted-foreground hover:text-primary rounded-md p-1.5 transition-colors"
              >
                <MailIcon className="size-5" />
              </a>
            </div>
          </div>

          <FooterColumn title="Servicios">
            {SERVICES.map((service) => (
              <FooterLink key={service.to} to={service.to}>
                {service.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Recursos">
            <FooterLink to="/herramientas">Herramientas gratuitas</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/evaluacion">Evaluación de preparación</FooterLink>
            <FooterLink to="/caso-de-estudio">Caso de estudio</FooterLink>
          </FooterColumn>

          <FooterColumn title="Empresa">
            <FooterLink to="/quienes-somos">Quiénes somos</FooterLink>
            <FooterLink to="/terminos">Política de privacidad</FooterLink>
            <FooterLink to="/terminos#terms">Términos y condiciones</FooterLink>
            <a
              href={`mailto:${SITE.email}`}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              {SITE.email}
            </a>
          </FooterColumn>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <Separator className="bg-border/70" />
          <div className="text-muted-foreground flex flex-col items-center justify-between gap-3 pt-6 text-xs sm:flex-row">
            <p>
              © {new Date().getFullYear()} {SITE.name}. Todos los derechos
              reservados.
            </p>
            <p className="font-pixel text-[0.6rem] tracking-[0.14em]">
              Hecho en El Salvador
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="eyebrow text-foreground mb-4">{title}</h2>
      <ul className="space-y-2.5">
        {Array.isArray(children) ? (
          children.map((child, i) => <li key={i}>{child}</li>)
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  )
}

function FooterLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="text-muted-foreground hover:text-primary text-sm transition-colors"
    >
      {children}
    </Link>
  )
}

export default Footer
