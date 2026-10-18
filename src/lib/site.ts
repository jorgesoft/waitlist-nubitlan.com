/** Single source of truth for site navigation and contact details. */

export const SITE = {
  name: 'Nubitlan',
  email: 'contact@nubitlan.com',
  linkedin: 'https://www.linkedin.com/company/nubitlan',
  url: 'https://nubitlan.com',
} as const

/** Free LPDP self-assessment workbook (open source, CC BY-SA 4.0). */
export const SELF_ASSESSMENT = {
  repo: 'https://github.com/Nubitlan-Security/autoevaluacion-lpdp',
  download:
    'https://github.com/Nubitlan-Security/autoevaluacion-lpdp/raw/refs/heads/main/dist/Autoevaluacion-LPDP.xlsx',
  guide: '/guia_completa',
} as const

export interface NavLink {
  label: string
  to: string
  description?: string
}

export const SERVICES: NavLink[] = [
  {
    label: 'Evaluación de Seguridad con IA',
    to: '/servicios/evaluacion-seguridad-ia',
    description: 'Analiza tu exposición externa con apoyo de IA.',
  },
  {
    label: 'Evaluación de Protección de Datos',
    to: '/servicios/evaluacion-proteccion-datos',
    description: 'Diagnóstico inicial frente a la Ley de Datos.',
  },
  {
    label: 'Capacitación en Seguridad',
    to: '/servicios/capacitacion-seguridad',
    description: 'Entrena a tu equipo con casos reales.',
  },
]

export const MAIN_NAV: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Herramientas', to: '/herramientas' },
  { label: 'Blog', to: '/blog' },
  { label: 'Quiénes Somos', to: '/quienes-somos' },
  { label: 'Caso de Estudio', to: '/caso-de-estudio' },
]

export const FOOTER_LEGAL: NavLink[] = [
  { label: 'Política de Privacidad', to: '/privacidad' },
  { label: 'Términos y Condiciones', to: '/terminos' },
]
