import { Component } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, RotateCwIcon, TriangleAlertIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error)
    console.error('Error info:', errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // The site layout already supplies the navbar and footer around this,
      // so the fallback only needs to replace the page body.
      return (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <Card
              role="alert"
              className="border-2 border-destructive/40 shadow-[8px_8px_0_0_var(--sky-400)]"
            >
              <CardContent className="p-8 text-center sm:p-12">
                <TriangleAlertIcon
                  className="text-destructive mx-auto size-12"
                  aria-hidden="true"
                />
                <h1 className="mt-5 text-2xl font-bold tracking-tight">
                  Algo salió mal
                </h1>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Lo sentimos, ocurrió un error inesperado al cargar la
                  evaluación. Por favor, intenta de nuevo o regresa a la página
                  principal.
                </p>

                {import.meta.env.DEV && this.state.error ? (
                  <div className="bg-destructive/10 border-destructive/30 mt-6 rounded-lg border p-4 text-left">
                    <strong className="text-destructive text-sm">
                      Error (solo visible en desarrollo):
                    </strong>
                    <pre className="mt-2 font-mono text-xs whitespace-pre-wrap">
                      {this.state.error.message}
                    </pre>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button variant="pixel" onClick={this.handleReset}>
                    <RotateCwIcon aria-hidden="true" />
                    Intentar de nuevo
                  </Button>
                  <Button asChild variant="pixelOutline">
                    <Link to="/">
                      <HomeIcon aria-hidden="true" />
                      Volver al inicio
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
