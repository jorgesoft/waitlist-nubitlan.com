import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'

import AppRoutes from '@/App'
import { routerBasename } from '@/lib/asset'

/**
 * Build-time renderer, called by vite/seo-prerender.ts for routes that ship
 * with their body HTML (see `prerenderBody` in src/lib/seo.ts). The browser
 * hydrates the result (main.tsx), so the page paints before any JavaScript
 * has run. `prerender` waits for the route's lazy chunk to resolve.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url} basename={routerBasename}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  )
  return new Response(prelude).text()
}
