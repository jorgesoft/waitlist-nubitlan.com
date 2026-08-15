import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import SiteLayout from '@/layouts/SiteLayout'
import ErrorBoundary from '@/components/ErrorBoundary'
import LandingPage from '@/pages/LandingPage'
import EvaluationPage from '@/pages/EvaluationPage'
import PrivacyPage from '@/pages/PrivacyPage'
import AboutPage from '@/pages/AboutPage'
import CaseStudyPage from '@/pages/CaseStudyPage'
import AISecurityEvaluationPage from '@/pages/AISecurityEvaluationPage'
import DataProtectionEvaluationPage from '@/pages/DataProtectionEvaluationPage'
import SecurityTrainingPage from '@/pages/SecurityTrainingPage'
import BlogIndexPage from '@/pages/BlogIndexPage'
import BlogPostPage from '@/pages/BlogPostPage'
import ToolsIndexPage from '@/pages/ToolsIndexPage'
import ToolPage from '@/pages/ToolPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { TOOLS } from '@/tools/registry'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
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

          <Route path="/terminos" element={<PrivacyPage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/caso-de-estudio" element={<CaseStudyPage />} />

          <Route
            path="/servicios/evaluacion-seguridad-ia"
            element={<AISecurityEvaluationPage />}
          />
          <Route
            path="/servicios/evaluacion-proteccion-datos"
            element={<DataProtectionEvaluationPage />}
          />
          <Route
            path="/servicios/capacitacion-seguridad"
            element={<SecurityTrainingPage />}
          />

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
    </BrowserRouter>
  </StrictMode>
)
