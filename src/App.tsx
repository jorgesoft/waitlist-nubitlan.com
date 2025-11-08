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
      
      {/* Problem section - to be implemented in task 5 */}
      
      {/* Solution section - to be implemented in task 6 */}
      
      {/* Waitlist form section - to be implemented in task 7 */}
      <div ref={formRef}>
        {/* Form content will go here */}
      </div>
      
      {/* Trust section - to be implemented in task 8 */}
      
      {/* Footer section - to be implemented in task 9 */}
    </>
  )
}

export default App
