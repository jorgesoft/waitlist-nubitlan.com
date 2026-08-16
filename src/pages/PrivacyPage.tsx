import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FileTextIcon,
  RotateCwIcon,
  ShieldIcon,
  TriangleAlertIcon,
} from 'lucide-react'

import {
  loadPrivacyContent,
  type PrivacyContent,
  type PolicyContent,
} from '@/utils/loadPrivacyContent'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/PageHeader'

function PrivacyPage() {
  const [content, setContent] = useState<PrivacyContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  // The hash selects which of the two documents is shown.
  const showTerms = location.hash === '#terms'
  const activeContent: PolicyContent | null = content
    ? showTerms
      ? content.terms
      : content.privacy
    : null

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        setError(null)
        const privacyContent = await loadPrivacyContent()
        setContent(privacyContent)
      } catch (err) {
        console.error('Failed to load privacy content:', err)
        setError(
          'No se pudo cargar el contenido. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={showTerms ? 'Términos y Condiciones' : 'Política de Privacidad'}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Document switcher */}
          {!loading && !error ? (
            <div
              className="mb-8 inline-flex border-2 border-foreground p-1"
              role="tablist"
            >
              <PolicyTab to="/terminos" active={!showTerms}>
                <ShieldIcon className="size-4" />
                Privacidad
              </PolicyTab>
              <PolicyTab to="/terminos#terms" active={showTerms}>
                <FileTextIcon className="size-4" />
                Términos
              </PolicyTab>
            </div>
          ) : null}

          {loading ? (
            <div className="space-y-4" aria-live="polite" aria-busy="true">
              <span className="sr-only">Cargando contenido…</span>
              <div className="bg-muted h-8 w-2/3 animate-pulse rounded-lg" />
              <div className="bg-muted h-4 w-1/3 animate-pulse rounded-lg" />
              <div className="mt-8 space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted h-4 animate-pulse rounded-lg"
                    style={{ width: `${70 + ((i * 7) % 30)}%` }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {error && !loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <TriangleAlertIcon className="text-destructive mx-auto size-10" />
                <h2 className="mt-4 text-xl font-bold">
                  Error al cargar el contenido
                </h2>
                <p className="text-muted-foreground mt-2">{error}</p>
                <Button
                  variant="pixel"
                  className="mt-6"
                  onClick={() => window.location.reload()}
                >
                  <RotateCwIcon />
                  Intentar de nuevo
                </Button>
              </CardContent>
            </Card>
          ) : null}

          {activeContent && !loading && !error ? (
            <article>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {activeContent.title}
              </h2>
              <p className="text-muted-foreground font-mono mt-2 text-sm">
                Última actualización: {activeContent.lastUpdated}
              </p>

              <div className="prose-nubitlan mt-10">
                {activeContent.sections.map((section, index) => (
                  <section key={index}>
                    <h2>{section.heading}</h2>
                    <p className="whitespace-pre-line">{section.content}</p>
                  </section>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </>
  )
}

function PolicyTab({
  to,
  active,
  children,
}: {
  to: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      role="tab"
      aria-selected={active}
      className={cn(
        'font-mono inline-flex items-center gap-2 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </Link>
  )
}

export default PrivacyPage
