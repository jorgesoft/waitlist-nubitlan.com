import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ASCII sky: the whole hero backdrop rendered as a terminal character grid.
 *
 * Clouds are cumulus built from overlapping puffs — rounded crowns over a
 * flat base, which is what makes them read as clouds rather than blobs —
 * with value noise eroding the edges so they stay soft and keep boiling as
 * they move. Two depth layers give parallax: far clouds are small, faint and
 * slow; near ones are big, solid and fast. A thin band of cirrus streaks
 * sits high in the sky, and at night the same grid shows twinkling stars.
 *
 * Density picks the glyph (wisps `.` `:`, bodies `=` `+` `*`, dense cores
 * flickering binary) and each puff is lit from above: white crowns, blue
 * bases. One canvas at a modest frame rate; it pauses off-screen and in
 * hidden tabs, and `prefers-reduced-motion` gets a single still frame.
 */

const FONT_FAMILY =
  "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace"
const FPS = 24
const MOBILE_QUERY = '(max-width: 639px)'

/** Glyph ramp from thinnest wisp to densest core. */
const RAMP = ['.', ':', '-', '=', '+', '*', '#']
const CORE = ['0', '1']
const CIRRUS = ['.', '-', '~']
const STAR = ['·', '+', '*']

/** Shading and opacity are quantised so cells batch by fill style. */
const SHADES = 6
const ALPHAS = 6

/* --------------------------------- noise -------------------------------- */

