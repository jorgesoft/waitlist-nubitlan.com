import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import SiteLayout from '@/layouts/SiteLayout'
import ErrorBoundary from '@/components/ErrorBoundary'
import { TOOLS } from '@/tools/registry'
import { AUDIENCE_SLUGS } from '@/landing/slugs'

// Every page is its own chunk, so a visitor only downloads the code for the
// route they open. This matters most for the flyer landing pages (/escuelas,
// /isp, /empresas), which are opened from a QR code on mobile data, and it
// keeps Firebase (and the Google Analytics it starts) confined to /evaluacion.
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const EvaluationPage = lazy(() => import('@/pages/EvaluationPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage'))
const AISecurityEvaluationPage = lazy(() => import('@/pages/AISecurityEvaluationPage'))
const AIPenTestingPage = lazy(() => import('@/pages/AIPenTestingPage'))
const DataProtectionEvaluationPage = lazy(() => import('@/pages/DataProtectionEvaluationPage'))
const SecurityTrainingPage = lazy(() => import('@/pages/SecurityTrainingPage'))
const CompleteGuidePage = lazy(() => import('@/pages/CompleteGuidePage'))
const BlogIndexPage = lazy(() => import('@/pages/BlogIndexPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const ToolsIndexPage = lazy(() => import('@/pages/ToolsIndexPage'))
const ToolPage = lazy(() => import('@/pages/ToolPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const AudienceLandingPage = lazy(() => import('@/landing/AudienceLandingPage'))

/**
 * The route tree, shared by the browser entry (main.tsx) and the build-time
 * renderer (entry-server.tsx) that prerenders the flyer landing pages.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/evaluacion"
          element={
            <ErrorBoundary>
              <EvaluationPage />
            </ErrorBoundary>
          }
        />

        <Route path="/privacidad" element={<PrivacyPage />} />
        <Route path="/terminos" element={<PrivacyPage />} />
        <Route path="/quienes-somos" element={<AboutPage />} />
        <Route path="/caso-de-estudio" element={<CaseStudyPage />} />

        <Route
          path="/servicios/evaluacion-seguridad-ia"
          element={<AISecurityEvaluationPage />}
        />
        <Route
          path="/servicios/pruebas-de-penetracion-ia"
          element={<AIPenTestingPage />}
        />
        <Route
          path="/servicios/evaluacion-proteccion-datos"
          element={<DataProtectionEvaluationPage />}
        />
        <Route
          path="/servicios/capacitacion-seguridad"
          element={<SecurityTrainingPage />}
        />

        <Route path="/guia_completa" element={<CompleteGuidePage />} />

        {/* Flyer landing pages, printed as QR codes: /escuelas, /isp and
            /empresas. One template, per-audience copy in src/landing. */}
        {AUDIENCE_SLUGS.map((slug) => (
          <Route
            key={slug}
            path={`/${slug}`}
            element={<AudienceLandingPage slug={slug} />}
          />
        ))}

        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        <Route path="/herramientas" element={<ToolsIndexPage />} />
        <Route path="/herramientas/:slug" element={<ToolPage />} />

        {/* Short aliases (e.g. /ps) render the tool directly, so a shared
            link never bounces through a redirect. Generated from the tool
            registry, so adding a tool needs no change here. */}
        {TOOLS.map((tool) => (
          <Route
            key={tool.shortPath}
            path={tool.shortPath}
            element={<ToolPage tool={tool} />}
          />
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
