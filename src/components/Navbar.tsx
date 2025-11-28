import { Link } from 'react-router-dom'

function Navbar() {
  return (
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
  )
}

export default Navbar
