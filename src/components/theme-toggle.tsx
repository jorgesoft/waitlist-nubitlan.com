import * as React from 'react'

import { Button } from '@/components/ui/button'
import { PixelIcon } from '@/components/pixel/icon'

const STORAGE_KEY = 'nubitlan-theme'

function getInitialTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Light/dark toggle. The initial class is applied by the inline script in
 * index.html before first paint, so this only has to keep it in sync.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(getInitialTheme)

  const toggle = React.useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* Private mode / storage disabled — the toggle still works for
           this page view, it just will not be remembered. */
      }
      return next
    })
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
      <PixelIcon name={theme === 'dark' ? 'cloud-sun' : 'moon'} className="size-5" />
    </Button>
  )
}
