import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * "Data clouds": the drifting cloud field, rebuilt as Matrix-style glyphs.
 *
 * Each cloud is a character grid shaped by a hand-drawn mask. Outline cells
 * render brighter than the fill (echoing the pixelarticons outline clouds),
 * glyphs flicker like a terminal, and the nearer clouds drip short columns
 * of falling characters — the cloud literally raining data.
 *
 * Everything is drawn on one canvas, so hundreds of glyphs cost a single
 * layer instead of hundreds of DOM nodes. The loop pauses while the canvas is
 * off-screen or the tab is hidden, and `prefers-reduced-motion` gets one
 * static frame with no rain.
 */

/** `#` marks a cell that belongs to the cloud. Rows are left-aligned. */
const MASKS = [
  [
    '..........######..........',
    '.......############.......',
    '......##############.####.',
    '..#######################.',
    '.#########################',
    '##########################',
    '.########################.',
  ],
  [
    '.......#####.............',
    '....##########..#####....',
    '..######################.',
    '.########################',
    '#########################',
    '.#######################.',
  ],
  [
    '.....######.......',
    '...###########....',
    '.###############..',
    '##################',
    '.################.',
  ],
].map(parseMask)

interface Mask {
  cols: number
  rows: number
  /** Cells inside the cloud, with whether they sit on its outline. */
  cells: { x: number; y: number; edge: boolean }[]
  /** For each column, the lowest filled row: where data rain starts. */
  bottoms: { x: number; y: number }[]
}

function parseMask(rows: string[]): Mask {
  const filled = (x: number, y: number) => rows[y]?.[x] === '#'
  const cols = Math.max(...rows.map((r) => r.length))
  const cells: Mask['cells'] = []
  const bottoms: Mask['bottoms'] = []

  for (let x = 0; x < cols; x++) {
    let bottom = -1
    for (let y = 0; y < rows.length; y++) {
      if (!filled(x, y)) continue
      const edge =
        !filled(x - 1, y) ||
        !filled(x + 1, y) ||
        !filled(x, y - 1) ||
        !filled(x, y + 1)
      cells.push({ x, y, edge })
      bottom = y
    }
    if (bottom >= 0) bottoms.push({ x, y: bottom })
  }

  return { cols, rows: rows.length, cells, bottoms }
}

interface CloudSpec {
  /** Vertical position as a percentage of the container height. */
  top: number
  /** Desktop width in CSS pixels; phones get half. */
  width: number
  opacity: number
  /** Seconds to cross the field. */
  duration: number
  /** Negative offset so clouds are already mid-flight on first paint. */
  delay: number
  mask: number
  /** Most clouds are desktop-only so they never sit behind phone headlines. */
  onMobile?: boolean
  /** Nearer clouds drip data. */
  rain?: boolean
}

/**
 * Same hand-placed composition as the original pixel clouds: larger, more
 * opaque clouds move faster so they read as nearer.
 */
const FIELD: CloudSpec[] = [
  { top: 2, width: 300, opacity: 0.85, duration: 44, delay: -6, mask: 0, onMobile: true, rain: true },
  { top: 24, width: 170, opacity: 0.45, duration: 68, delay: -30, mask: 2 },
  { top: 44, width: 130, opacity: 0.3, duration: 86, delay: -12, mask: 1 },
  { top: 56, width: 230, opacity: 0.6, duration: 52, delay: -40, mask: 1, rain: true },
  { top: 12, width: 110, opacity: 0.28, duration: 94, delay: -70, mask: 2 },
  { top: 80, width: 340, opacity: 0.85, duration: 38, delay: -22, mask: 0, onMobile: true },
  { top: 32, width: 150, opacity: 0.35, duration: 76, delay: -55, mask: 0 },
  { top: 72, width: 120, opacity: 0.3, duration: 64, delay: -18, mask: 2 },
]

const GLYPHS = '0101010110ABCDEF{}<>/#$'
const FONT_FAMILY =
  "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace"
/** Terminal glyphs are taller than wide; rows are this much taller. */
const CELL_ASPECT = 1.4
/** Below this cell width a glyph is illegible, so it is drawn as a dot. */
const MIN_GLYPH_CELL = 7
/** Glyph updates per second; the motion itself runs every frame. */
const FLICKER_FPS = 12
const MOBILE_QUERY = '(max-width: 639px)'

interface Drop {
  cloud: number
  /** Mask column the drop falls from. */
  col: number
  /** Head position, in cells below the cloud's bottom edge. */
  y: number
  speed: number
  length: number
  /** How far it falls before fading out completely. */
  reach: number
  glyphs: string[]
}

