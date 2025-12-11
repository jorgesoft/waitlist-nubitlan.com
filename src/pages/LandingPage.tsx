import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WebinarAnnouncement from '../components/WebinarAnnouncement'

function LandingPage() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const nextSectionRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://form.jotform.com' && event.data === 'form-submitted') {
        navigate('/evaluacion?joined=true');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <>
      <Navbar />

      {/* Hero section */}
      <section className="position-relative bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="container text-center">

          <h1 className="display-5 fw-bold mb-3">
            Evalúa tu Seguridad y Cumplimiento con Inteligencia Artificial
          </h1>

          <p className="lead mb-3">
            Diagnósticos rápidos, recomendaciones prácticas y una ruta clara hacia el cumplimiento de la Ley de Protección de Datos.
          </p>

          <div className="d-flex flex-column justify-content-center align-items-center mb-2">
            <button 
              onClick={scrollToForm}
              className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-list-check"></i>
              Únete a la lista de espera
            </button>
          </div>

          <p></p>
          <p className="small text-muted mb-2">
            Únete a la lista y recibe nuestra guía de la Ley de Datos + mini evaluación de preparación.
          </p>
          <div className="text-center">
            <a 
              href="https://www.linkedin.com/company/nubitlan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary fs-4"
              aria-label="Síguenos en LinkedIn"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="position-absolute start-50 translate-middle-x text-center" 
          style={{ bottom: '80px' }}
          onClick={scrollToNextSection}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && scrollToNextSection()}
          aria-label="Desplazarse a la siguiente sección"
        >
          <div className="scroll-indicator">
            <i className="bi bi-chevron-down fs-3 text-primary"></i>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-5" ref={nextSectionRef}>
        <div className="container">
          <h2 className="h5 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle text-warning"></i>
            Riesgos si no te preparas
          </h2>

          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Multas y sanciones</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Brechas de datos personales</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Pérdida de confianza de clientes</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Interrupciones operativas tras incidentes</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Solution section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h5 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-lightbulb text-success"></i>
            Cómo te ayuda Nubitlan
          </h2>

          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Identificación de riesgos reales</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Recomendaciones prácticas y priorizadas</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Reporte claro para gerencia o auditoría</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Evaluación enfocada en protección de datos personales</span>
            </li>
          </ul>

          <div className="mt-4">
            <h3 className="h6 mb-3">Servicios:</h3>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link 
                to="/servicios/evaluacion-seguridad-ia" 
                className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-robot"></i>
                Evaluación de Seguridad con IA
              </Link>

              <Link 
                to="/servicios/evaluacion-proteccion-datos" 
                className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-shield-lock"></i>
                Evaluación de Protección de Datos
              </Link>

              <Link 
                to="/servicios/capacitacion-seguridad" 
                className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-mortarboard"></i>
                Capacitación en Seguridad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="h5 mb-4 d-flex align-items-center gap-2">
            <i className="bi bi-shield-check text-primary"></i>
            Por qué confiar en Nubitlan
          </h2>

          <p className="d-flex align-items-start gap-2 mb-3">
            <i className="bi bi-award text-primary mt-1 fs-5"></i>
            <span>
              Equipo con experiencia en ciberseguridad y privacidad.{' '}
              <Link to="/quienes-somos" className="fw-semibold text-decoration-none">
                Ver más <i className="bi bi-arrow-right"></i>
              </Link>
            </span>
          </p>

          <p className="d-flex align-items-start gap-2">
            <i className="bi bi-star text-success mt-1 fs-5"></i>
            <span>
              Ya ayudamos a una empresa salvadoreña a prepararse para la Ley.{' '}
              <Link to="/caso-de-estudio" className="fw-semibold text-decoration-none">
                Ver caso de estudio <i className="bi bi-arrow-right"></i>
              </Link>
            </span>
          </p>
        </div>
      </section>

      {/* Waitlist form section */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div ref={formRef}>
                <iframe
                  id="JotFormIFrame-253112397254051"
                  title="Únete a la lista de espera"
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://form.jotform.com/253112397254051"
                  style={{ minWidth: '100%', maxWidth: '100%', height: '1000px', border: 'none' }}
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebinarAnnouncement />
      <Footer />
    </>
  )
}

export default LandingPage
