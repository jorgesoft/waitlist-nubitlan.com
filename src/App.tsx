import { useRef } from 'react'

function App() {
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Header section */}
      <header className="border-bottom py-2">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="fw-bold">Nubitlan</div>
          <a href="#privacy" className="text-decoration-none">Privacy Policy</a>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="py-5 py-md-6 bg-light">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            ¿Tu empresa está lista para proteger los datos y cumplir con la nueva ley de El Salvador?
          </h1>
          <p className="lead mb-4">
            Muchas PYMEs no saben por dónde empezar con la Ley de Protección de Datos Personales ni cómo fortalecer su ciberseguridad. Nubitlan es una herramienta impulsada por IA que te guía paso a paso: evalúa tu situación, identifica riesgos y te entrega un reporte con recomendaciones prácticas.
          </p>
          <button 
            onClick={scrollToForm}
            className="btn btn-primary btn-lg mb-2"
          >
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
          <h2 className="h4 mb-2">El problema</h2>
          <p className="mb-2 mt-2">
            Cumplir no solo evita sanciones: también fortalece la seguridad y la confianza de tus clientes.
          </p>
          <ul>
            <li>Falta de controles básicos de seguridad</li>
            <li>Datos personales sin protección adecuada</li>
            <li>Ausencia de políticas internas claras</li>
            <li>Riesgo de sanciones por incumplimiento</li>
          </ul>
        </div>
      </section>
      
      {/* Solution section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h4 mb-2">Nuestra propuesta</h2>
          <p className="mb-2 mt-2">
            Nubitlan te ayuda a cumplir con la ley y mejorar tu seguridad de forma simple y guiada:
          </p>
          <ul>
            <li>Evaluación de cumplimiento adaptada a tu empresa</li>
            <li>Identificación de riesgos de seguridad y datos personales</li>
            <li>Reporte claro con el estado actual de tu organización</li>
            <li>Recomendaciones prácticas y priorizadas para implementar</li>
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
                  className="airtable-embed" 
                  src="https://airtable.com/embed/appG2ASoHmZ4gwLGO/pagks1Wtc4fa7dzwU/form" 
                  width="100%" 
                  height="770" 
                  style={{ background: 'transparent' }}>
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
            <p className="mb-0">
              Creado por profesionales de ciberseguridad con experiencia en estándares internacionales y entornos cloud.
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
            <a href="#privacy" id="privacy" className="text-decoration-none">
              Privacy Policy
            </a>
            <a href="mailto:contacto@nubitlan.com" className="text-decoration-none">
              contacto@nubitlan.com
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
