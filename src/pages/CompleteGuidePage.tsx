import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, DownloadIcon, FileSpreadsheetIcon } from 'lucide-react'

import { SITE } from '@/lib/site'
import { PageHeader } from '@/components/PageHeader'
import { PixelIcon } from '@/components/pixel/icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const SELF_ASSESSMENT_URL =
  'https://github.com/Nubitlan-Security/autoevaluacion-lpdp/raw/refs/heads/main/dist/Autoevaluacion-LPDP.xlsx'

/** Table of contents; ids match the section anchors below. */
const SECTIONS = [
  { id: 'a-quien-aplica', label: '¿A quién aplica la ley?' },
  { id: 'conceptos', label: 'Conceptos clave' },
  { id: 'principios', label: 'Principios del tratamiento' },
  { id: 'paso-a-paso', label: 'Plan de cumplimiento en 10 pasos' },
  { id: 'documentos', label: 'Documentos que deberías tener' },
  { id: 'preguntas', label: 'Preguntas frecuentes' },
]

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Nombra a un responsable interno',
    body: 'Asigna a una persona (o un pequeño comité) que coordine el cumplimiento, reciba solicitudes de los titulares y sea el punto de contacto ante incidentes. Sin un dueño claro, el resto del plan no avanza.',
  },
  {
    title: 'Inventaria tus datos personales',
    body: 'Lista cada proceso que usa datos personales: ventas, facturación, recursos humanos, marketing, soporte, videovigilancia. Para cada uno anota qué datos recolectas, de quién, en qué sistema viven, quién tiene acceso, con quién los compartes y cuánto tiempo los guardas.',
  },
  {
    title: 'Identifica la base legal de cada tratamiento',
    body: 'Para cada proceso del inventario documenta por qué tienes derecho a tratar esos datos: consentimiento del titular, ejecución de un contrato, cumplimiento de una obligación legal u otra base permitida. Si no encuentras una base, deja de recolectar ese dato.',
  },
  {
    title: 'Minimiza y define plazos de conservación',
    body: 'Elimina los datos que no necesitas y fija cuánto tiempo conservas cada categoría. Luego configura el proceso que efectivamente los elimina o anonimiza al vencer el plazo: una política sin ejecución no es evidencia.',
  },
  {
    title: 'Publica tu aviso de privacidad',
    body: 'Redacta un aviso en lenguaje sencillo que diga quién recolecta los datos, para qué, con qué base, con quién se comparten, por cuánto tiempo se guardan y cómo ejercer los derechos. Colócalo donde la gente entrega sus datos: formularios web, contratos, punto de venta.',
  },
  {
    title: 'Gestiona el consentimiento',
    body: 'Cuando el consentimiento sea tu base legal, asegúrate de que sea libre, informado, específico e inequívoco, y de que puedas demostrar cuándo y cómo se otorgó. Para datos sensibles, pide consentimiento expreso. Ofrece una forma igual de sencilla para retirarlo.',
  },
  {
    title: 'Habilita los derechos de los titulares',
    body: 'Define un canal conocido (por ejemplo, un correo dedicado) y un procedimiento interno para atender solicitudes de acceso, rectificación, cancelación y oposición, entre otros derechos. Registra cada solicitud, verifica la identidad del solicitante y responde dentro del plazo legal.',
  },
  {
    title: 'Formaliza la relación con tus proveedores',
    body: 'Hosting, nube, nómina, CRM, agencias de marketing: si un tercero trata datos por cuenta tuya, firma un contrato que limite el uso de los datos a tus instrucciones, exija medidas de seguridad y regule qué pasa al terminar la relación. Revisa también si los datos salen del país.',
  },
  {
    title: 'Implementa medidas de seguridad demostrables',
    body: 'Control de acceso con mínimo privilegio, autenticación multifactor, cifrado donde corresponda, respaldos probados, registro de accesos, baja oportuna de ex empleados y capacitación del personal. Documenta cada medida para poder demostrarla.',
  },
  {
    title: 'Prepara tu respuesta ante incidentes',
    body: 'Ten un plan escrito: quién decide, cómo se contiene el incidente, cómo se evalúa el impacto, a quién se notifica (autoridad y titulares afectados, cuando corresponda) y cómo se documenta. Practícalo al menos una vez al año.',
  },
]

