import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  GithubIcon,
} from 'lucide-react'

import { SITE } from '@/lib/site'
import { PageHeader } from '@/components/PageHeader'
import { PixelIcon } from '@/components/pixel/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const SELF_ASSESSMENT_REPO =
  'https://github.com/Nubitlan-Security/autoevaluacion-lpdp'
const SELF_ASSESSMENT_URL = `${SELF_ASSESSMENT_REPO}/raw/refs/heads/main/dist/Autoevaluacion-LPDP.xlsx`

/** Table of contents; ids match the section anchors below. */
const SECTIONS = [
  { id: 'reforma-2026', label: 'Reforma de septiembre de 2026' },
  { id: 'marco-normativo', label: 'Marco normativo' },
  { id: 'conceptos', label: 'Conceptos clave' },
  { id: 'arco-pol', label: 'Derechos ARCO-POL y plazos' },
  { id: 'controles', label: 'Los 19 controles' },
  { id: 'vulneraciones', label: 'Vulneraciones: 72 horas' },
  { id: 'autoevaluacion', label: 'Cómo usar la autoevaluación' },
  { id: 'preguntas', label: 'Preguntas frecuentes' },
]

/** Response deadlines for ARCO-POL requests (LPDP, text as reformed in 2026). */
const DEADLINES = [
  {
    what: 'Responder la solicitud',
    term: '20 días hábiles, prorrogables por otros 20',
    basis: 'Art. 20',
  },
  {
    what: 'Prevenir al titular para que complete su solicitud',
    term: '10 días hábiles',
    basis: 'Art. 18',
  },
  {
    what: 'Avisar que la empresa no es competente',
    term: '5 días hábiles',
    basis: 'Art. 19',
  },
  {
    what: 'Avisar de una rectificación',
    term: '5 días hábiles',
    basis: 'Art. 21',
  },
  {
    what: 'Comunicar una denegatoria',
    term: '3 días hábiles',
    basis: 'Art. 22',
  },
  {
    what: 'Avisar de la revocación del consentimiento',
    term: '5 días hábiles',
    basis: 'Art. 30',
  },
]

type Priority = 'Alta' | 'Media'

interface Control {
  question: string
  action: string
  why: string
  basis: string
  priority: Priority
  owner: string
}

/**
 * Mirrors the "Autoevaluación" and "Plan de acción" sheets of the workbook.
 * Keep in sync with scripts/build_workbook.py in the autoevaluacion-lpdp repo.
 */
