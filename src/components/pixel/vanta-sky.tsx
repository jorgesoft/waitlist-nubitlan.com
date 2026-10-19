import * as React from 'react'
import type { VantaEffect } from 'vanta/src/vanta.clouds.js'

import { cn } from '@/lib/utils'
import { asset } from '@/lib/asset'

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

/**
 * CLOUDS2: a lighter, stylised cloud layer. Its shader brightens the sky
 * toward the bottom of the screen by itself, so the night sky colour starts
 * close to black to keep the horizon from glowing.
 */
const PALETTES_2 = {
  light: {
    backgroundColor: 0x7dd3fc,
    skyColor: 0x6cc0f5,
    cloudColor: 0xb9d4ee,
    lightColor: 0xffffff,
  },
  dark: {
    backgroundColor: 0x0b1530,
    skyColor: 0x000814,
    cloudColor: 0x26406a,
    lightColor: 0xa9c8f0,
  },
} as const

/**
 * Temporary A/B switch while we pick an effect: `?cielo=2` shows CLOUDS2,
 * anything else the original CLOUDS.
 */
const useClouds2 =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('cielo') === '2'

function currentPalette() {
  const dark = document.documentElement.classList.contains('dark')
  const set = useClouds2 ? PALETTES_2 : PALETTES
  return dark ? set.dark : set.light
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

    Promise.all([
      import('three'),
      useClouds2
        ? import('vanta/src/vanta.clouds2.js')
        : import('vanta/src/vanta.clouds.js'),
    ])
      .then(([THREE, { default: createEffect }]) => {
        if (cancelled) return
        effect = createEffect({
          el,
          THREE,
          mouseControls: false,
          // The camera is pinned in onUpdate; easing would fight it.
          mouseEase: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          // Render at 1/3 (desktop) and 1/6 (mobile) resolution; the clouds
          // are soft, so the saving is invisible.
          scale: 3,
          scaleMobile: 6,
          speed: 1.1,
          // CLOUDS2 samples a noise texture (ours is generated, see
          // public/textures/cloud-noise.png); CLOUDS would load it unused.
          ...(useClouds2
            ? { texturePath: asset('/textures/cloud-noise.png') }
            : {}),
          ...currentPalette(),
        })

        // Vanta sizes iResolution in CSS pixels, but the canvas draws
        // devicePixelRatio times as many. On any screen denser than 1x
        // (phones, Retina laptops) that stretches the view upward and pushes
        // the clouds to the bottom. Feed the shader the real buffer size each
        // frame, and pin the camera to the centre (where the mouse would rest)
        // so the horizon sits the same on every device.
        const buffer = new THREE.Vector2()
        const fix = effect
        fix.onUpdate = () => {
          if (!fix.renderer || !fix.uniforms) return
          fix.renderer.getDrawingBufferSize(buffer)
          fix.uniforms.iResolution.value.set(buffer.x, buffer.y)
          fix.uniforms.iMouse.value.set(buffer.x / 2, buffer.y / 2)
        }

        if (reducedMotion) {
          // Stop the loop and draw one corrected frame.
          if (fix.req) cancelAnimationFrame(fix.req)
          fix.onUpdate()
          if (fix.renderer && fix.scene && fix.camera) {
            fix.renderer.render(fix.scene, fix.camera)
          }
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
