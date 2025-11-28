import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage.tsx'
import EvaluationPage from './pages/EvaluationPage.tsx'
import PrivacyPage from './pages/PrivacyPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import CaseStudyPage from './pages/CaseStudyPage.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/evaluacion" element={
          <ErrorBoundary>
            <EvaluationPage />
          </ErrorBoundary>
        } />
        <Route path="/terminos" element={<PrivacyPage />} />
        <Route path="/quienes-somos" element={<AboutPage />} />
        <Route path="/caso-de-estudio" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