const CONTROL_GROUPS: { category: string; controls: Control[] }[] = [
  {
    category: 'Organización',
    controls: [
      {
        question:
          'Política interna escrita de protección de datos personales, conocida por el personal',
        action:
          'Redactar y aprobar una política interna de protección de datos personales, y divulgarla a todo el personal.',
        why: 'Sin una política escrita no existe una referencia común sobre cómo tratar un dato personal, y ante una inspección de la ACE no podrá demostrar que el tema se gestiona de forma ordenada.',
        basis:
          'Políticas ACE N.º 001-0309025-DPDP, Art. 4 (Medidas Organizativas, lit. a) y Art. 6 lit. a)',
        priority: 'Alta',
        owner: 'Entidad',
      },
      {
        question:
          'Persona o área designada para atender solicitudes ARCO-POL y orientar a dependencias y proveedores',
        action:
          'Designar por escrito a una persona o área responsable de recibir y resolver las solicitudes ARCO-POL. Ya no se requiere nombrar un Delegado formal ni certificarlo ante la ACE, salvo en instituciones públicas.',
        why: 'Las solicitudes siguen llegando a la empresa y deben responderse en veinte días hábiles. Si nadie tiene el encargo de recibirlas, el plazo corre igual y normalmente se vence.',
        basis:
          'LPDP Art. 16 lit. b) (texto reformado en 2026); Art. 15 derogado; Art. 47 reformado',
        priority: 'Alta',
        owner: 'Entidad',
      },
      {
        question:
          'Lineamientos internos escritos para recibir, tramitar y resolver solicitudes ARCO-POL',
        action:
          'Redactar y aprobar lineamientos que definan quién recibe cada solicitud, cómo se registra, quién la resuelve, en qué plazos y cómo se documenta la respuesta al titular.',
        why: 'Es una obligación nueva y expresa para toda empresa. Sin lineamientos, cada solicitud se resuelve de forma improvisada y la empresa no puede demostrar que cuenta con un procedimiento.',
        basis: 'LPDP Art. 16 lit. d) (texto reformado en 2026)',
        priority: 'Alta',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Registro de Actividades de Tratamiento: qué datos recopila, para qué y dónde los almacena',
        action:
          'Elaborar un inventario de los tratamientos (finalidad, tipo de dato, base de tratamiento, plazo de conservación, a quién se transfiere) y mantenerlo actualizado.',
        why: 'Sin este registro no puede demostrar qué tratamientos realiza, lo que dificulta responder solicitudes ARCO-POL y cualquier requerimiento de la ACE.',
        basis:
          'Políticas ACE Art. 4 (Medidas Organizativas, lit. d) y Art. 6 lit. a)',
        priority: 'Alta',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Evaluación de Impacto en la Privacidad (EIPD) para los tratamientos de mayor riesgo',
        action:
          'Identificar los tratamientos de mayor riesgo (datos sensibles, datos de menores) y documentar sus riesgos y las medidas de mitigación adoptadas.',
        why: 'Sin una EIPD, la empresa no ha identificado formalmente los riesgos de sus tratamientos más sensibles ni cómo mitigarlos.',
        basis: 'Políticas ACE Art. 4 (Medidas Organizativas, lit. e)',
        priority: 'Media',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Capacitación anual del personal sobre protección de datos y derechos ARCO-POL',
        action:
          'Programar una capacitación anual para todo el personal, incluido el de nuevo ingreso, y conservar la evidencia.',
        why: 'Un personal sin capacitación comete más errores que terminan en vulneraciones, como enviar información al destinatario equivocado.',
        basis:
          'Políticas ACE Art. 4 (Medidas Organizativas, lit. c — Capacitación del Personal)',
        priority: 'Media',
        owner: 'Responsable interno o asesor legal',
      },
    ],
  },
  {
    category: 'Derechos de los titulares',
    controls: [
      {
        question:
          'Aviso de Privacidad publicado en el sitio web y/o en los establecimientos, autorizado y documentado',
        action:
          'Redactar y publicar el Aviso de Privacidad verificando que incluya todos los contenidos del Art. 24, en particular los medios para presentar solicitudes ARCO-POL. Conserve la documentación de su publicación.',
        why: 'Informar a clientes y empleados cómo se usan sus datos es una de las obligaciones más básicas. Tras la reforma, el aviso debe decir expresamente por qué medio se presentan las solicitudes.',
        basis: 'LPDP Art. 24, en especial lit. f) (texto reformado en 2026)',
        priority: 'Alta',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Medio claro (formulario, correo o ventanilla) para presentar solicitudes ARCO-POL ante la empresa',
        action:
          'Habilitar y publicar al menos un medio concreto para recibir solicitudes e indicarlo expresamente en el Aviso de Privacidad.',
        why: 'Las solicitudes ya no se canalizan a través de un Delegado: llegan directamente a la empresa. Si el titular no encuentra un medio claro, puede tomarse como un obstáculo a su ejercicio.',
        basis:
          'LPDP Art. 18 y Art. 24 lit. f) (texto reformado en 2026)',
        priority: 'Media',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Procedimiento interno que controle los plazos para resolver solicitudes ARCO-POL',
        action:
          'Implementar una bitácora que registre la fecha de cada solicitud, el plazo que le aplica y una alerta antes de su vencimiento.',
        why: 'Los plazos corren contra la empresa. Una solicitud sin respuesta dentro del plazo legal es en sí misma un incumplimiento, aunque después se resuelva favorablemente.',
        basis:
          'LPDP Arts. 18, 19, 20, 21, 22 y 30 (texto reformado en 2026)',
        priority: 'Alta',
        owner: 'Responsable interno o asesor legal',
      },
    ],
  },
  {
    category: 'Medidas técnicas',
    controls: [
      {
        question:
          'Protección contra programas maliciosos en todos los equipos, administrada desde una consola central',
        action:
          'Instalar una solución antimalware con consola central en todos los equipos y verificar periódicamente que esté activa y actualizada.',
        why: 'Un equipo sin protección centralizada puede infectarse sin que nadie se entere hasta que ya ocurrió una fuga de datos.',
        basis:
          'Políticas ACE Art. 4 (Medidas Técnicas, lit. e — Protección de Infraestructura)',
        priority: 'Alta',
        owner: 'Apoyo técnico',
      },
      {
        question:
          'Cifrado de equipos (laptops, discos) y respaldos que contienen datos personales',
        action:
          'Activar el cifrado de disco completo en los equipos con datos personales y cifrar los respaldos, incluidos los que se guardan fuera de las instalaciones.',
        why: 'Una laptop robada sin cifrado es una vulneración notificable. Con cifrado, normalmente no lo es.',
        basis:
          'Políticas ACE Art. 4 (Medidas Técnicas, lit. b — Cifrado de Datos)',
        priority: 'Alta',
        owner: 'Apoyo técnico',
      },
      {
        question:
          'Doble factor de autenticación (2FA/MFA) en el correo institucional y los sistemas críticos',
        action:
          'Activar la autenticación de doble factor en el correo y en todos los sistemas que almacenen o den acceso a datos personales.',
        why: 'Una contraseña filtrada o adivinada, sin un segundo factor, basta para que un tercero acceda y extraiga datos personales.',
        basis:
          'Políticas ACE Art. 4 (Medidas Técnicas, lit. a — Control de Acceso)',
        priority: 'Alta',
        owner: 'Apoyo técnico',
      },
      {
        question:
          'Mecanismo para detectar incidentes fuera del horario laboral (noches, fines de semana)',
        action:
          'Implementar alertas automáticas o un servicio de monitoreo que detecte incidentes en cualquier horario y active el protocolo de respuesta.',
        why: 'La mayoría de incidentes ocurren o se descubren fuera de horario. Sin monitoreo, el plazo de 72 horas para notificar puede correr sin que la empresa se entere.',
        basis:
          'Políticas ACE Art. 4 (Medidas Técnicas, lit. e; Medidas de Seguridad en Transferencias de Datos, lit. d)',
        priority: 'Alta',
        owner: 'Apoyo técnico',
      },
      {
        question:
          'Respaldos periódicos con pruebas de restauración exitosas',
        action:
          'Definir una frecuencia de respaldo acorde al volumen de información y realizar al menos una prueba de restauración al año, documentando el resultado.',
        why: 'Un respaldo nunca probado puede fallar justo cuando se necesita, por ejemplo tras un ataque de ransomware.',
        basis:
          'Políticas ACE Art. 4 (Medidas Técnicas, lit. d — Copias de Seguridad y Recuperación)',
        priority: 'Media',
        owner: 'Apoyo técnico',
      },
      {
        question:
          'Análisis periódicos de vulnerabilidades en los sistemas con datos personales',
        action:
          'Programar análisis de vulnerabilidades con una periodicidad definida (por ejemplo, anual) y dar seguimiento a los hallazgos.',
        why: 'Sin análisis periódicos, la empresa no sabe qué puertas quedaron abiertas hasta que alguien más las encuentra primero.',
        basis:
          'Políticas ACE Art. 4 (Medidas Técnicas, lit. f — Análisis de Vulnerabilidades y Pruebas de Penetración)',
        priority: 'Media',
        owner: 'Apoyo técnico',
      },
    ],
  },
  {
    category: 'Entorno y terceros',
    controls: [
      {
        question:
          'Contratos con proveedores que tratan datos por cuenta de la empresa, con cláusulas de tratamiento y confidencialidad',
        action:
          'Revisar los contratos vigentes con proveedores (nómina, hosting, mercadeo) e incorporar cláusulas de confidencialidad y tratamiento de datos; incluirlas también en los nuevos.',
        why: 'La empresa sigue siendo responsable ante la ACE por lo que haga el proveedor con los datos, pero sin cláusulas no puede exigirle nada.',
        basis:
          'Políticas ACE Art. 4 (Medidas de Seguridad en Transferencias de Datos, lit. b)',
        priority: 'Alta',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Procedimiento escrito para notificar una vulneración a la ACE, a la Fiscalía y a los titulares en 72 horas',
        action:
          'Documentar un procedimiento de respuesta a incidentes que defina quién decide, a quién se notifica y en qué plazo, para activarlo de inmediato.',
        why: 'Sin un procedimiento previo, las 72 horas se consumen decidiendo qué hacer, lo que aumenta el riesgo de notificar tarde o de forma incompleta.',
        basis:
          'Políticas ACE Art. 4 (Medidas de Seguridad en Transferencias de Datos, lit. d — Notificación de Brechas de Seguridad)',
        priority: 'Alta',
        owner: 'Responsable interno o asesor legal',
      },
      {
        question:
          'Acceso físico a servidores y archivos con datos personales restringido al personal autorizado',
        action:
          'Restringir el acceso a esas áreas mediante llave, tarjeta u otro control, y llevar un registro de ingreso.',
        why: 'Quien entra sin control a donde están los servidores o archivos puede copiar, alterar o sustraer datos sin dejar registro.',
        basis:
          'Políticas ACE Art. 4 (Medidas Físicas, lit. a — Control de Acceso a Instalaciones)',
        priority: 'Media',
        owner: 'Entidad',
      },
      {
        question:
          'Conocimiento del país o países donde se almacenan físicamente los datos personales',
        action:
          'Identificar en qué país se almacenan los datos con cada proveedor (nube, correo, respaldo) y verificar las condiciones de protección del país o del contrato.',
        why: 'Si no sabe dónde están sus datos, no puede verificar que el país de destino ofrezca una protección equivalente, requisito de toda transferencia internacional.',
        basis:
          'Políticas ACE Art. 4 (Medidas de Seguridad en Transferencias de Datos, lit. c — Transferencias Internacionales Seguras)',
        priority: 'Media',
        owner: 'Responsable interno o asesor legal',
      },
    ],
  },
]

