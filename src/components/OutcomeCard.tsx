import type { Outcome } from '../types/quiz';

interface OutcomeCardProps {
  outcome: Outcome;
  onRestart: () => void;
}

function OutcomeCard({ outcome, onRestart }: OutcomeCardProps) {
  // Map outcome levels to Bootstrap color variants
  const getLevelConfig = (level: Outcome['level']) => {
    switch (level) {
      case 'ready':
        return {
          variant: 'success',
          icon: 'bi-check-circle-fill',
          bgClass: 'bg-success-subtle',
          textClass: 'text-success-emphasis'
        };
      case 'partially-ready':
        return {
          variant: 'warning',
          icon: 'bi-exclamation-triangle-fill',
          bgClass: 'bg-warning-subtle',
          textClass: 'text-warning-emphasis'
        };
      case 'needs-work':
        return {
          variant: 'danger',
          icon: 'bi-x-circle-fill',
          bgClass: 'bg-danger-subtle',
          textClass: 'text-danger-emphasis'
        };
    }
  };

  const levelConfig = getLevelConfig(outcome.level);
  const showWaitlistCTA = outcome.level === 'needs-work';

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        {/* Outcome header with level indicator */}
        <div className={`${levelConfig.bgClass} rounded p-3 mb-4`}>
          <h2 className={`h3 mb-2 d-flex align-items-center gap-2 ${levelConfig.textClass}`}>
            <i className={`bi ${levelConfig.icon}`}></i>
            {outcome.title}
          </h2>
          <p className={`mb-0 ${levelConfig.textClass}`}>
            {outcome.message}
          </p>
        </div>

        {/* Recommendations section */}
        {outcome.recommendations.length > 0 && (
          <div className="mb-4">
            <h3 className="h5 mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-lightbulb text-primary"></i>
              Recomendaciones
            </h3>
            <ul className="list-group list-group-flush">
              {outcome.recommendations.map((recommendation, index) => (
                <li 
                  key={index} 
                  className="list-group-item px-0 d-flex align-items-start gap-2"
                >
                  <i className="bi bi-check2 text-primary mt-1"></i>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Call-to-action for needs-work outcome */}
        {showWaitlistCTA && (
          <div className="alert alert-info d-flex align-items-center gap-2 mb-4" role="alert">
            <i className="bi bi-info-circle-fill"></i>
            <div>
              <strong>¿Necesitas ayuda?</strong> Únete a nuestra lista de espera para recibir guía personalizada.
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3">
          <button
            type="button"
            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
            onClick={onRestart}
            aria-label="Reiniciar la evaluación"
          >
            <i className="bi bi-arrow-clockwise"></i>
            <span>Volver a evaluar</span>
          </button>

          {showWaitlistCTA && (
            <a
              href="/#waitlist"
              className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center gap-2"
              aria-label="Ir al formulario de lista de espera"
            >
              <i className="bi bi-envelope"></i>
              <span>Únete a la lista de espera</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutcomeCard;
