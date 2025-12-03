import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Nubitlan</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Servicios
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/servicios/evaluacion-seguridad-ia">Evaluación de Seguridad Externa con IA</Link></li>
                <li><Link className="dropdown-item" to="/servicios/evaluacion-proteccion-datos">Evaluación Inicial Ley de Protección de Datos</Link></li>
                <li><Link className="dropdown-item" to="/servicios/capacitacion-seguridad">Capacitación en Seguridad</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quienes-somos">Quiénes Somos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/caso-de-estudio">Caso de Estudio</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
