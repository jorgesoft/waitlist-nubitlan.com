import { isAudienceSlug, type AudienceSlug } from './slugs'

/**
 * The "Solicitar evaluación gratuita" request from the flyer landing pages.
 *
 * Shared by the browser form (for inline hints), the Cloudflare Worker
 * (worker/index.ts) and the `vite dev` middleware, so the server always
 * applies exactly the rules the page shows.
 *
 * LPDP data minimisation: `parseSolicitud` copies only the fields below out
 * of the request body. Anything else a client sends is dropped, never stored.
 */

export const EMPLOYEE_RANGES = ['1-10', '11-50', '51-200', '201+'] as const
export type EmployeeRange = (typeof EMPLOYEE_RANGES)[number]

export const EMPLOYEE_RANGE_LABELS: Record<EmployeeRange, string> = {
  '1-10': '1 a 10',
  '11-50': '11 a 50',
  '51-200': '51 a 200',
  '201+': 'Más de 200',
}

export const SERVICES = ['capacitacion', 'plan'] as const
export type Service = (typeof SERVICES)[number]

export const SERVICE_LABELS: Record<Service, string> = {
  capacitacion: 'Capacitación de concientización en seguridad',
  plan: 'Plan de ciberseguridad y cumplimiento con la LPDP',
}

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
export type UtmKey = (typeof UTM_KEYS)[number]

/** Name of the honeypot input. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = 'sitio_web'

/** Submissions sent faster than this after the page rendered are bots. */
export const MIN_FILL_MS = 2500

export interface Solicitud {
  nombre: string
  cargo: string
  organizacion: string
  telefono: string
  correo: string
  empleados: EmployeeRange
  servicios: Service[]
  segmento: AudienceSlug
  consentimiento: true
  utm: Partial<Record<UtmKey, string>>
}

export type FieldName =
  | 'nombre'
  | 'cargo'
  | 'organizacion'
  | 'telefono'
  | 'correo'
  | 'empleados'
  | 'servicios'
  | 'consentimiento'
  | 'segmento'

export type FieldErrors = Partial<Record<FieldName, string>>

export type ParseResult =
  | { ok: true; data: Solicitud }
  | { ok: false; errors: FieldErrors }
  /** Honeypot filled or sent implausibly fast: answer as if it worked, store nothing. */
  | { ok: false; spam: true }

const LIMITS = { nombre: 100, cargo: 80, organizacion: 120, correo: 254, utm: 100 }

/** Collapses whitespace and strips control characters. */
function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  const printable = Array.from(value, (char) => {
    const code = char.charCodeAt(0)
    return code < 0x20 || code === 0x7f ? ' ' : char
  }).join('')
  return printable
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

// Deliberately simple: one @, a dot in the domain, no spaces.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Accepts Salvadoran numbers (8 digits, optionally +503) and international
 * numbers with a leading +. Returns a normalised "+503 7123-4567"-style
 * string, or null.
 */
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim()
  const digits = trimmed.replace(/\D/g, '')

  if (digits.length === 8 && /^[267]/.test(digits)) {
    return `+503 ${digits.slice(0, 4)}-${digits.slice(4)}`
  }
  if (digits.length === 11 && digits.startsWith('503') && /^[267]/.test(digits.slice(3))) {
    return `+503 ${digits.slice(3, 7)}-${digits.slice(7)}`
  }
  if (trimmed.startsWith('+') && digits.length >= 8 && digits.length <= 15) {
    return `+${digits}`
  }
  return null
}

