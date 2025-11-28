import { useState, useEffect, useRef } from 'react';


import { Link, useSearchParams } from 'react-router-dom';
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
  const [announcement, setAnnouncement] = useState<string>('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user came from waitlist signup
  useEffect(() => {
    if (searchParams.get('joined') === 'true') {
      setShowThankYou(true);
      // Remove the parameter from URL after reading it
      searchParams.delete('joined');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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

  // Announce state changes for screen readers
  useEffect(() => {
    if (loading) {
      setAnnouncement('Cargando evaluación...');
    } else if (error) {
      setAnnouncement('Error al cargar la evaluación. Por favor, intenta de nuevo.');
    } else if (config && !quizStarted) {
      setAnnouncement('Evaluación lista para comenzar.');
    } else if (config && quizEngine.isComplete && quizEngine.outcome) {
      setAnnouncement(`Evaluación completada. Resultado: ${quizEngine.outcome.title}`);
    } else if (config && quizEngine.currentQuestion) {
      setAnnouncement(`Pregunta ${currentStep} de ${totalSteps}: ${quizEngine.currentQuestion.text}`);
    }
  }, [loading, error, config, quizStarted, quizEngine.isComplete, quizEngine.outcome, quizEngine.currentQuestion, currentStep, totalSteps]);

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="skip-link visually-hidden-focusable position-absolute top-0 start-0 bg-primary text-white px-3 py-2 m-2 rounded text-decoration-none"
        style={{ zIndex: 9999 }}
      >
        Saltar al contenido principal
      </a>

      {/* ARIA live region for screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="visually-hidden"
      >
        {announcement}
      </div>

      {/* Header with navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link 
            to="/" 
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            aria-label="Volver a la página principal"
          >
            <i className="bi bi-shield-check fs-4" aria-hidden="true"></i>
            Nubitlan
          </Link>
          <Link 
            to="/" 
            className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
          >
            <i className="bi bi-house" aria-hidden="true"></i>
            Inicio
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main id="main-content" className="py-5 bg-light min-vh-100" ref={mainContentRef}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              {/* Loading state */}
              {loading && (
                <div className="text-center py-5" role="status" aria-live="polite">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="text-muted">Cargando evaluación...</p>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="card shadow-sm border-0" role="alert">
                  <div className="card-body p-4 text-center">
                    <i className="bi bi-exclamation-triangle text-danger fs-1 mb-3 d-block" aria-hidden="true"></i>
                    <h2 className="h4 mb-3">Error al cargar la evaluación</h2>
                    <p className="text-muted mb-4">{error}</p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                        onClick={() => window.location.reload()}
                      >
                        <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
                        Intentar de nuevo
                      </button>
                      <Link
                        to="/"
                        className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                      >
                        <i className="bi bi-house" aria-hidden="true"></i>
                        Volver al inicio
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz content */}
              {config && !loading && !error && (
                <>
                  {/* Thank you message for waitlist signup */}
                  {showThankYou && (
                    <div className="alert alert-success d-flex align-items-start gap-3 mb-4" role="alert">
                      <i className="bi bi-check-circle-fill fs-4 flex-shrink-0" aria-hidden="true"></i>
                      <div>
                        <h2 className="alert-heading h5 mb-2">¡Gracias por unirte a la lista de espera!</h2>
                        <p className="mb-2">
                          Recibirás tu guía gratuita pronto. Mientras tanto, ¿por qué no evalúas qué tan preparada está tu empresa?
                        </p>
                        <button
                          type="button"
                          className="btn-close position-absolute top-0 end-0 m-3"
                          aria-label="Cerrar mensaje"
                          onClick={() => setShowThankYou(false)}
                        ></button>
                      </div>
                    </div>
                  )}

                  {/* Quiz header */}
                  <div className="mb-4">
                    <h1 className="h3 mb-2 d-flex align-items-center gap-2">
                      <i className="bi bi-clipboard-check text-primary" aria-hidden="true"></i>
                      {config.quiz.title}
                    </h1>
                    <p className="text-muted mb-0">{config.quiz.description}</p>
                  </div>

                  {/* Start screen - shown before quiz begins */}
                  {!quizStarted ? (
                    <div className="card shadow-sm border-0">
                      <div className="card-body p-5 text-center">
                        <i className="bi bi-clipboard-check text-primary fs-1 mb-4 d-block" aria-hidden="true"></i>
                        <h2 className="h4 mb-3">¿Listo para comenzar?</h2>
                        <p className="text-muted mb-4">
                          Esta evaluación te ayudará a determinar qué tan preparada está tu empresa para cumplir con la Ley de Protección de Datos.
                        </p>
                        <p className="text-muted mb-4">
                          Responderás {totalSteps} {totalSteps === 1 ? 'pregunta' : 'preguntas'} y recibirás una evaluación personalizada al final.
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 mx-auto"
                          onClick={() => setQuizStarted(true)}
                        >
                          <i className="bi bi-play-circle" aria-hidden="true"></i>
                          Comenzar evaluación
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
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
                          onRestart={() => {
                            quizEngine.restart();
                            setQuizStarted(false);
                          }} 
                        />
                      ) : quizEngine.currentQuestion ? (
                        <QuestionCard 
                          question={quizEngine.currentQuestion} 
                          onAnswer={quizEngine.handleAnswer} 
                        />
                      ) : (
                        <div className="card shadow-sm border-0" role="alert">
                          <div className="card-body p-4 text-center">
                            <i className="bi bi-question-circle text-warning fs-1 mb-3 d-block" aria-hidden="true"></i>
                            <h2 className="h4 mb-3">Estado inesperado</h2>
                            <p className="text-muted mb-4">
                              No se pudo determinar la siguiente pregunta. Por favor, reinicia la evaluación.
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary d-flex align-items-center justify-content-center gap-2 mx-auto"
                              onClick={() => {
                                quizEngine.restart();
                                setQuizStarted(false);
                              }}
                            >
                              <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
                              Reiniciar evaluación
                            </button>
                          </div>
                        </div>
                      )}
                    </>
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
            <Link 
              to="/terminos" 
              className="text-decoration-none text-muted small d-flex align-items-center gap-1"
            >
              <i className="bi bi-shield-lock"></i>
              Política de Privacidad
            </Link>
            <Link 
              to="/terminos#terms" 
              className="text-decoration-none text-muted small d-flex align-items-center gap-1"
            >
              <i className="bi bi-file-text"></i>
              Términos y Condiciones
            </Link>
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