interface Palette {
  line: string
  head: string
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

/**
 * Resolves any CSS colour (the theme tokens are oklch) to plain sRGB.
 * Some Chromium builds render oklch canvas fills inside a translucent layer
 * with wildly wrong hues, so the canvas only ever gets rgb() values.
 */
let probe: CanvasRenderingContext2D | null = null
function toRgb(color: string, fallback: string): string {
  if (!color) return fallback
  probe ??= document.createElement('canvas').getContext('2d', {
    willReadFrequently: true,
  })
  if (!probe) return fallback
  probe.clearRect(0, 0, 1, 1)
  probe.fillStyle = fallback
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data
  return `rgb(${r} ${g} ${b})`
}

/**
 * The leading glyph of each raindrop stands out from the cloud: near-white
 * against the night sky, a deeper blue against the light one (where white
 * would vanish into the wash).
 */
function readPalette(el: Element): Palette {
  const style = getComputedStyle(el)
  const dark = document.documentElement.classList.contains('dark')
  return {
    line: toRgb(style.getPropertyValue('--cloud-line').trim(), '#38bdf8'),
    head: toRgb(
      style.getPropertyValue(dark ? '--sky-50' : '--sky-600').trim(),
      dark ? '#f0f9ff' : '#0284c7'
    ),
  }
}

export function DataCloudField({
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
    let palette = readPalette(wrapper)
    let frame = 0
    let visible = true
    let lastFlicker = 0
    let lastFrame = 0
    const start = performance.now()

    // Each cloud keeps its own glyph per cell so the flicker can change a
    // few at a time instead of reshuffling the whole cloud every tick.
    const glyphs = FIELD.map((spec) =>
      MASKS[spec.mask].cells.map(() => randomGlyph())
    )
    let drops: Drop[] = []

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    /** Where a cloud is at time `t`, matching the old CSS `drift` keyframes. */
    const layout = (spec: CloudSpec, t: number) => {
      const mobile = mobileQuery.matches
      const mask = MASKS[spec.mask]
      const cloudWidth = mobile ? spec.width * 0.5 : spec.width
      const cell = cloudWidth / mask.cols
      const row = cell * CELL_ASPECT
      const progress = (((t - spec.delay) / spec.duration) % 1 + 1) % 1
      // The CSS version translated from -30vw to 130vw; keep that path.
      const vw = window.innerWidth
      const x = -0.3 * vw + progress * 1.6 * vw
      const y = (spec.top / 100) * height
      return { mask, cell, row, x, y }
    }

    const spawnDrops = () => {
      if (mobileQuery.matches) return
      FIELD.forEach((spec, i) => {
        if (!spec.rain || Math.random() > 0.6) return
        if (drops.filter((d) => d.cloud === i).length >= 9) return
        const { bottoms } = MASKS[spec.mask]
        const from = bottoms[Math.floor(Math.random() * bottoms.length)]
        const length = 4 + Math.floor(Math.random() * 6)
        drops.push({
          cloud: i,
          col: from.x,
          y: 0,
          speed: 0.12 + Math.random() * 0.16,
          length,
          reach: 10 + Math.floor(Math.random() * 12),
          glyphs: Array.from({ length }, randomGlyph),
        })
      })
    }

    const flicker = () => {
      for (const set of glyphs) {
        for (let k = 0; k < set.length; k++) {
          if (Math.random() < 0.08) set[k] = randomGlyph()
        }
      }
      for (const drop of drops) {
        drop.glyphs.unshift(randomGlyph())
        drop.glyphs.length = drop.length
      }
      spawnDrops()
    }

    const draw = (t: number, animate: boolean) => {
      ctx.clearRect(0, 0, width, height)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const mobile = mobileQuery.matches

      FIELD.forEach((spec, i) => {
        if (mobile && !spec.onMobile) return
        const { mask, cell, row, x, y } = layout(spec, t)
        if (x + mask.cols * cell < 0 || x > width) return

        const asGlyphs = cell >= MIN_GLYPH_CELL
        ctx.font = `600 ${Math.round(row * 0.8)}px ${FONT_FAMILY}`
        ctx.fillStyle = palette.line

        mask.cells.forEach((c, k) => {
          ctx.globalAlpha = spec.opacity * (c.edge ? 1 : 0.38)
          const cx = x + c.x * cell + cell / 2
          const cy = y + c.y * row + row / 2
          if (asGlyphs) {
            ctx.fillText(glyphs[i][k], cx, cy)
          } else {
            const dot = Math.max(1.5, cell * 0.45)
            ctx.fillRect(cx - dot / 2, cy - dot / 2, dot, dot)
          }
        })

        if (!animate) return
        for (const drop of drops) {
          if (drop.cloud !== i) continue
          const baseX = x + drop.col * cell + cell / 2
          const baseY = y + mask.rows * row
          const fade = Math.max(0, 1 - drop.y / drop.reach)
          drop.glyphs.forEach((g, n) => {
            const r = Math.floor(drop.y) - n
            if (r < 0) return
            const head = n === 0
            ctx.globalAlpha =
              spec.opacity * fade * (head ? 1 : 0.7 * (1 - n / drop.length))
            ctx.fillStyle = head ? palette.head : palette.line
            ctx.fillText(g, baseX, baseY + r * row + row / 2)
          })
          ctx.fillStyle = palette.line
        }
      })

      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible || document.hidden) {
        lastFrame = 0
        return
      }

      if (now - lastFlicker > 1000 / FLICKER_FPS) {
        lastFlicker = now
        flicker()
      }
      // Cells per 60 Hz frame, scaled by real elapsed time so the rain falls
      // at the same speed on 120 Hz screens and after a dropped frame.
      const steps = lastFrame ? Math.min((now - lastFrame) / (1000 / 60), 4) : 1
      lastFrame = now
      for (const drop of drops) drop.y += drop.speed * steps
      drops = drops.filter((d) => d.y < d.reach + d.length)

      draw((now - start) / 1000, true)
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) draw(0, false)
    })
    resizeObserver.observe(wrapper)

    // Theme switches toggle `.dark` on <html>; re-read the cloud colour.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette(wrapper)
      if (reducedMotion) draw(0, false)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    intersection.observe(wrapper)

    if (reducedMotion) {
      draw(0, false)
    } else {
      frame = requestAnimationFrame(tick)
    }

    // Web fonts may land after the first frame; redraw so a static frame
    // does not stay in the fallback monospace.
    document.fonts?.ready.then(() => {
      if (reducedMotion) draw(0, false)
    })

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
