import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AboutPage() {
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
            Quiénes Somos y Contacto
          </h1>
          <p className="lead mb-4">
            Conoce al equipo detrás de Nubitlan
          </p>
        </div>
      </section>

      {/* Founders section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h3 mb-4 text-center">Nuestros Fundadores</h2>
          <div className="row g-4 justify-content-center">
            {/* Jorge Silva */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img 
                      src="/pictures/jorge.jpg" 
                      alt="Jorge Silva - Co-fundador de Nubitlan"
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="h5 fw-bold mb-2">Jorge Silva</h3>
                  <p className="text-muted mb-3">Co-fundador</p>
                  <p className="mb-3">
                    Senior Cybersecurity Analyst con más de 7 años de experiencia, radicado en NYC. 
                    Experiencia previa en ingeniería cloud, con experiencia en consultoría en Microsoft. 
                    Jorge tiene una licenciatura en cloud computing y una maestría en ciberseguridad de New York University.
                  </p>
                  <a 
                    href="https://www.linkedin.com/in/jorgeecsilva/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-linkedin"></i>
                    Ver perfil en LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Chris Sánchez */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img 
                      src="/pictures/chris.jpg" 
                      alt="Chris Sánchez - Co-fundador de Nubitlan"
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="h5 fw-bold mb-2">Chris Sánchez</h3>
                  <p className="text-muted mb-3">Co-fundador</p>
                  <p className="mb-3">
                    Abogado y notario especializado en derecho informático, con un enfoque particular en protección de datos personales, 
                    ciberseguridad y cumplimiento normativo. Tiene una licenciatura en derecho de la UCA y una maestría en derecho 
                    digital de la Universidad Internacional de La Rioja.
                  </p>
                  <a 
                    href="https://www.linkedin.com/in/chrisitlaw/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-linkedin"></i>
                    Ver perfil en LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body text-center p-4 p-md-5">
                  <i className="bi bi-envelope text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h2 className="h3 mb-3">Contáctanos</h2>
                  <p className="lead mb-4">
                    ¿Tienes preguntas o necesitas más información? Estamos aquí para ayudarte.
                  </p>
                  <a 
                    href="mailto:contact@nubitlan.com" 
                    className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-envelope-fill"></i>
                    contact@nubitlan.com
                  </a>
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

export default AboutPage