const FAQS = [
  {
    q: '¿Mi empresa todavía tiene que nombrar un Delegado de Protección de Datos?',
    a: 'Conforme a las reformas aprobadas el 17 de septiembre de 2026, no: se derogaron los artículos 15 y 17 y la obligación queda solo para instituciones públicas. Pero la reforma entra en vigencia ocho días después de su publicación en el Diario Oficial; mientras eso no ocurra, rige el texto anterior. Verifique la fecha de publicación antes de decidir.',
  },
  {
    q: 'Si ya no hay Delegado, ¿qué tengo que hacer en su lugar?',
    a: 'Las funciones pasan a la empresa: designar internamente a alguien que reciba y resuelva las solicitudes ARCO-POL, tener lineamientos escritos para gestionarlas, publicar en el Aviso de Privacidad el medio para presentarlas y cumplir los plazos de respuesta.',
  },
  {
    q: '¿Mi empresa es muy pequeña para que la ley le aplique?',
    a: 'El tamaño no determina si la ley aplica, sino si trata datos personales. Una pyme con una base de clientes en una hoja de cálculo ya trata datos personales. Lo que sí cambia con el tamaño es la complejidad razonable de las medidas.',
  },
  {
    q: '¿Los datos de mis empleados también están cubiertos?',
    a: 'Sí. Expedientes de personal, planillas, controles de asistencia biométricos y cámaras en el lugar de trabajo son tratamientos de datos personales; además, los empleados también pueden presentar solicitudes ARCO-POL.',
  },
  {
    q: '¿La hoja de autoevaluación envía mis respuestas a Nubitlan?',
    a: 'No. Es un archivo de Excel que se descarga, se llena y se queda en su computadora. Funciona en Excel, LibreOffice Calc o Google Sheets, y no envía ni recopila ninguna información.',
  },
  {
    q: '¿El resultado certifica que cumplo con la LPDP?',
    a: 'No. La autoevaluación es declarativa: no verifica evidencia, no es una auditoría ni una certificación, y la ACE no participa en ella ni la respalda. Sirve para que la empresa identifique por sí misma sus brechas más evidentes.',
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
        title="Cómo cumplir la Ley para la Protección de Datos Personales"
        description="Qué exigen la LPDP, sus reformas de 2026 y la normativa de la ACE a una empresa privada en El Salvador, con una autoevaluación gratuita para medir dónde estás."
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
            <a href="#controles">
              Ver los 19 controles
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
                La Ley para la Protección de Datos Personales (LPDP) establece
                cómo las organizaciones en El Salvador pueden recolectar, usar,
                compartir, conservar y proteger la información de las personas.
                La Agencia de Ciberseguridad del Estado (ACE) la desarrolla con
                políticas que detallan las medidas de seguridad exigidas. Esta
                guía traduce ambas en un plan de trabajo concreto para una
                empresa privada. Si buscas una introducción breve, empieza por
                nuestro{' '}
                <Link to="/blog/ley-proteccion-datos-el-salvador-guia">
                  resumen de la ley
                </Link>
                .
              </p>

              <blockquote>
                Esta guía es informativa y de autodiagnóstico. No constituye
                asesoría legal ni certificación oficial de la ACE. Antes de
                tomar decisiones con impacto legal, contable o económico,
                consulta con un asesor calificado.
              </blockquote>

              <h2 id="reforma-2026">Reforma de septiembre de 2026</h2>
              <p>
                El 17 de septiembre de 2026 la Asamblea Legislativa aprobó
                reformas a la LPDP que cambian el reparto de obligaciones para
                las empresas privadas:
              </p>
              <ul>
                <li>
                  <strong>Ya no se exige un Delegado de Protección de Datos
                  Personales.</strong>{' '}
                  Se derogaron los artículos 15 y 17. La obligación subsiste
                  solo para las instituciones públicas (Art. 47 reformado).
                </li>
                <li>
                  <strong>Las obligaciones pasan a la empresa.</strong> El Art.
                  16 reformado le exige, entre otras cosas, orientar a sus
                  dependencias y proveedores (lit. b) y establecer lineamientos
                  internos escritos para gestionar las solicitudes ARCO-POL
                  (lit. d).
                </li>
                <li>
                  <strong>Las solicitudes se presentan directamente ante la
                  empresa</strong> (Art. 18 reformado), y los plazos corren
                  contra ella.
                </li>
                <li>
                  <strong>El Aviso de Privacidad debe indicar los medios para
                  presentar esas solicitudes</strong> (Art. 24 lit. f
                  reformado).
                </li>
              </ul>
              <blockquote>
                <strong>Sobre la vigencia:</strong> la reforma entra en vigor
                ocho días después de su publicación en el Diario Oficial.
                Mientras tanto sigue vigente el texto anterior. Esta guía se
                adelanta a la reforma para que no inviertas en nombrar un
                Delegado que ya no se te exigirá, pero verifica la fecha de
                publicación antes de tomar decisiones.
              </blockquote>

              <h2 id="marco-normativo">Marco normativo</h2>
              <ul>
                <li>
                  Ley para la Protección de Datos Personales (Decreto
                  Legislativo N.º 144).
                </li>
                <li>
                  Reformas a la LPDP aprobadas el 17 de septiembre de 2026.
                </li>
                <li>
                  Políticas de Actuación y Manejo de Datos Personales de la ACE
                  (Políticas N.º 001-0309025-DPDP), que detallan las medidas
                  organizativas, técnicas, físicas y de transferencia de datos.
                </li>
                <li>
                  Normativa para el Desarrollo del Procedimiento Administrativo
                  Sancionador en el Ámbito de la LPDP (Diario Oficial, Tomo 452,
                  N.º 146, 11 de agosto de 2026).
                </li>
              </ul>
              <p>
                Los Lineamientos para el Delegado de la ACE desarrollaban
                artículos que la reforma derogó o reescribió, por lo que ya no
                aplican a una empresa privada; siguen siendo pertinentes para
                las instituciones públicas.
              </p>

              <h2 id="conceptos">Conceptos clave</h2>
              <ul>
                <li>
                  <strong>Dato personal:</strong> cualquier información que
                  identifique o permita identificar a una persona: nombre, DUI,
                  teléfono, correo, dirección, fotografía, historial de compras.
                </li>
                <li>
                  <strong>Datos sensibles:</strong> como los de salud o
                  biométricos, o los de menores de edad, requieren mayor
                  cuidado; sus tratamientos son candidatos a una Evaluación de
                  Impacto en la Privacidad.
                </li>
                <li>
                  <strong>Titular:</strong> la persona a quien pertenecen los
                  datos: tus clientes, empleados o proveedores.
                </li>
                <li>
                  <strong>Sujeto obligado:</strong> quien trata los datos y
                  debe cumplir la ley. Normalmente, tu empresa.
                </li>
                <li>
                  <strong>Tratamiento:</strong> cualquier operación con datos:
                  recolectar, guardar, consultar, modificar, transferir o
                  eliminar.
                </li>
              </ul>

              <h2 id="arco-pol">Derechos ARCO-POL y plazos</h2>
              <p>
                Los titulares pueden ejercer ante tu empresa los derechos de{' '}
                <strong>A</strong>cceso, <strong>R</strong>ectificación,{' '}
                <strong>C</strong>ancelación, <strong>O</strong>posición,{' '}
                <strong>P</strong>ortabilidad, <strong>O</strong>lvido y{' '}
                <strong>L</strong>imitación. Tras la reforma, estos son los
                plazos que corren contra la empresa:
              </p>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Acción</th>
                      <th>Plazo</th>
                      <th>LPDP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEADLINES.map((row) => (
                      <tr key={row.basis}>
                        <td>{row.what}</td>
                        <td className="whitespace-nowrap">{row.term}</td>
                        <td className="whitespace-nowrap">{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Una solicitud sin respuesta dentro del plazo es en sí misma un
                incumplimiento, aunque después se resuelva a favor del titular.
              </p>
            </div>

            <DownloadCard className="my-14" />

            <h2
              id="controles"
              className="scroll-mt-24 text-2xl font-bold tracking-tight"
            >
              Los 19 controles
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Son los mismos que evalúa la hoja de autoevaluación, con la
              acción recomendada y su base legal. Empieza por los de prioridad{' '}
              <strong className="text-foreground">Alta</strong>, en especial el
              Aviso de Privacidad y los lineamientos internos para atender
              solicitudes ARCO-POL.
            </p>

            {CONTROL_GROUPS.map((group) => (
              <div key={group.category} className="mt-10">
                <h3 className="eyebrow text-primary">{group.category}</h3>
                <ol className="mt-4 space-y-4">
                  {group.controls.map((control) => (
                    <li key={control.question}>
                      <ControlCard control={control} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            <div className="prose-nubitlan mt-16">
              <h2 id="vulneraciones">Vulneraciones: 72 horas</h2>
              <p>
                Si ocurre una vulneración de datos personales, la empresa debe
                notificarla a la ACE, a la Fiscalía General de la República y a
                los titulares afectados en un plazo máximo de 72 horas. Ese
                plazo es corto, y en la práctica se pierde por dos motivos:
              </p>
              <ul>
                <li>
                  <strong>Nadie se entera a tiempo.</strong> Muchos incidentes
                  ocurren de noche o en fin de semana. Sin monitoreo, el plazo
                  corre sin que la empresa lo sepa.
                </li>
                <li>
                  <strong>Nadie sabe qué hacer.</strong> Sin un procedimiento
                  escrito, las horas se van decidiendo quién decide y a quién
                  avisar.
                </li>
              </ul>
              <p>
                El cifrado reduce el problema de raíz: una laptop robada sin
                cifrar es una vulneración notificable; con cifrado, normalmente
                no lo es.
              </p>

              <h2 id="autoevaluacion">Cómo usar la autoevaluación</h2>
              <p>
                La hoja está pensada para quien administra o dirige un negocio,
                no para un especialista. Se completa en menos de una hora y no
                envía tus respuestas a ningún lado.
              </p>
              <ol>
                <li>
                  Ábrela en Excel, LibreOffice Calc o Google Sheets y lee la
                  hoja <strong>Instrucciones</strong>.
                </li>
                <li>
                  En la hoja <strong>Autoevaluación</strong>, responde las 19
                  preguntas en la columna amarilla con <em>Sí</em>,{' '}
                  <em>Parcialmente</em>, <em>No</em> o <em>No sé</em>. Cada
                  respuesta distinta de “Sí” muestra en lenguaje simple qué
                  implica.
                </li>
                <li>
                  En <strong>Resultados</strong> verás tu porcentaje general y
                  por categoría, con una lectura de lo que significa.
                </li>
                <li>
                  En <strong>Plan de acción</strong> verás las acciones
                  pendientes ordenadas por prioridad y quién debería encargarse
                  de cada una.
                </li>
              </ol>
              <p>
                Puntaje: <em>Sí</em> vale 1, <em>Parcialmente</em> 0.5, y{' '}
                <em>No</em> y <em>No sé</em> valen 0. “No sé” cuenta igual que
                “No” porque un control que nadie puede confirmar no es un
                control del que se pueda dar cuenta ante la ACE, un cliente o
                una auditoría.
              </p>
              <p>
                El resultado es declarativo: no es una auditoría ni una
                certificación, y no vincula a la ACE. La hoja es de código
                abierto bajo licencia CC BY-SA 4.0; si encuentras una cita
                incorrecta, puedes{' '}
                <a
                  href={`${SELF_ASSESSMENT_REPO}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  reportarla en GitHub
                </a>
                .
              </p>
            </div>

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

function ControlCard({ control }: { control: Control }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
          <h4 className="flex-1 text-lg font-bold tracking-tight text-pretty">
            {control.question}
          </h4>
          <Badge variant={control.priority === 'Alta' ? 'pixel' : 'outline'}>
            Prioridad {control.priority}
          </Badge>
        </div>
        <p className="mt-3 leading-relaxed">{control.action}</p>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {control.why}
        </p>
        <dl className="text-muted-foreground mt-4 grid gap-1 font-mono text-xs sm:grid-cols-[auto_1fr] sm:gap-x-3">
          <dt className="text-foreground font-semibold">Base legal</dt>
          <dd>{control.basis}</dd>
          <dt className="text-foreground font-semibold">Responsable</dt>
          <dd>{control.owner}</dd>
        </dl>
      </CardContent>
    </Card>
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
            19 preguntas en lenguaje sencillo, con resultados por categoría y
            un plan de acción priorizado. Gratuita, de código abierto y sin
            registro.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <Button asChild variant="pixel" size="lg">
            <a href={SELF_ASSESSMENT_URL} download>
              <DownloadIcon />
              Descargar
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a
              href={SELF_ASSESSMENT_REPO}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Ver en GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompleteGuidePage
