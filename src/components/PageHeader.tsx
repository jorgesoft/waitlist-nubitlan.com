import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelCloud, PixelSky } from '@/components/pixel/pixel-sky'
import { Badge } from '@/components/ui/badge'

/**
 * Compact hero for interior pages: same pixel sky as the landing page,
 * scaled down so it frames the content instead of dominating it.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  children,
  className,
  lightweight = false,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Pixel sprite shown above the eyebrow, as the page's mark. */
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  /**
   * Static pixel clouds instead of the WebGL (Vanta) sky. For pages opened
   * on phones over mobile data, such as the QR-code landing pages, where
   * three.js and the shader would cost seconds of main-thread time.
   */
  lightweight?: boolean
}) {
  // Interior heroes are short, so a cloud drifting through the middle lands
  // right behind the icon and title. Dim the field here — the landing page
  // keeps them at full strength.
  return (
    <PixelSky
      className={cn(
        'border-b border-border [&_[data-clouds]]:opacity-55',
        className
      )}
      showClouds={!lightweight}
    >
      {lightweight ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <PixelCloud width={180} opacity={0.6} className="absolute top-8 -left-6 sm:left-[6%]" />
          <PixelCloud width={140} opacity={0.5} className="absolute top-24 -right-4 sm:right-[8%]" />
          <PixelCloud width={110} opacity={0.4} className="absolute bottom-6 left-[60%] hidden sm:block" />
        </div>
      ) : null}
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        {/* The entrance animation hides the headline at first paint, which
            delays the largest contentful paint; lightweight pages skip it. */}
        <div className={lightweight ? undefined : 'stagger'}>
          {icon ? <div className="mb-6 flex justify-center">{icon}</div> : null}

          {eyebrow ? (
            <div className="mb-5 flex justify-center">
              <Badge variant="pixel" size="lg">
                {eyebrow}
              </Badge>
            </div>
          ) : null}

          <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty">
              {description}
            </p>
          ) : null}

          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </PixelSky>
  )
}
