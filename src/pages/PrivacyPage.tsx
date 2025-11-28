import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadPrivacyContent, type PrivacyContent, type PolicyContent } from '../utils/loadPrivacyContent';

function PrivacyPage() {
  const [content, setContent] = useState<PrivacyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  // Determine which section to show based on hash
  const showTerms = location.hash === '#terms';
  const activeContent: PolicyContent | null = content 
    ? (showTerms ? content.terms : content.privacy)
    : null;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const privacyContent = await loadPrivacyContent();
        setContent(privacyContent);
      } catch (err) {
        console.error('Failed to load privacy content:', err);
        setError('No se pudo cargar el contenido. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <>
      {/* Header */}
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

      {/* Main content */}
      <main className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {/* Tab navigation */}
              {!loading && !error && (
                <div className="mb-4">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <Link
                        to="/terminos"
                        className={`nav-link ${!showTerms ? 'active' : ''}`}
                      >
                        <i className="bi bi-shield-lock me-2"></i>
                        Política de Privacidad
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/terminos#terms"
                        className={`nav-link ${showTerms ? 'active' : ''}`}
                      >
                        <i className="bi bi-file-text me-2"></i>
                        Términos y Condiciones
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Loading state */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="text-muted">Cargando contenido...</p>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4 text-center">
                    <i className="bi bi-exclamation-triangle text-danger fs-1 mb-3 d-block"></i>
                    <h2 className="h4 mb-3">Error al cargar el contenido</h2>
                    <p className="text-muted mb-4">{error}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Intentar de nuevo
                    </button>
                  </div>
                </div>
              )}

              {/* Content */}
              {activeContent && !loading && !error && (
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4 p-md-5">
                    <h1 className="h3 mb-2">{activeContent.title}</h1>
                    <p className="text-muted small mb-4">
                      Última actualización: {activeContent.lastUpdated}
                    </p>

                    {activeContent.sections.map((section, index) => (
                      <div key={index} className="mb-4">
                        <h2 className="h5 mb-3">{section.heading}</h2>
                        <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
  );
}

export default PrivacyPage;
