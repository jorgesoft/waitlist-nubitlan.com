import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  GithubIcon,
  MailIcon,
} from 'lucide-react'

import { SELF_ASSESSMENT, SITE } from '@/lib/site'
import { PageHeader } from '@/components/PageHeader'
import { PixelIcon } from '@/components/pixel/icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const CONTACT_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent('Ayuda con la Ley de Protección de Datos')}`

/** The same five obligations as the printed quick guide that links here. */
const OBLIGATIONS = [
  {
    title: 'Pedir consentimiento claro',
    body: 'Que la persona sepa qué datos le pide y para qué, y que lo acepte.',
  },
  {
    title: 'Usar los datos solo para el fin informado',
    body: 'Si los pidió para facturar, no los use para otra cosa sin avisar.',
  },
  {
    title: 'Protegerlos con medidas de seguridad',
    body: 'Contraseñas con doble factor, equipos cifrados, respaldos y antivirus.',
  },
  {
    title: 'Mantener la confidencialidad',
    body: 'Solo quien lo necesita accede, y sus proveedores firman cláusulas.',
  },
  {
    title: 'Responder solicitudes ARCO-POL',
    body: 'Sus clientes pueden pedirle ver, corregir o borrar sus datos, y usted tiene plazo para responder.',
  },
]

const STEPS = [
  'Descarga la hoja y ábrela en Excel, LibreOffice o Google Sheets.',
  'Responde 19 preguntas sencillas: Sí, Parcialmente, No o No sé.',
  'Revisa tu porcentaje de cumplimiento y el plan de acción priorizado.',
]

function CompleteGuidePage() {
  React.useEffect(() => {
    const previous = document.title
    document.title = `Guía completa LPDP — ${SITE.name}`
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Guía completa"
        title="¿Su negocio está listo para la Ley de Protección de Datos?"
        description="Mide en menos de una hora qué tan cerca está de cumplir, con nuestra autoevaluación gratuita. Y si prefiere que le acompañemos, escríbanos."
        icon={<PixelIcon name="shield" className="text-primary size-14" />}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="pixel" size="lg">
            <a href={SELF_ASSESSMENT.download} download>
              <DownloadIcon />
              Descargar autoevaluación
            </a>
          </Button>
          <Button asChild variant="pixelOutline" size="lg">
            <a href={CONTACT_HREF}>
              <MailIcon />
              Pedir ayuda
            </a>
          </Button>
        </div>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-balance">
            Lo que la ley le pide
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-pretty">
            Si guarda nombres, DUIs, teléfonos o correos de clientes o
            empleados, la ley aplica a su negocio, sin importar su tamaño.
          </p>

          <ol className="stagger mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {OBLIGATIONS.map((item, i) => (
              <li key={item.title}>
                <Card className="h-full">
                  <CardContent className="p-5">
                    <span className="text-primary font-mono text-sm font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-bold tracking-tight text-pretty">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-8 max-w-3xl rounded-lg border-l-4 border-sky-400 bg-sky-50 px-5 py-4 text-sm leading-relaxed dark:bg-sky-950/40">
            <strong>Novedad de 2026:</strong> con las reformas aprobadas en
            septiembre, las empresas privadas ya no tienen que nombrar un
            Delegado de Protección de Datos, pero sí deben atender ellas mismas
            las solicitudes de sus clientes y tener sus procesos por escrito.
            La autoevaluación ya refleja este cambio.
          </div>
        </div>
      </section>

      <section className="bg-sky-50 py-16 sm:py-20 dark:bg-sky-950/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
            <CardContent className="p-8 sm:p-10">
              <span className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-xl">
                <FileSpreadsheetIcon className="size-7" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
                Autoevaluación LPDP gratuita
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                Pensada para quien dirige el negocio, no para especialistas. Sus
                respuestas se quedan en su computadora.
              </p>
              <ol className="mt-6 space-y-3">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded font-mono text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="pixel" size="lg">
                  <a href={SELF_ASSESSMENT.download} download>
                    <DownloadIcon />
                    Descargar (.xlsx)
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a
                    href={SELF_ASSESSMENT.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon />
                    Código abierto en GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance">
            ¿Prefiere que lo hagamos con usted?
          </h2>
          <p className="text-muted-foreground mt-3 text-lg text-pretty">
            Revisamos su caso, le decimos qué le falta y le ayudamos a
            resolverlo: aviso de privacidad, procesos internos y medidas de
            seguridad.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="pixel" size="lg">
              <a href={CONTACT_HREF}>
                <MailIcon />
                Escríbanos
              </a>
            </Button>
            <Button asChild variant="pixelOutline" size="lg">
              <Link to="/servicios/evaluacion-proteccion-datos">
                Ver el servicio
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-10 text-xs leading-relaxed">
            Material informativo y de autodiagnóstico. No constituye asesoría
            legal ni certificación oficial de la ACE.
          </p>
        </div>
      </section>
    </>
  )
}

export default CompleteGuidePage
