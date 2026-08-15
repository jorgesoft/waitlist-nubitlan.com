import * as React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Restores scroll on navigation. React Router does not do this for us:
 * a plain path change jumps to the top, while a `#hash` scrolls to the
 * matching element once it has been laid out.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (hash) {
      // Wait a frame so the target has been rendered before measuring it.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function SiteLayout() {
  return (
    <TooltipProvider>
      <ScrollManager />
      <a
        href="#contenido"
        className="bg-primary text-primary-foreground sr-only rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Saltar al contenido
      </a>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="contenido" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}
