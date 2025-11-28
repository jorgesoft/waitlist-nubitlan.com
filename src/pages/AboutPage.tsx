import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: '4rem' }}></i>
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
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: '4rem' }}></i>
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

      {/* Footer section */}
      <footer className="py-4 border-top">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            © {new Date().getFullYear()} Nubitlan. Todos los derechos reservados.
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <Link to="/" className="text-decoration-none d-flex align-items-center gap-1">
              <i className="bi bi-house"></i>
              Inicio
            </Link>
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

export default AboutPage