function hash(x: number, y: number): number {
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

function fbm(x: number, y: number): number {
  return (
    0.55 * valueNoise(x, y) +
    0.3 * valueNoise(x * 2.1, y * 2.1) +
    0.15 * valueNoise(x * 4.3, y * 4.3)
  )
}

function smoothstep(a: number, b: number, x: number): number {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return k * k * (3 - 2 * k)
}

/** Small seeded PRNG so the opening sky is the same on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* -------------------------------- clouds -------------------------------- */

interface Puff {
  dx: number
  dy: number
  r: number
}

interface Cloud {
  x: number
  /** Flat base line, in px from the top of the sky. */
  base: number
  width: number
  /** Distance from base to the highest crown. */
  height: number
  puffs: Puff[]
  speed: number
  opacity: number
  seed: number
  far: boolean
}

interface Layer {
  far: boolean
  count: number
  width: [number, number]
  /** Pixels per second. */
  speed: [number, number]
  opacity: number
}

function layersFor(mobile: boolean): Layer[] {
  const s = mobile ? 0.55 : 1
  return [
    {
      far: true,
      count: mobile ? 2 : 4,
      width: [150 * s, 240 * s],
      speed: [20 * s + 6, 30 * s + 6],
      opacity: 0.55,
    },
    {
      far: false,
      count: mobile ? 2 : 4,
      width: [300 * s, 460 * s],
      speed: [42 * s + 10, 58 * s + 10],
      opacity: 1,
    },
  ]
}

function makeCloud(
  rand: () => number,
  layer: Layer,
  skyHeight: number,
  x: number
): Cloud {
  const lerp = ([a, b]: [number, number]) => a + (b - a) * rand()
  const width = lerp(layer.width)
  const puffs: Puff[] = []

  // A row of base puffs sits on the flat bottom...
  const baseCount = 3 + Math.floor(rand() * 3)
  for (let i = 0; i < baseCount; i++) {
    const r = width * (0.15 + rand() * 0.08)
    const dx = width * (0.12 + (0.76 * (i + 0.5)) / baseCount) + (rand() - 0.5) * r * 0.4
    puffs.push({ dx, dy: -r * 0.7, r })
  }
  // ...with one to three larger crowns piled on top, near the middle.
  const crownCount = 1 + Math.floor(rand() * 3)
  for (let i = 0; i < crownCount; i++) {
    const r = width * (0.2 + rand() * 0.1)
    const dx = width * (0.3 + rand() * 0.4)
    puffs.push({ dx, dy: -r * (1.1 + rand() * 0.35), r })
  }

  const height = Math.max(...puffs.map((p) => -p.dy + p.r))
  // Keep bases inside the upper ~70% of the sky so the CTAs stay clear.
  const base = height * 0.6 + rand() * Math.max(skyHeight * 0.66 - height * 0.6, 1)

  return {
    x,
    base,
    width,
    height,
    puffs,
    speed: lerp(layer.speed),
    opacity: layer.opacity,
    seed: Math.floor(rand() * 1000),
    far: layer.far,
  }
}

/* -------------------------------- colours ------------------------------- */

interface Theme {
  dark: boolean
  /** Cloud fill styles indexed [shade][alpha]. */
  styles: string[][]
  cirrus: string[]
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

  // Day: white crowns over blue-grey bases against a blue sky.
  // Night: moonlit pale-blue crowns over deep blue bases.
  const lit: [number, number, number] = dark
    ? token('--sky-100', [224, 242, 254])
    : [255, 255, 255]
  const shadow = dark
    ? token('--sky-700', [3, 105, 161])
    : token('--sky-500', [14, 165, 233])
  const peak = dark ? 0.8 : 1

  const styles = Array.from({ length: SHADES }, (_, s) => {
    const k = s / (SHADES - 1)
    const rgb = shadow.map((c, i) => Math.round(c + (lit[i] - c) * k))
    return Array.from({ length: ALPHAS }, (_, a) => {
      const alpha = ((a + 1) / ALPHAS) * peak
      return `rgb(${rgb.join(' ')} / ${alpha.toFixed(3)})`
    })
  })

  const wisp = lit.join(' ')
  const cirrus = [0.25, 0.4, 0.55].map((a) => `rgb(${wisp} / ${a})`)

  const starRgb = token('--sky-50', [240, 249, 255]).join(' ')
  const star = [0.25, 0.55, 0.9].map((a) => `rgb(${starRgb} / ${a})`)

  return { dark, styles, cirrus, star }
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
    const rand = mulberry32(20261019)

    let width = 0
    let height = 0
    let fontSize = 13
    let cellW = 8
    let cellH = 15
    let cols = 0
    let rows = 0
    let theme = readTheme(wrapper)
    let clouds: Cloud[] = []
    let layers = layersFor(mobileQuery.matches)
    let frame = 0
    let visible = true
    let lastDraw = 0
    let lastTick = 0
    let time = 0

    const populate = () => {
      layers = layersFor(mobileQuery.matches)
      clouds = []
      for (const layer of layers) {
        for (let i = 0; i < layer.count; i++) {
          // Spread the opening sky across the whole width.
          const slot = (i + rand() * 0.8) / layer.count
          const x = -layer.width[1] + slot * (width + layer.width[1])
          clouds.push(makeCloud(rand, layer, height, x))
        }
      }
      // Far clouds first so near ones win where they overlap.
      clouds.sort((a, b) => Number(b.far) - Number(a.far))
    }

    const measure = () => {
      fontSize = mobileQuery.matches ? 12 : 13
      ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`
      cellW = Math.ceil(ctx.measureText('0').width + 1)
      cellH = Math.round(fontSize * 1.2)
      cols = Math.ceil(width / cellW) + 1
      rows = Math.ceil(height / cellH) + 1
    }

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const first = width === 0
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measure()
      if (first) populate()
    }

    const advance = (dt: number) => {
      for (let k = 0; k < clouds.length; k++) {
        const cloud = clouds[k]
        cloud.x += cloud.speed * dt
        if (cloud.x > width + 20) {
          // Recycle with a fresh shape, entering from the left.
          const layer = layers.find((l) => l.far === cloud.far)!
          const next = makeCloud(rand, layer, height, 0)
          next.x = -next.width - rand() * 160
          clouds[k] = next
        }
      }
    }

    /** Density (0..1) and lighting (0..1) of one cloud at a point. */
    const sample = (cloud: Cloud, px: number, py: number, t: number) => {
      const lx = px - cloud.x
      let best = 0
      let light = 0
      for (const p of cloud.puffs) {
        const dx = lx - p.dx
        const dy = py - (cloud.base + p.dy)
        const q = 1 - Math.sqrt(dx * dx + dy * dy) / p.r
        if (q > best) {
          best = q
          // Each puff is lit from above: its crown is brightest.
          light = 1 - (dy / p.r + 1) / 2
        }
      }
      if (best <= -0.25) return null

      // Flat base: fade out just below the base line.
      best *= smoothstep(cloud.base + cellH * 0.6, cloud.base - cellH * 1.2, py)

      // Erode the silhouette with noise that drifts upward, so the edges
      // stay wispy and the cloud keeps boiling as it travels.
      const n = fbm(lx / 70 + cloud.seed, py / 70 - t * 0.35)
      const d = Math.min(Math.max(best * 1.7 + (n - 0.55) * 0.9, 0), 1)
      if (d < 0.05) return null

      // Mostly white: only the lower third and puff undersides shade blue.
      const lift = (cloud.base - py) / cloud.height
      const shade = Math.min(
        Math.max(0.3 + light * 0.35 + smoothstep(0, 0.45, lift) * 0.5, 0),
        1
      )
      return { d, shade }
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`
      ctx.textBaseline = 'top'

      const buckets = new Map<string, number[]>()
      const glyphs: string[] = []
      const glyphId = new Map<string, number>()
      const push = (style: string, c: number, r: number, g: string) => {
        let id = glyphId.get(g)
        if (id === undefined) {
          id = glyphs.push(g) - 1
          glyphId.set(g, id)
        }
        let list = buckets.get(style)
        if (!list) buckets.set(style, (list = []))
        list.push(c, r, id)
      }

      // Per-frame bounding boxes, so most cells skip most clouds.
      const boxes = clouds.map((cl) => ({
        cl,
        x0: cl.x - 10,
        x1: cl.x + cl.width + 10,
        y0: cl.base - cl.height - 10,
        y1: cl.base + cellH * 2,
      }))

      const flickerTick = Math.floor(t * 6)
      const cx = width / 2
      const cy = height * 0.45
      const cirrusDepth = height * 0.32

      for (let r = 0; r < rows; r++) {
        const y = r * cellH
        const py = y + cellH / 2
        for (let c = 0; c < cols; c++) {
          const x = c * cellW
          const px = x + cellW / 2

          // Topmost (nearest) cloud with any density wins the cell.
          let hit: { d: number; shade: number } | null = null
          let opacity = 0
          for (let k = boxes.length - 1; k >= 0; k--) {
            const b = boxes[k]
            if (px < b.x0 || px > b.x1 || py < b.y0 || py > b.y1) continue
            const s = sample(b.cl, px, py, t)
            if (s) {
              hit = s
              opacity = b.cl.opacity
              break
            }
          }

          // Soft clearing behind the centred headline.
          const ex = (px - cx) / (width * 0.34)
          const ey = (py - cy) / (height * 0.34)
          const clear = 1 - 0.7 * Math.exp(-(ex * ex + ey * ey))

          if (hit) {
            const { d, shade } = hit
            // Binary only sparkles through the dense cores, flickering.
            const spark = hash(c * 3 + 1, r * 17 + flickerTick)
            const glyph =
              d > 0.8 && spark > 0.72
                ? CORE[(spark * 7) & 1]
                : RAMP[Math.min(RAMP.length - 1, (d * RAMP.length) | 0)]
            const s = Math.round(shade * (SHADES - 1))
            const a = Math.min(
              ALPHAS - 1,
              Math.floor(Math.pow(d, 0.7) * opacity * clear * ALPHAS)
            )
            push(theme.styles[s][a], c, r, glyph)
            continue
          }

          // High cirrus: thin wind-stretched streaks near the top.
          if (py < cirrusDepth) {
            const n = fbm(px / 520 - t * 0.05, py / 46)
            const v = smoothstep(0.6, 0.82, n) * (1 - py / cirrusDepth) * clear
            if (v > 0.12) {
              const level = v > 0.5 ? 2 : v > 0.28 ? 1 : 0
              push(theme.cirrus[level], c, r, CIRRUS[level])
              continue
            }
          }

          // Clear night sky: sparse twinkling stars.
          if (theme.dark) {
            const h = hash(c * 7 + 3, r * 13 + 1)
            if (h > 0.991) {
              const tw = 0.5 + 0.5 * Math.sin(t * 1.3 + h * 60)
              const level = tw > 0.92 ? 2 : tw > 0.55 ? 1 : 0
              push(theme.star[level], c, r, STAR[level])
            }
          }
        }
      }

      for (const [style, list] of buckets) {
        ctx.fillStyle = style
        for (let k = 0; k < list.length; k += 3) {
          ctx.fillText(glyphs[list[k + 2]], list[k] * cellW, list[k + 1] * cellH)
        }
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible || document.hidden) {
        lastTick = 0
        return
      }
      if (now - lastDraw < 1000 / FPS) return
      // Clamp so a long pause does not teleport the clouds.
      const dt = lastTick ? Math.min((now - lastTick) / 1000, 0.1) : 0
      lastTick = now
      lastDraw = now
      time += dt
      advance(dt)
      draw(time)
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) draw(time)
    })
    resizeObserver.observe(wrapper)

    const onMobileChange = () => {
      measure()
      populate()
      if (reducedMotion) draw(time)
    }
    mobileQuery.addEventListener('change', onMobileChange)

    // Theme switches toggle `.dark` on <html>; recompute the palette.
    const themeObserver = new MutationObserver(() => {
      theme = readTheme(wrapper)
      if (reducedMotion) draw(time)
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
      if (reducedMotion) draw(time)
    })

    if (reducedMotion) {
      draw(time)
    } else {
      frame = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      intersection.disconnect()
      mobileQuery.removeEventListener('change', onMobileChange)
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