/** Field-level checks, shared with the browser for inline messages. */
export function validateField(name: FieldName, value: unknown): string | null {
  switch (name) {
    case 'nombre':
      return clean(value, LIMITS.nombre).length >= 3 ? null : 'Escriba su nombre completo.'
    case 'cargo':
      return clean(value, LIMITS.cargo).length >= 2 ? null : 'Indique su cargo.'
    case 'organizacion':
      return clean(value, LIMITS.organizacion).length >= 2 ? null : 'Indique el nombre de su organización.'
    case 'telefono':
      return normalizePhone(typeof value === 'string' ? value : '')
        ? null
        : 'Escriba un número de 8 dígitos, por ejemplo 7123-4567.'
    case 'correo': {
      const email = clean(value, LIMITS.correo)
      return EMAIL.test(email) ? null : 'Escriba un correo válido, por ejemplo nombre@empresa.com.'
    }
    case 'empleados':
      return (EMPLOYEE_RANGES as readonly unknown[]).includes(value)
        ? null
        : 'Seleccione el número aproximado de empleados.'
    case 'servicios':
      return Array.isArray(value) && value.some((item) => (SERVICES as readonly unknown[]).includes(item))
        ? null
        : 'Seleccione al menos un servicio.'
    case 'consentimiento':
      return value === true || value === 'true' || value === 'on'
        ? null
        : 'Necesitamos su autorización para poder contactarle.'
    case 'segmento':
      return isAudienceSlug(value) ? null : 'Segmento no válido.'
  }
}

const FIELDS: FieldName[] = [
  'nombre',
  'cargo',
  'organizacion',
  'telefono',
  'correo',
  'empleados',
  'servicios',
  'consentimiento',
  'segmento',
]

/**
 * Validates an untrusted request body and returns only the allowed fields.
 * `startedAt` is the epoch-ms timestamp the form was rendered at.
 */
export function parseSolicitud(body: unknown, now = Date.now()): ParseResult {
  const input = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>

  const honeypot = input[HONEYPOT_FIELD]
  const startedAt = Number(input.startedAt)
  if (
    (typeof honeypot === 'string' && honeypot.trim() !== '') ||
    (Number.isFinite(startedAt) && startedAt > 0 && now - startedAt < MIN_FILL_MS)
  ) {
    return { ok: false, spam: true }
  }

  const errors: FieldErrors = {}
  for (const field of FIELDS) {
    const error = validateField(field, input[field])
    if (error) errors[field] = error
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const utm: Partial<Record<UtmKey, string>> = {}
  const rawUtm = (input.utm && typeof input.utm === 'object' ? input.utm : {}) as Record<string, unknown>
  for (const key of UTM_KEYS) {
    const value = clean(rawUtm[key], LIMITS.utm)
    if (value) utm[key] = value
  }

  const servicios = SERVICES.filter((service) => (input.servicios as unknown[]).includes(service))

  return {
    ok: true,
    data: {
      nombre: clean(input.nombre, LIMITS.nombre),
      cargo: clean(input.cargo, LIMITS.cargo),
      organizacion: clean(input.organizacion, LIMITS.organizacion),
      telefono: normalizePhone(String(input.telefono))!,
      correo: clean(input.correo, LIMITS.correo).toLowerCase(),
      empleados: input.empleados as EmployeeRange,
      servicios,
      segmento: input.segmento as AudienceSlug,
      consentimiento: true,
      utm,
    },
  }
}

/**
 * Plain-text notification body for a submission. Used by whatever delivery
 * the Worker is wired to (see `deliverSolicitud` in worker/solicitud.ts).
 */
export function formatNotification(data: Solicitud, receivedAt: Date): { subject: string; text: string } {
  const utm = Object.entries(data.utm)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join('\n')

  return {
    subject: `Nueva solicitud (${data.segmento}): ${data.organizacion}`,
    text: [
      `Segmento: ${data.segmento}`,
      `Recibida: ${receivedAt.toISOString()}`,
      '',
      `Nombre: ${data.nombre}`,
      `Cargo: ${data.cargo}`,
      `Organización: ${data.organizacion}`,
      `Teléfono / WhatsApp: ${data.telefono}`,
      `Correo: ${data.correo}`,
      `Empleados: ${EMPLOYEE_RANGE_LABELS[data.empleados]}`,
      `Servicios: ${data.servicios.map((service) => SERVICE_LABELS[service]).join('; ')}`,
      `Consentimiento: sí`,
      utm ? `\nUTM:\n${utm}` : '',
    ].join('\n'),
  }
}