const DOCUMENTS = [
  'Inventario o registro de actividades de tratamiento',
  'Aviso de privacidad (web, contratos y puntos de recolección)',
  'Política interna de protección de datos',
  'Formularios y registros de consentimiento',
  'Procedimiento para atender derechos de los titulares',
  'Política de conservación y eliminación de datos',
  'Contratos o cláusulas con encargados y proveedores',
  'Política de seguridad de la información y control de accesos',
  'Plan de respuesta ante incidentes y bitácora de incidentes',
  'Registro de capacitaciones al personal',
]

const FAQS = [
  {
    q: '¿Mi empresa es muy pequeña para que la ley le aplique?',
    a: 'El tamaño no es lo que determina si la ley aplica, sino si tratas datos personales. Una pyme con una base de clientes en una hoja de cálculo ya trata datos personales. Lo que sí cambia con el tamaño es la complejidad razonable de las medidas.',
  },
  {
    q: '¿Basta con copiar un aviso de privacidad de otra empresa?',
    a: 'No. El aviso debe describir lo que tu empresa realmente hace con los datos. Un aviso copiado que no coincide con tus procesos crea un riesgo adicional, porque documenta compromisos que no cumples.',
  },
  {
    q: '¿Los datos de mis empleados también están cubiertos?',
    a: 'Sí. Expedientes de personal, planillas, datos de salud, controles de asistencia biométricos y cámaras en el lugar de trabajo son tratamientos de datos personales y deben estar en tu inventario.',
  },
  {
    q: '¿Qué hago con los datos que ya tengo desde antes de la ley?',
    a: 'Inclúyelos en tu inventario, verifica que tengan una base legal vigente y elimina lo que no necesitas. Si dependías de un consentimiento que no puedes demostrar, evalúa si existe otra base o si debes solicitarlo de nuevo.',
  },
  {
    q: '¿Cómo uso la hoja de autoevaluación?',
    a: 'Descárgala, respóndela con las personas que conocen cada área (legal, TI, RR. HH., ventas) y usa los resultados para priorizar. Repítela periódicamente para medir tu avance.',
  },
]

