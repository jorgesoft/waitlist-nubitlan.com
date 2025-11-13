import { useRef } from 'react'

function LandingPage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Header section */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
            <i className="bi bi-shield-check fs-4"></i>
            Nubitlan
          </a>
          <a href="#privacy" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-file-text"></i>
            Privacy Policy
          </a>
        </div>
      </nav>
      
      {/* Hero section */}
      <section className="py-5 py-md-6 bg-light">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            ¿Tu empresa está lista para cumplir con la nueva Ley de Protección de Datos Personales de El Salvador?
          </h1>
          <p className="lead mb-4">
            Muchas PYMEs no saben por dónde empezar con esta nueva ley ni cómo fortalecer su ciberseguridad. Nubitlan es una herramienta impulsada por IA que te guía paso a paso: evalúa tu situación, identifica riesgos y te entrega un reporte con recomendaciones prácticas.
          </p>
          <button 
            onClick={scrollToForm}
            className="btn btn-primary btn-lg mb-2 d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-envelope-plus"></i>
            Únete a la lista de espera
          </button>
          <p className="text-muted small">
            Al unirte, recibirás una guía gratuita para dar tus primeros pasos en cumplimiento y seguridad.
          </p>
        </div>
      </section>
      
      {/* Problem section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h4 mb-2 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle text-warning"></i>
            El problema
          </h2>
          <p className="mb-2 mt-2">
            Cumplir no solo evita sanciones: también fortalece la seguridad y la confianza de tus clientes.
          </p>
          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Falta de controles básicos de seguridad</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Datos personales sin protección adecuada</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Ausencia de políticas internas claras</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-x-circle text-danger mt-1"></i>
              <span>Riesgo de sanciones por incumplimiento</span>
            </li>
          </ul>
        </div>
      </section>
      
      {/* Solution section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h4 mb-2 d-flex align-items-center gap-2">
            <i className="bi bi-lightbulb text-success"></i>
            Nuestra propuesta
          </h2>
          <p className="mb-2 mt-2">
            Nubitlan te ayuda a cumplir con la ley y mejorar tu seguridad de forma simple y guiada:
          </p>
          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Evaluación de cumplimiento adaptada a tu empresa</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Identificación de riesgos de seguridad y datos personales</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Reporte claro con el estado actual de tu organización</span>
            </li>
            <li className="mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-check-circle text-success mt-1"></i>
              <span>Recomendaciones prácticas y priorizadas para implementar</span>
            </li>
          </ul>
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
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust section */}
      <section className="py-4">
        <div className="container">
          <div className="bg-white border rounded-3 p-3 p-md-4">
            <p className="mb-0 d-flex align-items-start gap-2">
              <i className="bi bi-award text-primary mt-1 fs-5"></i>
              <span>Creado por profesionales de ciberseguridad con experiencia en estándares internacionales y entornos cloud.</span>
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer section */}
      <footer className="py-4 border-top">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            © {new Date().getFullYear()} Nubitlan. Todos los derechos reservados.
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <a href="#privacy" id="privacy" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-file-text"></i>
              Privacy Policy
            </a>
            <a href="mailto:contacto@nubitlan.com" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-envelope"></i>
              contacto@nubitlan.com
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
