interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  // Calculate progress percentage
  const progressPercentage = totalSteps > 0 
    ? Math.round((currentStep / totalSteps) * 100) 
    : 0;

  return (
    <div className="mb-4" role="region" aria-label="Progreso del cuestionario">
      {/* Step counter */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-muted small">
          Pregunta {currentStep} de {totalSteps}
        </span>
        <span className="text-muted small fw-semibold">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div 
        className="progress" 
        style={{ height: '8px' }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label={`Progreso: ${currentStep} de ${totalSteps} preguntas completadas`}
      >
        <div
          className="progress-bar bg-primary"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuizProgress;
