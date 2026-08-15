import { cn } from '@/lib/utils'
import { PixelSprite, type PixelPalette } from './pixel-art'
import { LOGO_MARK, cloudPalette, logoPalette } from './sprites'

const MARK_WIDTH = 16
const MARK_HEIGHT = LOGO_MARK.length

/**
 * White cloud with a blue edge, for use on a coloured field where the
 * standard brand-blue mark would not separate from its background.
 */
const markPaletteInvert: PixelPalette = {
  o: 'var(--sky-600)',
  '1': 'oklch(1 0 0)',
  '2': 'var(--sky-200)',
}

export function PixelLogoMark({
  size = 32,
  variant = 'brand',
  className,
}: {
  size?: number
  variant?: 'brand' | 'cloud' | 'invert'
  className?: string
}) {
  const palette =
    variant === 'brand'
      ? logoPalette
      : variant === 'invert'
        ? markPaletteInvert
        : cloudPalette

  return (
    <PixelSprite
      matrix={LOGO_MARK}
      palette={palette}
      width={size}
      height={(size / MARK_WIDTH) * MARK_HEIGHT}
      className={cn('shrink-0', className)}
    />
  )
}

/** Mark plus wordmark, used in the navbar and footer. */
export function PixelLogo({
  size = 30,
  variant = 'brand',
  className,
  showWord = true,
}: {
  size?: number
  variant?: 'brand' | 'cloud' | 'invert'
  className?: string
  showWord?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <PixelLogoMark size={size} variant={variant} />
      {showWord ? (
        <span className="text-lg font-extrabold tracking-tight">
          nubit<span className="text-primary">lan</span>
        </span>
      ) : null}
    </span>
  )
}
