import { Component } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
  }

  handleReset = () => {
    // Reset error state to try rendering again
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <>
          {/* Header with navigation */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">
              <Link 
                to="/" 
                className="navbar-brand fw-bold d-flex align-items-center gap-2"
                aria-label="Volver a la página principal"
              >
                <i className="bi bi-shield-check fs-4" aria-hidden="true"></i>
                Nubitlan
              </Link>
              <Link 
                to="/" 
                className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
              >
                <i className="bi bi-house" aria-hidden="true"></i>
                Inicio
              </Link>
            </div>
          </nav>

          {/* Main error content */}
          <main className="py-5 bg-light min-vh-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                  <div className="card shadow-sm border-0" role="alert">
                    <div className="card-body p-5 text-center">
                      <i 
                        className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-4 d-block" 
                        aria-hidden="true"
                      ></i>
                      <h1 className="h3 mb-3">Algo salió mal</h1>
                      <p className="text-muted mb-4">
                        Lo sentimos, ocurrió un error inesperado al cargar la evaluación. 
                        Por favor, intenta de nuevo o regresa a la página principal.
                      </p>
                      
                      {/* Show error message in development */}
                      {import.meta.env.DEV && this.state.error && (
                        <div className="alert alert-danger text-start mb-4">
                          <strong>Error (solo visible en desarrollo):</strong>
                          <pre className="mb-0 mt-2 small text-wrap">
                            {this.state.error.message}
                          </pre>
                        </div>
                      )}

                      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                        <button
                          type="button"
                          className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                          onClick={this.handleReset}
                        >
                          <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
                          Intentar de nuevo
                        </button>
                        <Link
                          to="/"
                          className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                        >
                          <i className="bi bi-house" aria-hidden="true"></i>
                          Volver al inicio
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="py-4 border-top bg-white">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-2 mb-md-0 text-muted small">
                © {new Date().getFullYear()} Nubitlan. Todos los derechos reservados.
              </div>
              <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                <a 
                  href="/#privacy" 
                  className="text-decoration-none text-muted small d-flex align-items-center gap-1"
                >
                  <i className="bi bi-file-text"></i>
                  Privacy Policy
                </a>
                <a 
                  href="mailto:contacto@nubitlan.com" 
                  className="text-decoration-none text-muted small d-flex align-items-center gap-1"
                >
                  <i className="bi bi-envelope"></i>
                  contacto@nubitlan.com
                </a>
              </div>
            </div>
          </footer>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
