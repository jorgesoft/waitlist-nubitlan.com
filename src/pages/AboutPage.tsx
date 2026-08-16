import { LinkedinIcon, MailIcon } from 'lucide-react'

import { SITE } from '@/lib/site'
import { asset } from '@/lib/asset'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const FOUNDERS = [
  {
    name: 'Jorge Silva',
    role: 'Co-fundador',
    photo: '/pictures/jorge.jpg',
    linkedin: 'https://www.linkedin.com/in/jorgeecsilva/',
    bio: 'Senior Cybersecurity Analyst con más de 7 años de experiencia, radicado en NYC. Experiencia previa en ingeniería cloud, con experiencia en consultoría en Microsoft. Jorge tiene una licenciatura en cloud computing y una maestría en ciberseguridad de New York University.',
  },
  {
    name: 'Chris Sánchez',
    role: 'Co-fundador',
    photo: '/pictures/chris.jpg',
    linkedin: 'https://www.linkedin.com/in/chrisitlaw/',
    bio: 'Abogado y notario especializado en derecho informático, con un enfoque particular en protección de datos personales, ciberseguridad y cumplimiento normativo. Tiene una licenciatura en derecho de la UCA y una maestría en derecho digital de la Universidad Internacional de La Rioja.',
  },
]

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title="El equipo detrás de Nubitlan"
        description="Ciberseguridad y derecho digital, trabajando juntos sobre el mismo problema."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Nuestros fundadores
          </h2>

          <div className="stagger mt-12 grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((founder) => (
              <Card
                key={founder.name}
                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <img
                    src={asset(founder.photo)}
                    alt={`${founder.name} — ${founder.role} de Nubitlan`}
                    width={144}
                    height={144}
                    loading="lazy"
                    className="size-36 rounded-full border-4 border-sky-200 object-cover shadow-md dark:border-sky-800"
                  />
                  <h3 className="mt-6 text-xl font-bold">{founder.name}</h3>
                  <p className="eyebrow text-primary mt-1.5">{founder.role}</p>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                    {founder.bio}
                  </p>
                  <Button asChild variant="pixelOutline" className="mt-6">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon />
                      Ver perfil en LinkedIn
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
            <CardContent className="p-8 text-center sm:p-12">
              <span className="bg-primary text-primary-foreground mx-auto flex size-14 items-center justify-center rounded-xl">
                <MailIcon className="size-7" />
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
                Contáctanos
              </h2>
              <p className="text-muted-foreground mt-3 text-lg text-pretty">
                ¿Tienes preguntas o necesitas más información? Estamos aquí para
                ayudarte.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="pixel" size="lg">
                  <a href={`mailto:${SITE.email}`}>
                    <MailIcon />
                    {SITE.email}
                  </a>
                </Button>
                <Button asChild variant="pixelOutline" size="lg">
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon />
                    Síguenos en LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

export default AboutPage
