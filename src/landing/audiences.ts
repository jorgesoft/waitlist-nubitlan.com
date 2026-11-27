import type { PixelIconName } from '@/components/pixel/icon'
import type { AudienceSlug } from './slugs'

/**
 * Per-audience copy for the flyer landing pages. The layout lives once, in
 * AudienceLandingPage.tsx; everything that differs between /escuelas, /isp
 * and /empresas is here. SEO title/description are in src/lib/seo.ts
 * (read from `seo` below).
 *
 * Register: Spanish (El Salvador), formal "usted".
 */

export interface Risk {
  title: string
  body: string
}

export interface Audience {
  slug: AudienceSlug
  seo: { title: string; description: string }
  /** Small label above the headline. */
  eyebrow: string
  /** The question; `headlineHighlight` (a substring) gets the sky gradient. */
  headline: string
  headlineHighlight: string
  /** Completes "Hablemos de su …" in the contact band. */
  contactNoun: string
  subtitle: string
  risks: [Risk, Risk, Risk]
  /** Why the LPDP applies to this audience in particular. */
  lpdpLead: string
  lpdpBody: string
  /** Who the training is for, completing "Cursos cortos en línea para …". */
  trainingFor: string
  /** Prefilled email: subject line and the word for "organization". */
  emailSubject: string
  organizationNoun: string
}

export const AUDIENCES: Record<AudienceSlug, Audience> = {
  escuelas: {
    slug: 'escuelas',
    seo: {
      title: 'Ciberseguridad gratuita para escuelas y colegios de Apopa',
      description:
        'Capacitación en seguridad para su personal y un plan de cumplimiento con la Ley de Protección de Datos Personales, sin costo, para escuelas y colegios de Apopa.',
    },
    eyebrow: 'Para escuelas y colegios',
    headline: '¿Su institución está protegida de ataques cibernéticos?',
    headlineHighlight: 'ataques cibernéticos',
    contactNoun: 'institución',
    subtitle:
      'Nubitlan ayuda sin costo a escuelas y colegios de Apopa a proteger los datos de sus estudiantes y a cumplir la ley.',
    risks: [
      {
        title: 'Pérdida de expedientes',
        body: 'Notas, títulos y datos de estudiantes y exalumnos pueden ser borrados o robados.',
      },
      {
        title: 'Clases y trámites detenidos',
        body: 'Sin sistemas, la matrícula, las notas y la actividad educativa se detienen.',
      },
      {
        title: 'Daño a la reputación',
        body: 'Una filtración rompe la confianza de los padres de familia.',
      },
    ],
    lpdpLead: 'La ley aplica a su institución',
    lpdpBody:
      'Su institución maneja datos de menores de edad y de sus familias: nombres, fechas de nacimiento, notas, información de salud y contactos de madres, padres y responsables. La Ley de Protección de Datos Personales le exige protegerlos, y los datos de niñas, niños y adolescentes requieren un cuidado especial.',
    trainingFor: 'docentes y personal administrativo',
    emailSubject: 'Evaluación gratuita para mi institución educativa',
    organizationNoun: 'Institución',
  },

  isp: {
    slug: 'isp',
    seo: {
      title: 'Ciberseguridad gratuita para proveedores de internet (ISP)',
      description:
        'Proteja su red, sus equipos MikroTik y los datos de sus abonados. Capacitación y plan de cumplimiento con la Ley de Protección de Datos Personales, sin costo, para ISP locales.',
    },
    eyebrow: 'Para proveedores de internet',
    headline: '¿Su red está protegida de ataques cibernéticos?',
    headlineHighlight: 'ataques cibernéticos',
    contactNoun: 'red',
    subtitle:
      'Nubitlan ayuda sin costo a proveedores de internet locales a proteger su red, sus equipos y los datos de sus clientes.',
    risks: [
      {
        title: 'Caída del servicio',
        body: 'Ataques DDoS o ransomware pueden dejar sin internet a sus clientes.',
      },
      {
        title: 'Equipos secuestrados',
        body: 'Routers y equipos MikroTik vulnerables pueden ser tomados por atacantes y usados en botnets.',
      },
      {
        title: 'Robo de datos de clientes',
        body: 'DUIs, direcciones y datos de pago pueden ser filtrados.',
      },
    ],
    lpdpLead: 'La ley aplica a su empresa',
    lpdpBody:
      'Su empresa guarda el registro de cada abonado: DUI, dirección de instalación, teléfono y datos de facturación y pago. La Ley de Protección de Datos Personales le exige proteger esa información y usarla solo para prestar el servicio.',
    trainingFor: 'técnicos, atención al cliente y cobros',
    emailSubject: 'Evaluación gratuita para mi ISP',
    organizationNoun: 'Empresa / ISP',
  },

  empresas: {
    slug: 'empresas',
    seo: {
      title: 'Ciberseguridad gratuita para empresas de Apopa',
      description:
        'Proteja su facturación, inventario y los datos de sus clientes. Capacitación para su personal y plan de cumplimiento con la Ley de Protección de Datos Personales, sin costo.',
    },
    eyebrow: 'Para empresas',
    headline: '¿Su empresa está protegida de ataques cibernéticos?',
    headlineHighlight: 'ataques cibernéticos',
    contactNoun: 'empresa',
    subtitle:
      'Nubitlan ayuda sin costo a empresas de Apopa a proteger sus sistemas y los datos de sus clientes, y a cumplir la ley.',
    risks: [
      {
        title: 'Sistemas secuestrados',
        body: 'Un ransomware puede bloquear su facturación, inventario y ventas.',
      },
      {
        title: 'Fraudes por correo',
        body: 'Correos falsos pueden engañar a su personal para hacer pagos o entregar contraseñas.',
      },
      {
        title: 'Robo de datos de clientes',
        body: 'Datos de clientes y empleados pueden quedar expuestos.',
      },
    ],
    lpdpLead: 'La ley aplica a su empresa',
    lpdpBody:
      'Su empresa trata datos de clientes y empleados: nombres, DUI, teléfonos, direcciones, planillas e historial de compras. La Ley de Protección de Datos Personales le exige protegerlos y usarlos solo para el fin con que los recogió.',
    trainingFor: 'todo su personal',
    emailSubject: 'Evaluación gratuita para mi empresa',
    organizationNoun: 'Empresa',
  },
}

