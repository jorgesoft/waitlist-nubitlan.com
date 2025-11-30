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
                Nuestro trabajo con el primer cliente de Nubitlan demuestra cómo la IA puede acelerar y simplificar el camino hacia el cumplimiento.
              </p>

              <h2 className="h4 mb-3">Identificación de Riesgos Reales y Exposición a Internet</h2>
              <p className="mb-3">
                Usando herramientas de análisis automático impulsadas por IA, identificamos:
              </p>
              <ul className="mb-4">
                <li className="mb-2">Sistemas expuestos a Internet sin las protecciones adecuadas</li>
                <li className="mb-2">Servicios desactualizados y configuraciones débiles</li>
                <li className="mb-2">Puntos que permitían acceso no autorizado o fuga de información</li>
              </ul>
              <p className="mb-5">
                No solo detectamos los riesgos: también explicamos cómo cada vulnerabilidad podía impactar la operación del negocio, desde interrupciones hasta riesgos legales derivados de la ley.
              </p>

              <h2 className="h4 mb-3">Análisis de Cumplimiento Frente a la Ley</h2>
              <p className="mb-3">
                La IA evaluó automáticamente cómo las vulnerabilidades y prácticas actuales del cliente afectaban su nivel de cumplimiento. Esto permitió al cliente ver, en lenguaje claro:
              </p>
              <ul className="mb-5">
                <li className="mb-2">Qué artículos de la ley estaban en riesgo de incumplimiento</li>
                <li className="mb-2">Qué principios de seguridad y responsabilidad no se estaban cumpliendo</li>
                <li className="mb-2">Qué acciones eran prioritarias para mitigar el riesgo</li>
              </ul>

              <h2 className="h4 mb-3">Guía de Remediación Clara y Accionable</h2>
              <p className="mb-3">
                Generamos un plan de remediación priorizado, con:
              </p>
              <ul className="mb-4">
                <li className="mb-2">Ajustes técnicos específicos</li>
                <li className="mb-2">Controles mínimos recomendados</li>
                <li className="mb-2">Buenas prácticas para reducir la exposición</li>
                <li className="mb-2">Pasos para fortalecer procesos internos</li>
              </ul>
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
                <div className="card-body p-4 p-md-5 text-center">
                  <i className="bi bi-star-fill text-success mb-3" style={{ fontSize: '3rem' }}></i>
                  <h2 className="h4 mb-3">Resultado</h2>
                  <p className="lead mb-0">
                    El cliente nos dio excelente retroalimentación, destacando que por primera vez tenían una visión clara de sus riesgos, su estado de cumplimiento y un camino concreto para solucionarlo.
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
              <p className="lead mb-4">
                Únete a la lista de espera y recibe una evaluación rápida sobre tu nivel de preparación.
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
