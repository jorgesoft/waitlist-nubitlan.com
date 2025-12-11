import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AISecurityEvaluationPage() {
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
            <i className="bi bi-robot text-primary" style={{ fontSize: '4rem' }}></i>
          </div>
          <h1 className="display-5 fw-bold mb-3">
            Evaluación de Seguridad Externa con IA
          </h1>
          <p className="lead mb-4">
            Análisis automatizado de vulnerabilidades y riesgos de seguridad para tu empresa
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
                    Utilizamos inteligencia artificial avanzada para realizar una evaluación exhaustiva de la seguridad 
                    externa de tu infraestructura digital, identificando vulnerabilidades y proporcionando recomendaciones 
                    accionables para fortalecer tu postura de seguridad.
                  </p>
                  
                  <h3 className="h5 mb-3">Características principales:</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Escaneo automatizado de vulnerabilidades en tu infraestructura web</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Análisis de configuraciones de seguridad y mejores prácticas</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Detección de exposición de datos sensibles</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Reporte detallado con priorización de riesgos</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <span>Recomendaciones específicas para remediar vulnerabilidades</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-4 text-center">Beneficios para tu empresa</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-lightning-charge text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Rápido y Eficiente</h3>
                  <p className="mb-0">
                    Obtén un análisis completo en pocos días, con resultados detallados y accionables para tu negocio.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-shield-check text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Protección Proactiva</h3>
                  <p className="mb-0">
                    Identifica y corrige vulnerabilidades antes de que sean explotadas por atacantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-graph-up text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Mejora Continua</h3>
                  <p className="mb-0">
                    Recibe recomendaciones claras para mejorar tu postura de seguridad de forma progresiva.
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
                  <h2 className="h3 mb-3">¿Listo para fortalecer tu seguridad?</h2>
                  <p className="lead mb-4">
                    Contáctanos para obtener más información sobre nuestro servicio de evaluación de seguridad con IA.
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
                      to="/" 
                      className="btn btn-outline-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-arrow-left"></i>
                      Volver al inicio
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

export default AISecurityEvaluationPage
