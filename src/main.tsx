import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import AppRoutes from '@/App'
import { routerBasename } from '@/lib/asset'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    {/* basename keeps routing correct when the app is served from a
        subdirectory, as PR previews are. Empty in production. */}
    <BrowserRouter basename={routerBasename}>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

// Some routes (the flyer landing pages) ship with their HTML already rendered
// at build time — see entry-server.tsx and vite/seo-prerender.ts. Hydrate
// those; every other route still renders from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
