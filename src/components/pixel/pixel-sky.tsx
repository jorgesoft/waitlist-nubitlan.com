import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelIcon } from './icon'
import { DataCloudField } from './data-clouds'

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
 * Full hero backdrop: sky gradient, stars (dark mode) and the drifting data
 * cloud field. Children render above all of it.
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
      {showClouds ? <DataCloudField className="-z-10" /> : null}
      {children}
    </div>
  )
}

