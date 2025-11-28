import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WebinarAnnouncement from '../components/WebinarAnnouncement'

function LandingPage() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Listen for JotForm submission and redirect
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if message is from JotForm
      if (event.origin === 'https://form.jotform.com' && event.data === 'form-submitted') {
        // Redirect to evaluation page with thank you parameter
        navigate('/evaluacion?joined=true');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <>
      {/* Header section */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-shield-check fs-4"></i>
            Nubitlan
          </Link>
          <ul className="navbar-nav ms-auto flex-row gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white d-flex align-items-center gap-1">
                <i className="bi bi-house"></i>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quienes-somos" className="nav-link text-white d-flex align-items-center gap-1">
                <i className="bi bi-people"></i>
                Quiénes Somos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/terminos" className="nav-link text-white d-flex align-items-center gap-1">
                <i className="bi bi-shield-lock"></i>
                Privacidad
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Hero section */}
      <section className="py-5 py-md-6 bg-light">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            ¿Tu empresa cumple con las obligaciones de la Ley de Protección de Datos Personales?
          </h1>
          <p className="lead mb-6">
            En Nubitlan desarrollamos herramientas de IA que ayudan a tu empresa a prepararse para la nueva Ley de Protección de Datos y fortalecer su seguridad.
          </p>
          <p className="lead mb-6">
            Únete a la lista de espera y recibe una evaluación rápida + guía práctica sobre la nueva Ley de Protección de Datos Personales.
          </p>
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center mb-3">
            <button 
              onClick={scrollToForm}
              className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-envelope-plus"></i>
              Únete a la lista de espera
            </button>
          </div>
        </div>
      </section>
      
      {/* Problem section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h4 mb-2 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle text-warning"></i>
            Riesgos a los que te expones
          </h2>
          <p className="mb-2 mt-2">
            Cumplir no solo evita sanciones: también fortalece la seguridad y la confianza de tus clientes.
          </p>
          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Vulneración de bases de datos que incorporan información personal</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Brechas de seguridad</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Imposición de multas</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Daño reputacional</span>
            </li>
          </ul>
        </div>
      </section>
      
      {/* Solution section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h4 mb-2 d-flex align-items-center gap-2">
            <i className="bi bi-lightbulb text-success"></i>
            Nuestra solución
          </h2>
          <p className="mb-2 mt-2">
            Nubitlan te ayuda a cumplir con la ley y mejorar tu seguridad de forma simple y guiada:
          </p>
          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Identificación de riesgos</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Sugerencia de controles</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Visualización para reportes</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Evaluaciones de cumplimiento normativo centrado en protección de datos personales</span>
            </li>
          </ul>
        </div>
      </section>
      
      {/* Trust section */}
      <section className="py-4">
        <div className="container">
          <div className="bg-white border rounded-3 p-3 p-md-4">
            <p className="mb-0 d-flex align-items-start gap-2">
              <i className="bi bi-award text-primary mt-1 fs-5"></i>
              <span>
                Creado por profesionales de ciberseguridad con experiencia en estándares internacionales y entornos cloud.{' '}
                <Link to="/quienes-somos" className="text-decoration-none fw-semibold">
                  Conoce más sobre nosotros <i className="bi bi-arrow-right"></i>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>
      
      {/* Waitlist form section */}
      <section className="py-5">
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
                  scrolling='no'
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Webinar announcement */}
      <WebinarAnnouncement />
      
      {/* Footer section */}
      <footer className="py-4 border-top">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            © {new Date().getFullYear()} Nubitlan. Todos los derechos reservados.
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <Link to="/quienes-somos" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-people"></i>
              Quiénes Somos
            </Link>
            <Link to="/terminos" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-shield-lock"></i>
              Política de Privacidad
            </Link>
            <Link to="/terminos#terms" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-file-text"></i>
              Términos y Condiciones
            </Link>
            <a href="mailto:contact@nubitlan.com" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-envelope"></i>
              contact@nubitlan.com
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
