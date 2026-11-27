import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2Icon, LoaderCircleIcon, MessageCircleIcon } from 'lucide-react'

import { WHATSAPP } from '@/lib/site'
import type { Audience } from './audiences'
import {
  EMPLOYEE_RANGE_LABELS,
  EMPLOYEE_RANGES,
  HONEYPOT_FIELD,
  SERVICE_LABELS,
  UTM_KEYS,
  validateField,
  type FieldErrors,
  type FieldName,
  type Service,
  type UtmKey,
} from './solicitud'

/**
 * Served by the `nubitlan-api` Cloudflare Worker on nubitlan.com/api/*
 * (same-origin in production, a Vite middleware in `npm run dev`). Other
 * builds, such as GitHub Pages previews, call the production URL.
 * Override with VITE_SOLICITUD_API.
 */
const ENDPOINT =
  import.meta.env.VITE_SOLICITUD_API ??
  (import.meta.env.DEV ||
  (typeof window !== 'undefined' && window.location.hostname === 'nubitlan.com')
    ? '/api/solicitud'
    : 'https://nubitlan.com/api/solicitud')

type TextField = 'nombre' | 'cargo' | 'organizacion' | 'telefono' | 'correo' | 'empleados'

interface Values {
  nombre: string
  cargo: string
  organizacion: string
  telefono: string
  correo: string
  empleados: string
  servicios: Service[]
  consentimiento: boolean
}

const EMPTY: Values = {
  nombre: '',
  cargo: '',
  organizacion: '',
  telefono: '',
  correo: '',
  empleados: '',
  servicios: [],
  consentimiento: false,
}

const ORDER: FieldName[] = [
  'nombre',
  'cargo',
  'organizacion',
  'telefono',
  'correo',
  'empleados',
  'servicios',
  'consentimiento',
]

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }

function readUtm(search: string): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(search)
  const utm: Partial<Record<UtmKey, string>> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value.slice(0, 100)
  }
  return utm
}

