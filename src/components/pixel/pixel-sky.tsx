import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelIcon } from './icon'
import { VantaSky } from './vanta-sky'

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
 * Full hero backdrop: the sky gradient with Vanta's volumetric clouds on
 * top. Children render above all of it.
 */
export function PixelSky({
  children,
  className,
  showClouds = true,
  mobileLite = false,
  ...props
}: React.ComponentProps<'div'> & {
  showClouds?: boolean
  /**
   * Phones get static pixel clouds instead of the WebGL sky, which costs
   * seconds of main-thread time on a mid-range Android. For pages opened
   * from a QR code on mobile data (/escuelas, /isp, /empresas).
   */
  mobileLite?: boolean
}) {
  return (
    <div
      className={cn('relative isolate overflow-hidden', className)}
      {...props}
    >
      <div className="sky-wash absolute inset-0 -z-30" aria-hidden="true" />
      {showClouds ? <VantaSky className="-z-10" minWidth={mobileLite ? 768 : undefined} /> : null}
      {showClouds && mobileLite ? (
        <div aria-hidden="true" className="absolute inset-0 -z-20 md:hidden">
          <PixelCloud width={200} opacity={0.7} className="absolute top-10 -left-8" />
          <PixelCloud width={160} opacity={0.6} className="absolute top-1/3 -right-6" />
          <PixelCloud width={140} opacity={0.5} className="absolute bottom-16 left-1/4" />
        </div>
      ) : null}
      {children}
    </div>
  )
}

