import { Link } from 'react-router-dom'

function Footer() {
  return (
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
  )
}

export default Footer
