import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadQuizConfig } from '../utils/loadQuizConfig';
import { useQuizEngine } from '../hooks/useQuizEngine';
import QuestionCard from '../components/QuestionCard';
import OutcomeCard from '../components/OutcomeCard';
import QuizProgress from '../components/QuizProgress';
import type { QuizConfig } from '../types/quiz';

function EvaluationPage() {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load quiz configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        const quizConfig = await loadQuizConfig();
        setConfig(quizConfig);
      } catch (err) {
        console.error('Failed to load quiz configuration:', err);
        setError(
          err instanceof Error 
            ? err.message 
            : 'No se pudo cargar la evaluación. Por favor, intenta de nuevo más tarde.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Initialize quiz engine - we need a dummy config for the initial render to satisfy Rules of Hooks
  const dummyConfig: QuizConfig = {
    quiz: { title: '', description: '', startQuestionId: '' },
    questions: [],
    outcomes: []
  };
  const quizEngine = useQuizEngine(config || dummyConfig);

  // Calculate progress
  const totalSteps = config?.questions.length || 0;
  const currentStep = config 
    ? Object.keys(quizEngine.answers).length + (quizEngine.isComplete ? 0 : 1)
    : 0;

  return (
    <>
      {/* Header with navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link 
            to="/" 
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            aria-label="Volver a la página principal"
          >
            <i className="bi bi-shield-check fs-4"></i>
            Nubitlan
          </Link>
          <Link 
            to="/" 
            className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
          >
            <i className="bi bi-house"></i>
            Inicio
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              {/* Loading state */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="text-muted">Cargando evaluación...</p>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4 text-center">
                    <i className="bi bi-exclamation-triangle text-danger fs-1 mb-3 d-block"></i>
                    <h2 className="h4 mb-3">Error al cargar la evaluación</h2>
                    <p className="text-muted mb-4">{error}</p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                        onClick={() => window.location.reload()}
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                        Intentar de nuevo
                      </button>
                      <Link
                        to="/"
                        className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                      >
                        <i className="bi bi-house"></i>
                        Volver al inicio
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz content */}
              {config && !loading && !error && (
                <>
                  {/* Quiz header */}
                  <div className="mb-4">
                    <h1 className="h3 mb-2 d-flex align-items-center gap-2">
                      <i className="bi bi-clipboard-check text-primary"></i>
                      {config.quiz.title}
                    </h1>
                    <p className="text-muted mb-0">{config.quiz.description}</p>
                  </div>

                  {/* Progress indicator - only show during quiz, not on outcome */}
                  {!quizEngine.isComplete && (
                    <QuizProgress 
                      currentStep={currentStep} 
                      totalSteps={totalSteps} 
                    />
                  )}

                  {/* Question or Outcome */}
                  {quizEngine.isComplete && quizEngine.outcome ? (
                    <OutcomeCard 
                      outcome={quizEngine.outcome} 
                      onRestart={quizEngine.restart} 
                    />
                  ) : quizEngine.currentQuestion ? (
                    <QuestionCard 
                      question={quizEngine.currentQuestion} 
                      onAnswer={quizEngine.handleAnswer} 
                    />
                  ) : (
                    <div className="card shadow-sm border-0">
                      <div className="card-body p-4 text-center">
                        <i className="bi bi-question-circle text-warning fs-1 mb-3 d-block"></i>
                        <h2 className="h4 mb-3">Estado inesperado</h2>
                        <p className="text-muted mb-4">
                          No se pudo determinar la siguiente pregunta. Por favor, reinicia la evaluación.
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary d-flex align-items-center justify-content-center gap-2 mx-auto"
                          onClick={quizEngine.restart}
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                          Reiniciar evaluación
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-top bg-white">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0 text-muted small">
            © {new Date().getFullYear()} Nubitlan. Todos los derechos reservados.
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <a 
              href="/#privacy" 
              className="text-decoration-none text-muted small d-flex align-items-center gap-1"
            >
              <i className="bi bi-file-text"></i>
              Privacy Policy
            </a>
            <a 
              href="mailto:contacto@nubitlan.com" 
              className="text-decoration-none text-muted small d-flex align-items-center gap-1"
            >
              <i className="bi bi-envelope"></i>
              contacto@nubitlan.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default EvaluationPage;
