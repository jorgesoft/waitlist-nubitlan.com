import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero section */}
      <section className="py-5 py-md-6 bg-light">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            Caso de Estudio
          </h1>
        </div>
      </section>

      {/* Case study content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <p className="lead mb-4">
                Nuestro trabajo con el primer cliente demuestra cómo la IA acelera el camino hacia el cumplimiento.
              </p>

              <h2 className="h4 mb-3">Identificación de Riesgos</h2>
              <p className="mb-4">
                Usando IA, identificamos sistemas expuestos, servicios desactualizados y puntos de acceso no autorizado. Explicamos el impacto de cada vulnerabilidad en la operación y cumplimiento legal.
              </p>

              <h2 className="h4 mb-3">Análisis de Cumplimiento</h2>
              <p className="mb-4">
                La IA evaluó automáticamente qué artículos de la ley estaban en riesgo y qué acciones eran prioritarias para mitigar el riesgo.
              </p>

              <h2 className="h4 mb-3">Plan de Remediación</h2>
              <p className="mb-4">
                Generamos un plan priorizado con ajustes técnicos, controles recomendados y pasos para fortalecer procesos internos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card border-success shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-star-fill text-success mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h2 className="h4 mb-3">Resultado</h2>
                  <p className="mb-0">
                    El cliente destacó que por primera vez tenía una visión clara de sus riesgos y un camino concreto para solucionarlo.
                  </p>
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
            <div className="col-12 col-lg-8 text-center">
              <h2 className="h3 mb-3">¿Listo para preparar tu empresa?</h2>
              <p className="mb-4">
                Únete a la lista de espera y recibe una evaluación rápida.
              </p>
              <Link to="/" className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2">
                <i className="bi bi-envelope-plus"></i>
                Únete a la lista de espera
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CaseStudyPage
