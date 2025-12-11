import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function DataProtectionEvaluationPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero section */}
      <section className="py-5 py-md-6 bg-light">
        <div className="container text-center">
          <div className="mb-3">
            <i className="bi bi-shield-lock text-primary" style={{ fontSize: '4rem' }}></i>
          </div>
          <h1 className="display-5 fw-bold mb-3">
            Evaluación Inicial Ley de Protección de Datos
          </h1>
          <p className="lead mb-4">
            Verifica el cumplimiento de tu empresa con la Ley de Protección de Datos Personales de El Salvador
          </p>
        </div>
      </section>

      {/* Service description */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card shadow-sm mb-4">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h3 mb-4">¿Qué incluye este servicio?</h2>
                  <p className="mb-4">
                    Realizamos una evaluación completa del estado de cumplimiento de tu empresa con la Ley de Protección 
                    de Datos Personales de El Salvador, identificando brechas y proporcionando un plan de acción claro 
                    para lograr el cumplimiento total.
                  </p>
                  
                  <h3 className="h5 mb-3">Características principales:</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Evaluación del estado actual de cumplimiento normativo</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Análisis de políticas y procedimientos de protección de datos</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Identificación de brechas y riesgos de incumplimiento</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Reporte detallado con recomendaciones específicas</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Plan de acción priorizado para lograr el cumplimiento</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Plantillas de documentos legales necesarios</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-4 text-center">¿Por qué es importante?</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-exclamation-triangle text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Evita Sanciones</h3>
                  <p className="mb-0">
                    Las multas por incumplimiento pueden alcanzar grandes sumas de dinero. Protege tu empresa de sanciones costosas.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-people text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Genera Confianza</h3>
                  <p className="mb-0">
                    Demuestra a tus clientes que tomas en serio la protección de sus datos personales.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-award text-success mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Ventaja Competitiva</h3>
                  <p className="mb-0">
                    Diferénciate de la competencia con prácticas sólidas de protección de datos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body text-center p-4 p-md-5">
                  <h2 className="h3 mb-3">Comienza tu evaluación hoy</h2>
                  <p className="lead mb-4">
                    Contáctanos para programar tu evaluación inicial de cumplimiento con la Ley de Protección de Datos.
                  </p>
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <a 
                      href="mailto:contact@nubitlan.com" 
                      className="btn btn-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-envelope-fill"></i>
                      Contáctanos
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/nubitlan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2"
                      aria-label="Síguenos en LinkedIn"
                    >
                      <i className="bi bi-linkedin"></i>
                      LinkedIn
                    </a>
                    <Link 
                      to="/evaluacion" 
                      className="btn btn-outline-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-clipboard-check"></i>
                      Prueba nuestra evaluación gratuita
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default DataProtectionEvaluationPage
