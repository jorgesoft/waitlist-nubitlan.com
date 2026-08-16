import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelIcon } from './icon'

export interface PixelCloudProps extends React.ComponentProps<'div'> {
  /** Rendered width in pixels. The cloud is square-ish, so height follows. */
  width?: number
  opacity?: number
}

/** A single pixelarticons cloud, coloured by the theme's cloud token. */
export function PixelCloud({
  width = 160,
  opacity = 1,
  className,
  style,
  ...props
}: PixelCloudProps) {
  return (
    <div
      className={cn('pointer-events-none select-none', className)}
      style={{ opacity, ...style }}
      {...props}
    >
      <PixelIcon
        name="cloud"
        className="text-[var(--cloud-line)]"
        style={{ width, height: width * 0.75 }}
      />
    </div>
  )
}

interface DriftingCloud {
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
  { top: 6, width: 190, opacity: 0.95, duration: 44, delay: -6 },
  { top: 24, width: 120, opacity: 0.5, duration: 68, delay: -30 },
  { top: 44, width: 92, opacity: 0.35, duration: 86, delay: -12 },
  { top: 60, width: 150, opacity: 0.7, duration: 52, delay: -40 },
  { top: 14, width: 80, opacity: 0.3, duration: 94, delay: -70 },
  { top: 72, width: 230, opacity: 1, duration: 38, delay: -22 },
  { top: 34, width: 105, opacity: 0.4, duration: 76, delay: -55 },
  { top: 86, width: 88, opacity: 0.32, duration: 64, delay: -18 },
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
          <PixelCloud width={cloud.width} opacity={cloud.opacity} />
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
    <div
      className={cn('relative isolate overflow-hidden', className)}
      {...props}
    >
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
