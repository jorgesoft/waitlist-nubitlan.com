import { cn } from '@/lib/utils'
import { asset } from '@/lib/asset'

/**
 * The original Nubitlan cloud mark.
 *
 * Served from the 192px source rather than the 32px favicon so it stays
 * sharp on high-density screens at the ~30px it actually renders at.
 */
const LOGO_SRC = '/android-chrome-192x192.png'

export function PixelLogoMark({
  size = 32,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <img
      src={asset(LOGO_SRC)}
      alt=""
      width={size}
      height={size}
      className={cn('shrink-0 object-contain', className)}
      style={{ width: size, height: size }}
    />
  )
}

/** Mark plus wordmark, used in the navbar and footer. */
export function PixelLogo({
  size = 32,
  className,
  showWord = true,
}: {
  size?: number
  className?: string
  showWord?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <PixelLogoMark size={size} />
      {showWord ? (
        <span className="text-lg font-extrabold tracking-tight">
          nubit<span className="text-primary">lan</span>
        </span>
      ) : null}
    </span>
  )
}
