import * as React from 'react'
import type { VantaEffect } from 'vanta/src/vanta.clouds.js'

import { cn } from '@/lib/utils'

/**
 * Volumetric cloud sky from Vanta.js (https://github.com/tengbao/vanta),
 * a raymarched WebGL shader rendered at a fraction of the screen resolution.
 *
 * three.js and Vanta are loaded on demand, so they stay out of the main
 * bundle; until they arrive (or if WebGL is unavailable) the CSS sky wash
 * underneath shows instead. Vanta already skips rendering while the canvas
 * is off-screen. With `prefers-reduced-motion` a single frame is drawn and
 * the loop is stopped.
 */

/** Brand palettes: daytime sky blue, and a moonlit navy at night. */
const PALETTES = {
  light: {
    backgroundColor: 0x7dd3fc,
    // The shader lightens this toward the zenith, so start deeper than the
    // blue we want to see.
    skyColor: 0x2f8fd8,
    cloudColor: 0xc7dcf2,
    cloudShadowColor: 0x1b4a7a,
    sunColor: 0xfff4d6,
    sunGlareColor: 0xffffff,
    sunlightColor: 0xfff1d0,
  },
  dark: {
    backgroundColor: 0x0b1530,
    skyColor: 0x020b22,
    cloudColor: 0x4a6a9c,
    cloudShadowColor: 0x02060f,
    sunColor: 0xb8d6ff,
    sunGlareColor: 0x16305a,
    sunlightColor: 0x8fb3e8,
  },
} as const

function currentPalette() {
  return document.documentElement.classList.contains('dark')
    ? PALETTES.dark
    : PALETTES.light
}

export function VantaSky({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    let effect: VantaEffect | null = null
    let cancelled = false
    let themeObserver: MutationObserver | null = null

    Promise.all([import('three'), import('vanta/src/vanta.clouds.js')])
      .then(([THREE, { default: CLOUDS }]) => {
        if (cancelled) return
        effect = CLOUDS({
          el,
          THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          // Render at 1/3 (desktop) and 1/6 (mobile) resolution; the clouds
          // are soft, so the saving is invisible.
          scale: 3,
          scaleMobile: 6,
          speed: 1.6,
          ...currentPalette(),
        })

        if (reducedMotion) {
          // Let one frame render, then stop the loop.
          requestAnimationFrame(() => {
            if (effect?.req) cancelAnimationFrame(effect.req)
          })
        }

        // Theme switches toggle `.dark` on <html>; swap the palette live.
        themeObserver = new MutationObserver(() => {
          effect?.setOptions({ ...currentPalette() })
        })
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        })
      })
      .catch(() => {
        // No WebGL or the chunk failed to load: the CSS sky stays.
      })

    return () => {
      cancelled = true
      themeObserver?.disconnect()
      effect?.destroy()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-clouds=""
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        // Fade the bottom edge into the page instead of a hard line.
        '[mask-image:linear-gradient(to_bottom,black_70%,transparent)]',
        className
      )}
      {...props}
    />
  )
}
