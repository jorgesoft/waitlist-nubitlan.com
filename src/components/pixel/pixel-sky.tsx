import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelIcon } from './icon'
import { AsciiSky } from './ascii-sky'

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
 * Full hero backdrop: the sky gradient with the ASCII sky (clouds by day,
 * clouds and stars by night) on top. Children render above all of it.
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
      {showClouds ? <AsciiSky className="-z-10" /> : null}
      {children}
    </div>
  )
}

