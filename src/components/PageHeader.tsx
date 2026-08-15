import * as React from 'react'

import { cn } from '@/lib/utils'
import { PixelSky } from '@/components/pixel/pixel-sky'
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
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Pixel sprite shown above the eyebrow, as the page's mark. */
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <PixelSky className={cn('border-b border-border', className)}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="stagger">
          {icon ? <div className="mb-6 flex justify-center">{icon}</div> : null}

          {eyebrow ? (
            <div className="mb-5 flex justify-center">
              <Badge variant="pixel" size="lg">
                {eyebrow}
              </Badge>
            </div>
          ) : null}

          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
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
