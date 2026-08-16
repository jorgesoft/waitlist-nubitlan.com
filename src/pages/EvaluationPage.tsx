import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  CheckCircle2Icon,
  ClipboardCheckIcon,
  HelpCircleIcon,
  HomeIcon,
  PlayCircleIcon,
  RotateCwIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react'

import { loadQuizConfig } from '@/utils/loadQuizConfig'
import { useQuizEngine } from '@/hooks/useQuizEngine'
import { saveQuizResult } from '@/services/quizService'
import { logQuizCompleted, logQuizStarted } from '@/utils/analytics'
import QuestionCard from '@/components/QuestionCard'
import OutcomeCard from '@/components/OutcomeCard'
import QuizProgress from '@/components/QuizProgress'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PixelSky } from '@/components/pixel/pixel-sky'
import type { QuizConfig } from '@/types/quiz'

function EvaluationPage() {
  const [config, setConfig] = useState<QuizConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState<string>('')
  const [quizStarted, setQuizStarted] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const resultSavedRef = useRef(false)

  // Visitors arriving straight from the waitlist form get a thank-you note.
  useEffect(() => {
    if (searchParams.get('joined') === 'true') {
      setShowThankYou(true)
      searchParams.delete('joined')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true)
        setError(null)
        const quizConfig = await loadQuizConfig()
        setConfig(quizConfig)
      } catch (err) {
        console.error('Failed to load quiz configuration:', err)
        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo cargar la evaluación. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  // The engine hook must run on every render, so it gets an empty config
  // until the real one has loaded.
  const dummyConfig: QuizConfig = {
    quiz: { title: '', description: '', startQuestionId: '' },
    questions: [],
    outcomes: [],
  }
  const quizEngine = useQuizEngine(config || dummyConfig)

  const totalSteps = config?.questions.length || 0
  const currentStep = config
    ? Object.keys(quizEngine.answers).length + (quizEngine.isComplete ? 0 : 1)
    : 0

  // Persist the result and log analytics exactly once per completion.
  useEffect(() => {
    const saveResult = async () => {
      if (
        quizEngine.isComplete &&
        quizEngine.outcome &&
        !resultSavedRef.current
      ) {
        resultSavedRef.current = true
        try {
          await saveQuizResult(quizEngine.answers, quizEngine.outcome)
          logQuizCompleted(
            quizEngine.outcome,
            Object.keys(quizEngine.answers).length
          )
        } catch (error) {
          console.error('Failed to save quiz result:', error)
          // Saving is best-effort; never block the visitor on it.
        }
      }
    }

    saveResult()
  }, [quizEngine.isComplete, quizEngine.outcome, quizEngine.answers])

  // Keep screen readers informed as the quiz moves between states.
  useEffect(() => {
    if (loading) {
      setAnnouncement('Cargando evaluación...')
    } else if (error) {
      setAnnouncement(
        'Error al cargar la evaluación. Por favor, intenta de nuevo.'
      )
    } else if (config && !quizStarted) {
      setAnnouncement('Evaluación lista para comenzar.')
    } else if (config && quizEngine.isComplete && quizEngine.outcome) {
      setAnnouncement(
        `Evaluación completada. Resultado: ${quizEngine.outcome.title}`
      )
    } else if (config && quizEngine.currentQuestion) {
      setAnnouncement(
        `Pregunta ${currentStep} de ${totalSteps}: ${quizEngine.currentQuestion.text}`
      )
    }
  }, [
    loading,
    error,
    config,
    quizStarted,
    quizEngine.isComplete,
    quizEngine.outcome,
    quizEngine.currentQuestion,
    currentStep,
    totalSteps,
  ])

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <PixelSky className="min-h-[calc(100vh-4rem)] py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {loading ? (
            <div className="space-y-4" role="status" aria-live="polite">
              <span className="sr-only">Cargando evaluación…</span>
              <div className="bg-muted h-10 w-2/3 animate-pulse rounded-lg" />
              <div className="bg-muted h-4 w-1/2 animate-pulse rounded-lg" />
              <div className="bg-muted mt-8 h-64 animate-pulse rounded-xl" />
            </div>
          ) : null}

          {error && !loading ? (
            <Card role="alert" className="border-2 border-destructive/40">
              <CardContent className="p-8 text-center">
                <TriangleAlertIcon
                  className="text-destructive mx-auto size-10"
                  aria-hidden="true"
                />
                <h1 className="mt-4 text-2xl font-bold">
                  Error al cargar la evaluación
                </h1>
                <p className="text-muted-foreground mt-3">{error}</p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    variant="pixel"
                    onClick={() => window.location.reload()}
                  >
                    <RotateCwIcon aria-hidden="true" />
                    Intentar de nuevo
                  </Button>
                  <Button asChild variant="pixelOutline">
                    <Link to="/">
                      <HomeIcon aria-hidden="true" />
                      Volver al inicio
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {config && !loading && !error ? (
            <>
              {showThankYou ? (
                <div
                  className="border-success/40 bg-success/10 relative mb-8 flex items-start gap-3 rounded-xl border-2 p-5"
                  role="alert"
                >
                  <CheckCircle2Icon
                    className="text-success mt-0.5 size-6 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="pr-8">
                    <h2 className="text-lg font-bold">
                      ¡Gracias por unirte a la lista de espera!
                    </h2>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      Recibirás tu guía gratuita pronto. Mientras tanto, ¿por
                      qué no evalúas qué tan preparada está tu empresa?
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Cerrar mensaje"
                    onClick={() => setShowThankYou(false)}
                    className="hover:bg-success/15 absolute top-3 right-3 rounded-md p-1.5 transition-colors"
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>
              ) : null}

              <div className="mb-8">
                <h1 className="flex items-start gap-3 text-3xl font-extrabold tracking-tight">
                  <ClipboardCheckIcon
                    className="text-primary mt-1 size-7 shrink-0"
                    aria-hidden="true"
                  />
                  {config.quiz.title}
                </h1>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {config.quiz.description}
                </p>
              </div>

              {!quizStarted ? (
                <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
                  <CardContent className="p-8 text-center sm:p-12">
                    <ClipboardCheckIcon
                      className="text-primary mx-auto size-12"
                      aria-hidden="true"
                    />
                    <h2 className="mt-5 text-2xl font-bold tracking-tight">
                      ¿Listo para comenzar?
                    </h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      Esta evaluación te ayudará a determinar qué tan preparada
                      está tu empresa para cumplir con la Ley de Protección de
                      Datos.
                    </p>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      Responderás {totalSteps}{' '}
                      {totalSteps === 1 ? 'pregunta' : 'preguntas'} y recibirás
                      una evaluación personalizada al final.
                    </p>
                    <Button
                      variant="pixel"
                      size="lg"
                      className="mt-8"
                      onClick={() => {
                        setQuizStarted(true)
                        logQuizStarted()
                      }}
                    >
                      <PlayCircleIcon aria-hidden="true" />
                      Comenzar evaluación
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {!quizEngine.isComplete ? (
                    <QuizProgress
                      currentStep={currentStep}
                      totalSteps={totalSteps}
                    />
                  ) : null}

                  {quizEngine.isComplete && quizEngine.outcome ? (
                    <OutcomeCard
                      outcome={quizEngine.outcome}
                      onRestart={() => {
                        quizEngine.restart()
                        setQuizStarted(false)
                        resultSavedRef.current = false
                      }}
                    />
                  ) : quizEngine.currentQuestion ? (
                    <QuestionCard
                      question={quizEngine.currentQuestion}
                      onAnswer={quizEngine.handleAnswer}
                    />
                  ) : (
                    <Card role="alert">
                      <CardContent className="p-8 text-center">
                        <HelpCircleIcon
                          className="text-warning mx-auto size-10"
                          aria-hidden="true"
                        />
                        <h2 className="mt-4 text-xl font-bold">
                          Estado inesperado
                        </h2>
                        <p className="text-muted-foreground mt-3">
                          No se pudo determinar la siguiente pregunta. Por
                          favor, reinicia la evaluación.
                        </p>
                        <Button
                          variant="pixel"
                          className="mt-6"
                          onClick={() => {
                            quizEngine.restart()
                            setQuizStarted(false)
                          }}
                        >
                          <RotateCwIcon aria-hidden="true" />
                          Reiniciar evaluación
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </>
          ) : null}
        </div>
      </PixelSky>
    </>
  )
}

export default EvaluationPage
