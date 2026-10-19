import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ASCII sky: the whole hero backdrop rendered as a terminal character grid.
 *
 * Every cell samples a procedural cloud field (fractal value noise, each
 * octave drifting at its own speed so clouds billow and reshape as they
 * cross). Cloud density picks the glyph — wisps are `.` and `:`, bodies are
 * `+` and `*`, and dense cores condense into flickering binary — and a simple
 * top-lit shading gives them volume: bright crowns, bluer undersides. At
 * night the same grid shows twinkling stars that clouds pass in front of.
 *
 * One canvas, redrawn at a modest frame rate (clouds move slowly, so 20 fps
 * is smooth). The loop pauses off-screen and in hidden tabs, and
 * `prefers-reduced-motion` gets a single still frame.
 */

const FONT_FAMILY =
  "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace"
const FPS = 20
const MOBILE_QUERY = '(max-width: 639px)'

/** Glyph ramp from thinnest wisp to densest core. */
const RAMP = ['.', '·', ':', '-', '=', '+', '*']
const CORE = ['0', '1']
const STAR = ['·', '+', '*']

/** Shading and opacity are quantised so cells batch by fill style. */
const SHADES = 5
const ALPHAS = 6

/* -------------------------------- noise --------------------------------- */

function hash(x: number, y: number): number {
  // Integer hash -> [0, 1). Cheap and stable across frames.
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

/**
 * Octaves drift at different speeds (wind shear), which is what makes the
 * clouds evolve instead of sliding past as rigid stamps.
 */
const OCTAVES = [
  { scale: 1, weight: 0.5, wind: 1 },
  { scale: 2.03, weight: 0.27, wind: 1.35 },
  { scale: 4.1, weight: 0.15, wind: 1.9 },
  { scale: 8.3, weight: 0.08, wind: 2.6 },
]

function cloudField(x: number, y: number, t: number): number {
  let sum = 0
  for (const o of OCTAVES) {
    sum +=
      o.weight *
      valueNoise(x * o.scale - t * o.wind * 0.6, y * o.scale + t * 0.04 * o.scale)
  }
  return sum
}

function smoothstep(a: number, b: number, x: number): number {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return k * k * (3 - 2 * k)
}

/* ------------------------------- colours -------------------------------- */

interface Theme {
  dark: boolean
  /** Fill styles indexed [shade][alpha]. */
  styles: string[][]
  star: string[]
}

let probe: CanvasRenderingContext2D | null = null
/**
 * Resolves a CSS colour (the theme tokens are oklch) to sRGB bytes.
 * Some Chromium builds render oklch canvas fills inside a translucent layer
 * with wildly wrong hues, so the canvas only ever gets rgb() values.
 */
function toRgb(color: string, fallback: [number, number, number]) {
  probe ??= document.createElement('canvas').getContext('2d', {
    willReadFrequently: true,
  })
  if (!probe || !color) return fallback
  probe.clearRect(0, 0, 1, 1)
  probe.fillStyle = `rgb(${fallback.join(' ')})`
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data
  return [r, g, b] as [number, number, number]
}

function readTheme(el: Element): Theme {
  const style = getComputedStyle(el)
  const token = (name: string, fallback: [number, number, number]) =>
    toRgb(style.getPropertyValue(name).trim(), fallback)
  const dark = document.documentElement.classList.contains('dark')

  // Day: white crowns over sky-blue undersides. Night: moonlit pale-blue
  // crowns over deep blue bellies.
  const lit = dark ? token('--sky-100', [224, 242, 254]) : [255, 255, 255]
  const shadow = dark
    ? token('--sky-700', [3, 105, 161])
    : token('--sky-400', [56, 189, 248])
  const peak = dark ? 0.75 : 1

  const styles = Array.from({ length: SHADES }, (_, s) => {
    const k = s / (SHADES - 1)
    const rgb = shadow.map((c, i) => Math.round(c + (lit[i] - c) * k))
    return Array.from({ length: ALPHAS }, (_, a) => {
      const alpha = ((a + 1) / ALPHAS) * peak
      return `rgb(${rgb.join(' ')} / ${alpha.toFixed(3)})`
    })
  })

  const starRgb = token('--sky-50', [240, 249, 255]).join(' ')
  const star = [0.25, 0.55, 0.9].map((a) => `rgb(${starRgb} / ${a})`)

  return { dark, styles, star }
}

/* ------------------------------- component ------------------------------ */

export function AsciiSky({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrapper || !canvas || !ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const mobileQuery = window.matchMedia(MOBILE_QUERY)

    let width = 0
    let height = 0
    let fontSize = 13
    let cellW = 8
    let cellH = 15
    let cols = 0
    let rows = 0
    let density = new Float32Array(0)
    let theme = readTheme(wrapper)
    let frame = 0
    let visible = true
    let lastDraw = 0
    // Start mid-drift so the first paint already has clouds in view.
    const start = performance.now() - 40_000

    const measure = () => {
      fontSize = mobileQuery.matches ? 12 : 13
      ctx.font = `500 ${fontSize}px ${FONT_FAMILY}`
      cellW = Math.ceil(ctx.measureText('0').width + 1)
      cellH = Math.round(fontSize * 1.2)
      cols = Math.ceil(width / cellW) + 1
      rows = Math.ceil(height / cellH) + 2
      density = new Float32Array(cols * rows)
    }

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measure()
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `500 ${fontSize}px ${FONT_FAMILY}`
      ctx.textBaseline = 'top'

      // Noise space is in screen pixels so cloud size stays the same on any
      // grid; ~460px per base octave gives a few big cloud masses per hero.
      const unit = mobileQuery.matches ? 320 : 520
      // Fraction of the noise range that stays clear sky; higher = fewer,
      // more separated clouds.
      const cover = 0.535

      // Pass 1: density per cell (plus one spare row above for shading).
      for (let r = 0; r < rows; r++) {
        const py = (r - 1) * cellH
        // Stretch the field horizontally: real clouds are wider than tall.
        const ny = (py / unit) * 1.35
        // Thin the clouds toward the bottom, where the CTAs live.
        const profile = 1 - 0.7 * smoothstep(0.3, 0.95, py / height)
        for (let c = 0; c < cols; c++) {
          const n = cloudField((c * cellW) / unit, ny, t)
          density[r * cols + c] = smoothstep(cover, cover + 0.24, n) * profile
        }
      }

      // Pass 2: bucket cells by style, then draw each bucket in one go.
      const buckets = new Map<string, number[]>()
      const push = (style: string, index: number, glyph: number) => {
        let list = buckets.get(style)
        if (!list) buckets.set(style, (list = []))
        list.push(index, glyph)
      }
      const glyphs: string[] = []
      const glyphId = new Map<string, number>()
      const id = (g: string) => {
        let k = glyphId.get(g)
        if (k === undefined) {
          k = glyphs.push(g) - 1
          glyphId.set(g, k)
        }
        return k
      }

      const flickerTick = Math.floor(t * 6)
      const twinkleTick = t * 1.3
      const cx = width / 2
      const cy = height * 0.45

      for (let r = 1; r < rows; r++) {
        const y = (r - 1) * cellH
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const d = density[i]
          const x = c * cellW

          if (d < 0.04) {
            // Clear sky: a sparse, twinkling star field at night.
            if (theme.dark) {
              const h = hash(c * 7 + 3, r * 13 + 1)
              if (h > 0.991) {
                const tw = 0.5 + 0.5 * Math.sin(twinkleTick + h * 60)
                const level = tw > 0.92 ? 2 : tw > 0.55 ? 1 : 0
                push(theme.star[level], i, id(STAR[level]))
              }
            }
            continue
          }

          // Soft clearing behind the centred headline.
          const dx = (x - cx) / (width * 0.36)
          const dy = (y - cy) / (height * 0.36)
          const clear = 1 - 0.72 * Math.exp(-(dx * dx + dy * dy))
          const strength = d * clear

          // Top-lit: a cell with thinner cloud above it is a sunlit crown.
          const above = density[i - cols]
          const light = Math.min(Math.max(0.35 + (d - above) * 3 + d * 0.4, 0), 1)

          let glyph: string
          // Only the densest cores condense into (flickering) binary.
          if (d > 0.82) {
            glyph = CORE[(hash(c, r * 31 + flickerTick) * 2) | 0]
          } else {
            glyph = RAMP[Math.min(RAMP.length - 1, (d / 0.82) * RAMP.length) | 0]
          }

          const shade = Math.round(light * (SHADES - 1))
          // Ease in so wisps stay faint and only bodies read strongly.
          const alpha = Math.min(
            ALPHAS - 1,
            Math.floor(Math.pow(strength, 0.8) * ALPHAS)
          )
          push(theme.styles[shade][alpha], i, id(glyph))
        }
      }

      for (const [style, list] of buckets) {
        ctx.fillStyle = style
        for (let k = 0; k < list.length; k += 2) {
          const i = list[k]
          const r = (i / cols) | 0
          const c = i - r * cols
          ctx.fillText(glyphs[list[k + 1]], c * cellW, (r - 1) * cellH)
        }
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      if (now - lastDraw < 1000 / FPS) return
      lastDraw = now
      draw((now - start) / 1000 / 9)
    }

    const still = () => draw(4)

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) still()
    })
    resizeObserver.observe(wrapper)

    // Theme switches toggle `.dark` on <html>; recompute the palette.
    const themeObserver = new MutationObserver(() => {
      theme = readTheme(wrapper)
      if (reducedMotion) still()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    intersection.observe(wrapper)

    // Glyph widths depend on the web font; re-measure once it lands.
    document.fonts?.ready.then(() => {
      measure()
      if (reducedMotion) still()
    })

    if (reducedMotion) {
      still()
    } else {
      frame = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      intersection.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      data-clouds=""
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}
