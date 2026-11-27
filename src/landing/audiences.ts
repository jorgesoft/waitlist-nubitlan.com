import type { LucideIcon } from 'lucide-react'
import {
  DatabaseZapIcon,
  FileXIcon,
  LockKeyholeIcon,
  MailWarningIcon,
  PauseCircleIcon,
  RouterIcon,
  ShieldAlertIcon,
  WifiOffIcon,
} from 'lucide-react'

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
  icon: LucideIcon
  title: string
  body: string
}

export interface Audience {
  slug: AudienceSlug
  seo: { title: string; description: string }
  /** Small label above the headline. */
  eyebrow: string
  headline: string
  subtitle: string
  risks: [Risk, Risk, Risk]
  /** Why the LPDP applies to this audience in particular. */
  lpdpLead: string
  lpdpBody: string
  /** Who the training is for, completing "Cursos cortos en línea para …". */
  trainingFor: string
  organizationLabel: string
  organizationPlaceholder: string
  /** Prefilled WhatsApp message after a successful submission. */
  whatsappText: string
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
    subtitle:
      'Nubitlan ayuda sin costo a escuelas y colegios de Apopa a proteger los datos de sus estudiantes y a cumplir la ley.',
    risks: [
      {
        icon: FileXIcon,
        title: 'Pérdida de expedientes',
        body: 'Notas, títulos y datos de estudiantes y exalumnos pueden ser borrados o robados.',
      },
      {
        icon: PauseCircleIcon,
        title: 'Clases y trámites detenidos',
        body: 'Sin sistemas, la matrícula, las notas y la actividad educativa se detienen.',
      },
      {
        icon: ShieldAlertIcon,
        title: 'Daño a la reputación',
        body: 'Una filtración rompe la confianza de los padres de familia.',
      },
    ],
    lpdpLead: 'La ley aplica a su institución',
    lpdpBody:
      'Su institución maneja datos de menores de edad y de sus familias: nombres, fechas de nacimiento, notas, información de salud y contactos de madres, padres y responsables. La Ley de Protección de Datos Personales le exige protegerlos, y los datos de niñas, niños y adolescentes requieren un cuidado especial.',
    trainingFor: 'docentes y personal administrativo',
    organizationLabel: 'Nombre de la institución',
    organizationPlaceholder: 'Colegio …',
    whatsappText: 'Hola, envié una solicitud desde nubitlan.com/escuelas y quisiera más información.',
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
    subtitle:
      'Nubitlan ayuda sin costo a proveedores de internet locales a proteger su red, sus equipos y los datos de sus clientes.',
    risks: [
      {
        icon: WifiOffIcon,
        title: 'Caída del servicio',
        body: 'Ataques DDoS o ransomware pueden dejar sin internet a sus clientes.',
      },
      {
        icon: RouterIcon,
        title: 'Equipos secuestrados',
        body: 'Routers y equipos MikroTik vulnerables pueden ser tomados por atacantes y usados en botnets.',
      },
      {
        icon: DatabaseZapIcon,
        title: 'Robo de datos de clientes',
        body: 'DUIs, direcciones y datos de pago pueden ser filtrados.',
      },
    ],
    lpdpLead: 'La ley aplica a su empresa',
    lpdpBody:
      'Su empresa guarda el registro de cada abonado: DUI, dirección de instalación, teléfono y datos de facturación y pago. La Ley de Protección de Datos Personales le exige proteger esa información y usarla solo para prestar el servicio.',
    trainingFor: 'técnicos, atención al cliente y cobros',
    organizationLabel: 'Nombre de la empresa / ISP',
    organizationPlaceholder: 'Mi ISP, S.A. de C.V.',
    whatsappText: 'Hola, envié una solicitud desde nubitlan.com/isp y quisiera más información.',
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
    subtitle:
      'Nubitlan ayuda sin costo a empresas de Apopa a proteger sus sistemas y los datos de sus clientes, y a cumplir la ley.',
    risks: [
      {
        icon: LockKeyholeIcon,
        title: 'Sistemas secuestrados',
        body: 'Un ransomware puede bloquear su facturación, inventario y ventas.',
      },
      {
        icon: MailWarningIcon,
        title: 'Fraudes por correo',
        body: 'Correos falsos pueden engañar a su personal para hacer pagos o entregar contraseñas.',
      },
      {
        icon: DatabaseZapIcon,
        title: 'Robo de datos de clientes',
        body: 'Datos de clientes y empleados pueden quedar expuestos.',
      },
    ],
    lpdpLead: 'La ley aplica a su empresa',
    lpdpBody:
      'Su empresa trata datos de clientes y empleados: nombres, DUI, teléfonos, direcciones, planillas e historial de compras. La Ley de Protección de Datos Personales le exige protegerlos y usarlos solo para el fin con que los recogió.',
    trainingFor: 'todo su personal',
    organizationLabel: 'Nombre de la empresa',
    organizationPlaceholder: 'Mi empresa, S.A. de C.V.',
    whatsappText: 'Hola, envié una solicitud desde nubitlan.com/empresas y quisiera más información.',
  },
}

/** Plain-language LPDP obligations, the same for every audience. */
export const OBLIGATIONS = [
  {
    title: 'Pedir consentimiento',
    body: 'Informe qué datos pide y para qué, y obtenga la autorización de la persona antes de usarlos.',
  },
  {
    title: 'Usar los datos solo para su finalidad',
    body: 'Use cada dato solo para el fin que informó. Para otro uso, debe avisar y pedir autorización.',
  },
  {
    title: 'Aplicar medidas de seguridad',
    body: 'Proteja la información con accesos controlados, contraseñas con doble factor, respaldos y equipos actualizados.',
  },
  {
    title: 'Atender solicitudes de los titulares',
    body: 'Las personas pueden pedirle ver, corregir o eliminar sus datos, y usted debe responder dentro del plazo de ley.',
  },
]

export const STEPS = [
  { title: 'Llene el formulario', body: 'Toma menos de dos minutos.' },
  { title: 'Le contactamos para una reunión corta', body: 'Por teléfono, videollamada o en persona.' },
  { title: 'Recibe su plan y acceso a la capacitación', body: 'Sin costo y sin compromiso.' },
]
