import { PixelIcon, type PixelIconName } from '@/components/pixel/icon'

/**
 * Centered section intro used across marketing pages: optional pixel icon,
 * mono eyebrow, extra-bold title and a muted description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string
  title: string
  description?: string
  icon?: PixelIconName
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {icon ? (
        <div className="mb-5 flex justify-center">
          <PixelIcon name={icon} className="text-primary size-10" />
        </div>
      ) : null}
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  )
}
