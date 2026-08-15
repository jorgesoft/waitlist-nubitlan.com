import { Link } from 'react-router-dom'
import {
  CheckCircle2Icon,
  CheckIcon,
  InfoIcon,
  LightbulbIcon,
  MailIcon,
  RotateCwIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from 'lucide-react'

import type { Outcome } from '@/types/quiz'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface OutcomeCardProps {
  outcome: Outcome
  onRestart: () => void
}

const LEVEL_CONFIG = {
  ready: {
    icon: CheckCircle2Icon,
    banner: 'bg-success/10 border-success/30',
    text: 'text-success',
  },
  'partially-ready': {
    icon: TriangleAlertIcon,
    banner: 'bg-warning/15 border-warning/35',
    text: 'text-warning-foreground dark:text-warning',
  },
  'needs-work': {
    icon: XCircleIcon,
    banner: 'bg-destructive/10 border-destructive/30',
    text: 'text-destructive',
  },
} as const

function OutcomeCard({ outcome, onRestart }: OutcomeCardProps) {
  const config = LEVEL_CONFIG[outcome.level]
  const LevelIcon = config.icon
  const showWaitlistCTA = outcome.level === 'needs-work'

  return (
    <Card
      role="region"
      aria-label="Resultado de la evaluación"
      className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]"
    >
      <CardContent className="p-6 sm:p-8">
        <div
          className={cn('rounded-xl border-2 p-6', config.banner)}
          role="status"
        >
          <h2
            className={cn(
              'flex items-start gap-3 text-2xl font-extrabold tracking-tight',
              config.text
            )}
          >
            <LevelIcon className="mt-0.5 size-7 shrink-0" aria-hidden="true" />
            {outcome.title}
          </h2>
          <p className="text-foreground/80 mt-3 leading-relaxed">
            {outcome.message}
          </p>
        </div>

        {outcome.recommendations.length > 0 ? (
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <LightbulbIcon
                className="text-primary size-5"
                aria-hidden="true"
              />
              Recomendaciones
            </h3>
            <ul
              className="mt-4 space-y-3"
              aria-label="Lista de recomendaciones"
            >
              {outcome.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 border-b border-border pb-3 last:border-b-0"
                >
                  <CheckIcon
                    className="text-primary mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showWaitlistCTA ? (
          <div
            className="bg-sky-50 mt-8 flex items-start gap-3 rounded-xl border border-sky-200 p-4 dark:bg-sky-950/50 dark:border-sky-800"
            role="alert"
          >
            <InfoIcon
              className="text-primary mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed">
              <strong className="font-semibold">¿Necesitas ayuda?</strong> Únete
              a nuestra lista de espera para recibir guía personalizada.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="pixel"
            size="lg"
            onClick={onRestart}
            aria-label="Reiniciar la evaluación y comenzar de nuevo"
          >
            <RotateCwIcon aria-hidden="true" />
            Volver a evaluar
          </Button>

          {showWaitlistCTA ? (
            <Button asChild variant="pixelOutline" size="lg">
              <Link
                to="/#lista-de-espera"
                aria-label="Ir al formulario de lista de espera"
              >
                <MailIcon aria-hidden="true" />
                Únete a la lista de espera
              </Link>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default OutcomeCard