function whatsappHref(text: string): string | null {
  if (!WHATSAPP.number) return null
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(text)}`
}

export function RequestForm({ audience }: { audience: Audience }) {
  const { search } = useLocation()
  const utm = React.useMemo(() => readUtm(search), [search])
  const startedAt = React.useRef(Date.now())
  const formRef = React.useRef<HTMLFormElement>(null)
  const statusRef = React.useRef<HTMLDivElement>(null)

  const [values, setValues] = React.useState<Values>(EMPTY)
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [honeypot, setHoneypot] = React.useState('')
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' })

  const whatsapp = whatsappHref(audience.whatsappText)

  const check = (name: FieldName, next: Values) => {
    const error = validateField(name, next[name as keyof Values])
    setErrors((current) => ({ ...current, [name]: error ?? undefined }))
  }

  const setText = (name: TextField) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...values, [name]: event.target.value }
    setValues(next)
    // Clear an error as soon as the field becomes valid; new errors wait for blur.
    if (errors[name]) check(name, next)
  }

  const blur = (name: TextField) => () => {
    if (values[name]) check(name, values)
  }

  const toggleService = (service: Service | 'ambos') => (event: React.ChangeEvent<HTMLInputElement>) => {
    let servicios: Service[]
    if (service === 'ambos') {
      servicios = event.target.checked ? ['capacitacion', 'plan'] : []
    } else {
      servicios = event.target.checked
        ? [...new Set([...values.servicios, service])]
        : values.servicios.filter((item) => item !== service)
    }
    const next = { ...values, servicios }
    setValues(next)
    if (errors.servicios) check('servicios', next)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status.kind === 'sending') return

    const found: FieldErrors = {}
    for (const name of ORDER) {
      const error = validateField(name, values[name as keyof Values])
      if (error) found[name] = error
    }
    setErrors(found)

    const first = ORDER.find((name) => found[name])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus()
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...values,
          segmento: audience.slug,
          utm,
          [HONEYPOT_FIELD]: honeypot,
          startedAt: startedAt.current,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors }

      if (!response.ok) {
        if (data.fields) setErrors(data.fields)
        throw new Error(data.error ?? 'No pudimos enviar su solicitud.')
      }

      setStatus({ kind: 'sent' })
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof TypeError
            ? 'No pudimos conectar con el servidor. Revise su conexión e intente de nuevo.'
            : error instanceof Error
              ? error.message
              : 'No pudimos enviar su solicitud.',
      })
    }
  }

  // Move focus to the result so screen-reader and keyboard users hear it.
  React.useEffect(() => {
    if (status.kind === 'sent' || status.kind === 'error') statusRef.current?.focus()
  }, [status.kind])

  if (status.kind === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="fl-card mt-6 p-5 outline-none sm:p-6">
        <CheckCircle2Icon className="fl-icon size-10" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-3 text-xl font-extrabold">¡Gracias! Recibimos su solicitud.</h3>
        <p className="mt-2 leading-relaxed">
          Le contactaremos al teléfono o correo que nos indicó para coordinar una reunión corta.
        </p>
        {whatsapp ? (
          <>
            <p className="mt-4 leading-relaxed">¿Prefiere hablar ahora? Escríbanos por WhatsApp.</p>
            <a href={whatsapp} className="fl-btn fl-btn-outline mt-3" target="_blank" rel="noopener">
              <MessageCircleIcon className="size-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </>
        ) : null}
      </div>
    )
  }

  const servicesAll = values.servicios.length === 2

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-6 grid gap-5" aria-describedby="form-nota">
      <p id="form-nota" className="text-sm">
        Todos los campos son obligatorios.
      </p>

      <Field name="nombre" label="Nombre completo" error={errors.nombre}>
        {(props) => (
          <input
            {...props}
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.nombre}
            onChange={setText('nombre')}
            onBlur={blur('nombre')}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="cargo" label="Cargo" error={errors.cargo}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="organization-title"
              maxLength={80}
              placeholder="Director, gerente, encargado de TI…"
              value={values.cargo}
              onChange={setText('cargo')}
              onBlur={blur('cargo')}
            />
          )}
        </Field>
        <Field name="organizacion" label={audience.organizationLabel} error={errors.organizacion}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="organization"
              maxLength={120}
              placeholder={audience.organizationPlaceholder}
              value={values.organizacion}
              onChange={setText('organizacion')}
              onBlur={blur('organizacion')}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="telefono" label="Teléfono / WhatsApp" error={errors.telefono}>
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="7123-4567"
              value={values.telefono}
              onChange={setText('telefono')}
              onBlur={blur('telefono')}
            />
          )}
        </Field>
        <Field name="correo" label="Correo electrónico" error={errors.correo}>
          {(props) => (
            <input
              {...props}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={254}
              placeholder="nombre@empresa.com"
              value={values.correo}
              onChange={setText('correo')}
              onBlur={blur('correo')}
            />
          )}
        </Field>
      </div>

      <Field name="empleados" label="Número aproximado de empleados" error={errors.empleados}>
        {(props) => (
          <select {...props} value={values.empleados} onChange={setText('empleados')} onBlur={blur('empleados')}>
            <option value="" disabled>
              Seleccione una opción
            </option>
            {EMPLOYEE_RANGES.map((range) => (
              <option key={range} value={range}>
                {EMPLOYEE_RANGE_LABELS[range]}
              </option>
            ))}
          </select>
        )}
      </Field>

      <fieldset aria-describedby={errors.servicios ? 'servicios-error' : undefined}>
        <legend className="fl-label">¿Qué servicio le interesa?</legend>
        <div className="grid gap-2.5">
          <label className="fl-option">
            <input
              type="checkbox"
              className="fl-check"
              data-field="servicios"
              checked={values.servicios.includes('capacitacion')}
              onChange={toggleService('capacitacion')}
            />
            <span>{SERVICE_LABELS.capacitacion}</span>
          </label>
          <label className="fl-option">
            <input
              type="checkbox"
              className="fl-check"
              checked={values.servicios.includes('plan')}
              onChange={toggleService('plan')}
            />
            <span>{SERVICE_LABELS.plan}</span>
          </label>
          <label className="fl-option">
            <input type="checkbox" className="fl-check" checked={servicesAll} onChange={toggleService('ambos')} />
            <span>Ambos</span>
          </label>
        </div>
        {errors.servicios ? (
          <p id="servicios-error" className="fl-error">
            {errors.servicios}
          </p>
        ) : null}
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div className="fl-hp" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>No llene este campo</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="fl-check"
            data-field="consentimiento"
            required
            aria-invalid={errors.consentimiento ? true : undefined}
            aria-describedby={errors.consentimiento ? 'consentimiento-error' : undefined}
            checked={values.consentimiento}
            onChange={(event) => {
              const next = { ...values, consentimiento: event.target.checked }
              setValues(next)
              if (errors.consentimiento) check('consentimiento', next)
            }}
          />
          <span className="text-[0.9375rem] leading-relaxed">
            Autorizo a Nubitlan, S.A.S. de C.V. a usar mis datos solo para contactarme sobre este servicio.{' '}
            <Link to="/privacidad" className="fl-link" target="_blank">
              Aviso de privacidad
            </Link>
          </span>
        </label>
        {errors.consentimiento ? (
          <p id="consentimiento-error" className="fl-error">
            {errors.consentimiento}
          </p>
        ) : null}
      </div>

      {status.kind === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="fl-card border-l-4 border-l-[var(--fl-error)] p-4 outline-none"
        >
          <p className="font-semibold text-[var(--fl-navy)]">{status.message}</p>
          {whatsapp ? (
            <p className="mt-2">
              También puede{' '}
              <a href={whatsapp} className="fl-link" target="_blank" rel="noopener">
                escribirnos por WhatsApp
              </a>
              .
            </p>
          ) : null}
        </div>
      ) : null}

      <button type="submit" className="fl-btn w-full sm:w-auto sm:justify-self-start" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? (
          <>
            <LoaderCircleIcon className="size-5 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          'Solicitar evaluación gratuita'
        )}
      </button>
    </form>
  )
}

interface ControlProps {
  id: string
  name: string
  className: string
  required: true
  'data-field': string
  'aria-invalid'?: true
  'aria-describedby'?: string
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: TextField
  label: string
  error?: string
  children: (props: ControlProps) => React.ReactNode
}) {
  const id = `campo-${name}`
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="fl-label">
        {label}
      </label>
      {children({
        id,
        name,
        className: 'fl-input',
        required: true,
        'data-field': name,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="fl-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
