import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelIcon } from './icon'

export interface PixelCloudProps extends React.ComponentProps<'div'> {
  /** Rendered width in pixels. The cloud is square-ish, so height follows. */
  width?: number
  opacity?: number
}

/**
 * A single pixelarticons cloud, coloured by the theme's cloud token.
 *
 * `width` is the desktop size; `.cloud-sprite` scales it down on small
 * screens, where a full-size cloud covers most of the viewport.
 */
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
      style={
        { opacity, '--cloud-w': `${width}px`, ...style } as React.CSSProperties
      }
      {...props}
    >
      <PixelIcon name="cloud" className="cloud-sprite text-[var(--cloud-line)]" />
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
  /**
   * Whether this cloud also shows on small screens. Most are desktop-only:
   * a phone hero is almost entirely text, so clouds crossing the middle
   * land behind the headline and make it hard to read.
   */
  onMobile?: boolean
}

/**
 * Hand-placed rather than random: a fixed layout keeps the composition
 * balanced, avoids clouds stacking on the headline, and stays identical
 * across renders. Larger, more opaque clouds drift faster to read as nearer.
 */
const FIELD: DriftingCloud[] = [
  { top: 4, width: 190, opacity: 0.8, duration: 44, delay: -6, onMobile: true },
  { top: 24, width: 120, opacity: 0.42, duration: 68, delay: -30 },
  { top: 44, width: 92, opacity: 0.28, duration: 86, delay: -12 },
  { top: 60, width: 150, opacity: 0.55, duration: 52, delay: -40 },
  { top: 14, width: 80, opacity: 0.25, duration: 94, delay: -70 },
  { top: 88, width: 230, opacity: 0.8, duration: 38, delay: -22, onMobile: true },
  { top: 34, width: 105, opacity: 0.32, duration: 76, delay: -55 },
  { top: 74, width: 88, opacity: 0.28, duration: 64, delay: -18 },
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
          className={cn(
            'absolute left-0 will-change-transform',
            !cloud.onMobile && 'hidden sm:block'
          )}
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

/**
 * Twinkling pixel stars — only visible in dark mode, where the sky is night.
 * Kept to the outer margins: a star landing beside a line of text reads as
 * a speck of dirt rather than a star.
 */
const STARS = [
  { left: 8, top: 18, delay: 0 },
  { left: 17, top: 62, delay: 1.1 },
  { left: 12, top: 12, delay: 2.2 },
  { left: 5, top: 44, delay: 0.6 },
  { left: 21, top: 84, delay: 1.7 },
  { left: 79, top: 70, delay: 0.3 },
  { left: 88, top: 32, delay: 2.6 },
  { left: 94, top: 56, delay: 1.4 },
  { left: 83, top: 14, delay: 2.0 },
  { left: 91, top: 86, delay: 0.9 },
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
 * Full hero backdrop: sky gradient, stars (dark mode) and the drifting cloud
 * field. Children render above all of it.
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
      <PixelStars />
      {showClouds ? <CloudField className="-z-10" /> : null}
      {children}
    </div>
  )
}

