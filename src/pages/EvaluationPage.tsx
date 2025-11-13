import { Link } from 'react-router-dom'

function EvaluationPage() {
  return (
    <>
      {/* Header section */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-shield-check fs-4"></i>
            Nubitlan
          </Link>
          <Link to="/" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-house"></i>
            Inicio
          </Link>
        </div>
      </nav>
      
      {/* Placeholder content */}
      <section className="py-5">
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">Evaluación de Preparación</h1>
          <p className="lead">
            Esta página contendrá el quiz de evaluación interactivo.
          </p>
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-arrow-left"></i> Volver al inicio
          </Link>
        </div>
      </section>
    </>
  )
}

export default EvaluationPage
