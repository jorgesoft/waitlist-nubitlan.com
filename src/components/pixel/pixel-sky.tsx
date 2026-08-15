import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelSprite } from './pixel-art'
import { CLOUD_BIG, CLOUD_MID, CLOUD_SMALL, CLOUD_WISP, cloudPalette } from './sprites'

const SHAPES = {
  big: CLOUD_BIG,
  mid: CLOUD_MID,
  small: CLOUD_SMALL,
  wisp: CLOUD_WISP,
} as const

export type CloudShape = keyof typeof SHAPES

export interface PixelCloudProps extends React.ComponentProps<'div'> {
  shape?: CloudShape
  /** Rendered width in pixels. */
  width?: number
  opacity?: number
}

export function PixelCloud({
  shape = 'mid',
  width = 160,
  opacity = 1,
  className,
  style,
  ...props
}: PixelCloudProps) {
  const matrix = SHAPES[shape]
  const rows = matrix.length
  const cols = matrix.reduce((max, r) => Math.max(max, r.length), 0)

  return (
    <div
      className={cn('pointer-events-none select-none', className)}
      style={{ width, opacity, ...style }}
      {...props}
    >
      <PixelSprite
        matrix={matrix}
        palette={cloudPalette}
        width={width}
        height={(width / cols) * rows}
      />
    </div>
  )
}

interface DriftingCloud {
  shape: CloudShape
  /** Vertical position as a percentage of the container height. */
  top: number
  width: number
  opacity: number
  duration: number
  /** Negative delay so clouds are already mid-flight on first paint. */
  delay: number
}

/**
 * Hand-placed rather than random: a fixed layout keeps the composition
 * balanced, avoids clouds stacking on the headline, and stays identical
 * across renders. Larger, more opaque clouds drift faster to read as nearer.
 */
const FIELD: DriftingCloud[] = [
  { shape: 'big', top: 7, width: 250, opacity: 0.95, duration: 44, delay: -6 },
  { shape: 'mid', top: 25, width: 165, opacity: 0.55, duration: 68, delay: -30 },
  { shape: 'small', top: 45, width: 130, opacity: 0.4, duration: 86, delay: -12 },
  { shape: 'mid', top: 61, width: 190, opacity: 0.75, duration: 52, delay: -40 },
  { shape: 'wisp', top: 15, width: 115, opacity: 0.3, duration: 94, delay: -70 },
  { shape: 'big', top: 73, width: 300, opacity: 1, duration: 38, delay: -22 },
  { shape: 'small', top: 35, width: 140, opacity: 0.45, duration: 76, delay: -55 },
  { shape: 'wisp', top: 87, width: 125, opacity: 0.35, duration: 64, delay: -18 },
]

/**
 * Parallax layer of pixel clouds drifting left to right.
 *
 * Animation is pure CSS transform (`drift`), so it runs on the compositor and
 * costs no main-thread work. `prefers-reduced-motion` freezes it globally via
 * the rule in index.css.
 */
export function CloudField({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      data-clouds=""
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      {...props}
    >
      {FIELD.map((cloud, i) => (
        <div
          key={i}
          className="absolute left-0 will-change-transform"
          style={{
            top: `${cloud.top}%`,
            animation: `drift ${cloud.duration}s linear ${cloud.delay}s infinite`,
          }}
        >
          <PixelCloud
            shape={cloud.shape}
            width={cloud.width}
            opacity={cloud.opacity}
          />
        </div>
      ))}
    </div>
  )
}

/** Twinkling pixel stars — only visible in dark mode, where the sky is night. */
const STARS = [
  { left: 12, top: 18, delay: 0 },
  { left: 24, top: 62, delay: 1.1 },
  { left: 38, top: 12, delay: 2.2 },
  { left: 52, top: 44, delay: 0.6 },
  { left: 63, top: 22, delay: 1.7 },
  { left: 71, top: 70, delay: 0.3 },
  { left: 84, top: 32, delay: 2.6 },
  { left: 92, top: 56, delay: 1.4 },
  { left: 6, top: 40, delay: 2.0 },
  { left: 45, top: 78, delay: 0.9 },
]

export function PixelStars({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 hidden overflow-hidden dark:block',
        className
      )}
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute size-[3px] bg-sky-100"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `twinkle 3.2s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Full hero backdrop: sky gradient, pixel graph-paper grid, stars (dark mode)
 * and the drifting cloud field. Children render above all of it.
 */
export function PixelSky({
  children,
  className,
  showClouds = true,
  ...props
}: React.ComponentProps<'div'> & { showClouds?: boolean }) {
  return (
    <div className={cn('relative isolate overflow-hidden', className)} {...props}>
      <div className="sky-wash absolute inset-0 -z-30" aria-hidden="true" />
      <div className="pixel-grid absolute inset-0 -z-20" aria-hidden="true" />
      <PixelStars />
      {showClouds ? <CloudField className="-z-10" /> : null}
      {children}
    </div>
  )
}

/**
 * Hard-edged cloud silhouette that caps a section, so bands meet along a
 * pixel skyline instead of a straight rule. `flip` points it upward.
 */
export function PixelHorizon({
  className,
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none w-full overflow-hidden leading-[0]',
        flip && 'rotate-180',
        className
      )}
    >
      <svg
        viewBox="0 0 64 8"
        preserveAspectRatio="none"
        className="pixelated h-8 w-full"
        fill="currentColor"
      >
        {/* A repeating skyline of 1-unit blocks at varying heights. */}
        {[
          3, 3, 2, 2, 1, 1, 2, 3, 4, 4, 3, 2, 2, 3, 3, 4, 5, 5, 4, 3, 2, 2, 1,
          1, 2, 2, 3, 4, 4, 5, 5, 4, 3, 3, 2, 1, 1, 2, 3, 3, 4, 4, 5, 4, 3, 2,
          2, 1, 2, 3, 4, 4, 3, 3, 2, 2, 3, 4, 4, 3, 2, 2, 3, 3,
        ].map((h, i) => (
          <rect key={i} x={i} y={8 - h} width={1} height={h} />
        ))}
      </svg>
    </div>
  )
}