function CompleteGuidePage() {
  React.useEffect(() => {
    const previous = document.title
    document.title = `Guía completa de cumplimiento LPDP — ${SITE.name}`
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Guía completa"
        title="Cómo cumplir la Ley de Protección de Datos Personales"
        description="Una guía paso a paso para que tu empresa en El Salvador pase de la incertidumbre a un programa de cumplimiento demostrable, con una hoja de autoevaluación gratuita."
        icon={<PixelIcon name="book" className="text-primary size-14" />}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="pixel" size="lg">
            <a href={SELF_ASSESSMENT_URL} download>
              <DownloadIcon />
              Descargar autoevaluación (.xlsx)
            </a>
          </Button>
          <Button asChild variant="pixelOutline" size="lg">
            <a href="#paso-a-paso">
              Ver el plan paso a paso
              <ArrowRightIcon />
            </a>
          </Button>
        </div>
      </PageHeader>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[15rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="eyebrow text-primary">En esta guía</h2>
            <ol className="mt-4 space-y-2.5 text-sm">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <div className="prose-nubitlan">
              <p>
                La Ley de Protección de Datos Personales (LPDP) establece reglas
                sobre cómo las organizaciones en El Salvador recolectan, usan,
                comparten, conservan y protegen la información de las personas.
                Esta guía traduce esas obligaciones en un plan de trabajo
                concreto. Si buscas una introducción breve, empieza por nuestro{' '}
                <Link to="/blog/ley-proteccion-datos-el-salvador-guia">
                  resumen de la ley
                </Link>
                .
              </p>

              <blockquote>
                Esta guía es informativa y no sustituye la asesoría legal sobre
                tu caso concreto. Verifica siempre el texto vigente de la ley y
                su reglamento.
              </blockquote>

              <h2 id="a-quien-aplica">¿A quién aplica la ley?</h2>
              <p>
                A cualquier persona natural o jurídica, pública o privada, que
                trate datos personales: desde una tienda con una lista de
                clientes en WhatsApp hasta un banco. Si tu empresa guarda datos
                de clientes, empleados, proveedores o visitantes, la ley te
                aplica, sin importar su tamaño.
              </p>

              <h2 id="conceptos">Conceptos clave</h2>
              <ul>
                <li>
                  <strong>Dato personal:</strong> cualquier información que
                  identifique o permita identificar a una persona: nombre, DUI,
                  teléfono, correo, dirección, fotografía, historial de compras.
                </li>
                <li>
                  <strong>Dato sensible:</strong> información cuyo uso indebido
                  puede causar discriminación o un daño grave, como salud,
                  biometría, creencias, vida sexual u origen étnico. Exige
                  protección reforzada y, en general, consentimiento expreso.
                </li>
                <li>
                  <strong>Titular:</strong> la persona a quien pertenecen los
                  datos.
                </li>
                <li>
                  <strong>Responsable:</strong> quien decide para qué y cómo se
                  tratan los datos. Normalmente, tu empresa.
                </li>
                <li>
                  <strong>Encargado:</strong> un tercero que trata los datos por
                  cuenta del responsable, como un proveedor de nube o de nómina.
                </li>
                <li>
                  <strong>Tratamiento:</strong> cualquier operación con datos:
                  recolectar, guardar, consultar, modificar, compartir o
                  eliminar.
                </li>
              </ul>

              <h2 id="principios">Principios del tratamiento</h2>
              <p>
                Todo el cumplimiento se apoya en unos pocos principios. Si una
                práctica de tu empresa choca con alguno, es una brecha.
              </p>
              <ul>
                <li>
                  <strong>Licitud y lealtad:</strong> trata datos solo con una
                  base legal y sin engañar al titular.
                </li>
                <li>
                  <strong>Finalidad:</strong> usa los datos solo para los fines
                  que informaste.
                </li>
                <li>
                  <strong>Minimización:</strong> recolecta únicamente lo
                  necesario.
                </li>
                <li>
                  <strong>Calidad:</strong> mantén los datos exactos y
                  actualizados.
                </li>
                <li>
                  <strong>Conservación limitada:</strong> no guardes los datos
                  más tiempo del necesario.
                </li>
                <li>
                  <strong>Seguridad y confidencialidad:</strong> protégelos
                  contra accesos, pérdidas o alteraciones no autorizadas.
                </li>
                <li>
                  <strong>Responsabilidad proactiva:</strong> debes poder
                  demostrar que cumples, no solo afirmarlo.
                </li>
              </ul>
            </div>

            <DownloadCard className="my-14" />

            <h2
              id="paso-a-paso"
              className="scroll-mt-24 text-2xl font-bold tracking-tight"
            >
              Plan de cumplimiento en 10 pasos
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Avanza en orden: cada paso se apoya en el anterior. La hoja de
              autoevaluación te ayuda a medir dónde estás en cada uno.
            </p>
            <ol className="mt-8 space-y-4">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Card>
                    <CardContent className="flex gap-5 p-6">
                      <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-lg font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>

            <h2
              id="documentos"
              className="mt-16 scroll-mt-24 text-2xl font-bold tracking-tight"
            >
              Documentos que deberías tener
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              La evidencia es lo que demuestra el cumplimiento. Al terminar el
              plan, tu empresa debería contar con:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {DOCUMENTS.map((doc) => (
                <li
                  key={doc}
                  className="border-border bg-card flex items-start gap-3 rounded-lg border p-4 text-sm"
                >
                  <PixelIcon
                    name="check"
                    className="text-primary mt-0.5 size-4 shrink-0"
                  />
                  {doc}
                </li>
              ))}
            </ul>

            <h2
              id="preguntas"
              className="mt-16 scroll-mt-24 text-2xl font-bold tracking-tight"
            >
              Preguntas frecuentes
            </h2>
            <Accordion type="single" collapsible className="mt-6">
              {FAQS.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-balance">
            ¿Prefieres que te acompañemos?
          </h2>
          <p className="text-muted-foreground mt-3">
            Haz nuestra evaluación gratuita o conoce nuestro servicio de
            evaluación de cumplimiento con la Ley de Protección de Datos.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="pixel" size="lg">
              <Link to="/evaluacion">
                Comenzar evaluación
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button asChild variant="pixelOutline" size="lg">
              <Link to="/servicios/evaluacion-proteccion-datos">
                Ver el servicio
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

function DownloadCard({ className }: { className?: string }) {
  return (
    <Card
      className={`border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)] ${className ?? ''}`}
    >
      <CardContent className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center">
        <span className="bg-primary text-primary-foreground flex size-14 shrink-0 items-center justify-center rounded-xl">
          <FileSpreadsheetIcon className="size-7" />
        </span>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold tracking-tight">
            Hoja de autoevaluación LPDP
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Nuestra guía en Excel para revisar, punto por punto, el estado de
            cumplimiento de tu empresa. Gratuita y sin registro.
          </p>
        </div>
        <Button asChild variant="pixel" size="lg" className="shrink-0">
          <a href={SELF_ASSESSMENT_URL} download>
            <DownloadIcon />
            Descargar
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export default CompleteGuidePage
