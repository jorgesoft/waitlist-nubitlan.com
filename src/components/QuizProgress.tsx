interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progressPercentage =
    totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0

  // Segmented rather than continuous: discrete blocks read as pixel art and
  // make the number of remaining questions legible at a glance.
  return (
    <div className="mb-8" role="region" aria-label="Progreso del cuestionario">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="font-mono text-muted-foreground text-[0.7rem] font-semibold tracking-[0.1em] uppercase">
          Pregunta {currentStep} de {totalSteps}
        </span>
        <span className="font-mono text-primary text-[0.7rem] font-bold tracking-[0.1em]">
          {progressPercentage}%
        </span>
      </div>

      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label={`Progreso: ${currentStep} de ${totalSteps} preguntas completadas`}
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={
              i < currentStep
                ? 'bg-primary h-2.5 flex-1 transition-colors duration-300'
                : 'bg-muted h-2.5 flex-1 transition-colors duration-300'
            }
          />
        ))}
      </div>
    </div>
  )
}

export default QuizProgress
