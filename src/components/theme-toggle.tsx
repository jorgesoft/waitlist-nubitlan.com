import * as React from 'react'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

const STORAGE_KEY = 'nubitlan-theme'

type Theme = 'light' | 'dark'

/** The theme lives on <html class="dark">; subscribe to changes of it. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Prerendered pages are built in the light theme; hydration starts there. */
function getServerTheme(): Theme {
  return 'light'
}

/**
 * Light/dark toggle. The initial class is applied by the inline script in
 * index.html before first paint, so this only has to keep it in sync.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = React.useSyncExternalStore(subscribe, getTheme, getServerTheme)

  const toggle = React.useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* Private mode / storage disabled — the toggle still works for
         this page view, it just will not be remembered. */
    }
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={className}
      aria-label={
        theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
      }
      title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
    >
      {theme === 'dark' ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </Button>
  )
}
