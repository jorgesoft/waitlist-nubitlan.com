import { cn } from '@/lib/utils'
import { PixelSprite, type PixelPalette } from './pixel-art'

/**
 * The Nubitlan mark as pixel art: a back cloud cresting behind a larger
 * front cloud, mirroring the stacked-cloud logo.
 */
const LOGO_MARK = [
  '......2222......',
  '....22222222....',
  '...2222222222...',
  '..222222222222..',
  '.22222222222222.',
  '..111111.2222222',
  '.11111111112222.',
  '111111111111.22.',
  '1111111111111111',
  '1111111111111111',
  '.11111111111111.',
  '..111111111111..',
] as const

const markPalette: PixelPalette = {
  '1': 'var(--cloud-200)',
  '2': 'var(--cloud-400)',
}

const markPaletteBrand: PixelPalette = {
  '1': 'var(--sky-400)',
  '2': 'var(--sky-600)',
}

const markPaletteInvert: PixelPalette = {
  '1': 'var(--cloud-100)',
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
      ? markPaletteBrand
      : variant === 'invert'
        ? markPaletteInvert
        : markPalette

  return (
    <PixelSprite
      matrix={LOGO_MARK}
      palette={palette}
      width={size}
      height={(size / 16) * 12}
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
        <span className="font-pixel text-base tracking-tight">
          nubit<span className="text-primary">lan</span>
        </span>
      ) : null}
    </span>
  )
}
