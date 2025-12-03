import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SecurityTrainingPage() {
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
            <i className="bi bi-mortarboard text-primary" style={{ fontSize: '4rem' }}></i>
          </div>
          <h1 className="display-5 fw-bold mb-3">
            Capacitación en Seguridad
          </h1>
          <p className="lead mb-4">
            Fortalece las capacidades de tu equipo con entrenamiento especializado en seguridad, desde concientización hasta habilidades técnicas avanzadas
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
                    Ofrecemos programas de capacitación personalizados que cubren todos los aspectos de la seguridad 
                    de la información, desde la concientización básica hasta el entrenamiento técnico especializado 
                    para ingenieros y profesionales de TI.
                  </p>
                  
                  <h3 className="h5 mb-3">Áreas de capacitación:</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <div>
                        <strong>Concientización en Seguridad:</strong>
                        <span className="d-block text-muted">Entrenamiento para todos los empleados sobre mejores prácticas, phishing, ingeniería social y protección de datos</span>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <div>
                        <strong>Desarrollo Seguro:</strong>
                        <span className="d-block text-muted">Capacitación técnica en codificación segura, OWASP Top 10, revisión de código y pruebas de seguridad</span>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <div>
                        <strong>Seguridad en la Nube:</strong>
                        <span className="d-block text-muted">Entrenamiento en AWS, Azure, GCP - configuración segura, IAM, monitoreo y respuesta a incidentes</span>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <div>
                        <strong>Cumplimiento Legal:</strong>
                        <span className="d-block text-muted">Capacitación en Ley de Protección de Datos, GDPR, requisitos de cumplimiento y gestión de privacidad</span>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <div>
                        <strong>Respuesta a Incidentes:</strong>
                        <span className="d-block text-muted">Entrenamiento práctico en detección, análisis y respuesta a incidentes de seguridad</span>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-primary me-3 mt-1 fs-5"></i>
                      <div>
                        <strong>Seguridad en DevOps:</strong>
                        <span className="d-block text-muted">Integración de seguridad en pipelines CI/CD, contenedores, Kubernetes y automatización</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training formats */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-4 text-center">Formatos de Capacitación</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-people-fill text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Talleres Presenciales</h3>
                  <p className="mb-0">
                    Sesiones interactivas en tu empresa con ejercicios prácticos y casos reales
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-camera-video text-success mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Capacitación Virtual</h3>
                  <p className="mb-0">
                    Sesiones en línea en vivo con interacción directa y materiales digitales
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-laptop text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="h5 fw-bold mb-3">Laboratorios Prácticos</h3>
                  <p className="mb-0">
                    Entornos de práctica seguros para aplicar conocimientos técnicos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h3 mb-4 text-center">Beneficios para tu Organización</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-shield-check text-primary fs-3"></i>
                    <div>
                      <h3 className="h5 fw-bold mb-2">Reduce Riesgos</h3>
                      <p className="mb-0">
                        Empleados capacitados son tu primera línea de defensa contra amenazas de seguridad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-graph-up text-success fs-3"></i>
                    <div>
                      <h3 className="h5 fw-bold mb-2">Mejora Continua</h3>
                      <p className="mb-0">
                        Desarrolla una cultura de seguridad que evoluciona con las amenazas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-award text-warning fs-3"></i>
                    <div>
                      <h3 className="h5 fw-bold mb-2">Cumplimiento Normativo</h3>
                      <p className="mb-0">
                        Cumple con requisitos de capacitación de leyes y estándares de seguridad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-people text-info fs-3"></i>
                    <div>
                      <h3 className="h5 fw-bold mb-2">Desarrollo de Talento</h3>
                      <p className="mb-0">
                        Invierte en el crecimiento profesional de tu equipo técnico
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body text-center p-4 p-md-5">
                  <h2 className="h3 mb-3">Capacita a tu equipo hoy</h2>
                  <p className="lead mb-4">
                    Contáctanos para diseñar un programa de capacitación personalizado para tu organización.
                  </p>
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <a 
                      href="mailto:contact@nubitlan.com" 
                      className="btn btn-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-envelope-fill"></i>
                      Contáctanos
                    </a>
                    <Link 
                      to="/" 
                      className="btn btn-outline-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-house-fill"></i>
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

export default SecurityTrainingPage