/** Plain-language LPDP obligations, the same for every audience. */
export const OBLIGATIONS: { icon: PixelIconName; title: string; body: string }[] = [
  {
    icon: 'check',
    title: 'Pedir consentimiento',
    body: 'Informe qué datos pide y para qué, y obtenga la autorización de la persona antes de usarlos.',
  },
  {
    icon: 'target',
    title: 'Usar los datos solo para su finalidad',
    body: 'Use cada dato solo para el fin que informó. Para otro uso, debe avisar y pedir autorización.',
  },
  {
    icon: 'lock',
    title: 'Aplicar medidas de seguridad',
    body: 'Proteja la información con accesos controlados, contraseñas con doble factor, respaldos y equipos actualizados.',
  },
  {
    icon: 'users',
    title: 'Atender solicitudes de los titulares',
    body: 'Las personas pueden pedirle ver, corregir o eliminar sus datos, y usted debe responder dentro del plazo de ley.',
  },
]

/**
 * The three-step path every page leads to: self-assess, train the team,
 * then reach out for anything more. Links are added by the page.
 */
export const STEPS = {
  assess: {
    title: 'Evalúe qué tan preparado está',
    body: 'Haga la autoevaluación gratuita de la Ley de Protección de Datos: 19 preguntas sencillas y un plan de acción priorizado.',
  },
  train: {
    title: 'Capacite a su personal',
    /** Completed with the audience's `trainingFor`. */
    body: 'Cursos cortos en línea en TRX Lite para',
    bodyEnd: ': cómo reconocer correos falsos, crear contraseñas seguras y manejar datos personales con cuidado.',
  },
  help: {
    title: 'Pida ayuda a Nubitlan',
    body: '¿Necesita apoyo con su plan de ciberseguridad o con el cumplimiento de la ley? Escríbanos y coordinamos una reunión corta.',
  },
}
