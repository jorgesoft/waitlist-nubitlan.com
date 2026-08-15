import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Pixel-art renderer.
 *
 * Sprites are authored as string matrices — one character per pixel — which
 * keeps the art readable and editable directly in source. Characters map to
 * entries in a palette; `.` (and spaces) are transparent.
 *
 * Rather than emitting one <rect> per pixel, adjacent same-colour pixels on a
 * row are merged into a single run. A 20x12 cloud drops from ~200 rects to
 * ~30, which matters when a dozen sprites are animating at once.
 */

export type PixelPalette = Record<string, string>

export interface PixelSpriteProps extends React.ComponentProps<'svg'> {
  /** Rows of the sprite, one character per pixel. */
  matrix: readonly string[]
  /** Maps sprite characters to CSS colours. */
  palette: PixelPalette
}

interface Run {
  x: number
  y: number
  width: number
  fill: string
}

function buildRuns(matrix: readonly string[], palette: PixelPalette): Run[] {
  const runs: Run[] = []

  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y]
    let x = 0

    while (x < row.length) {
      const char = row[x]
      const fill = palette[char]

      // Transparent pixel — skip it.
      if (!fill) {
        x++
        continue
      }

      // Extend the run while the colour stays the same.
      let width = 1
      while (x + width < row.length && row[x + width] === char) width++

      runs.push({ x, y, width, fill })
      x += width
    }
  }

  return runs
}

export function PixelSprite({
  matrix,
  palette,
  className,
  ...props
}: PixelSpriteProps) {
  const height = matrix.length
  const width = matrix.reduce((max, row) => Math.max(max, row.length), 0)

  const runs = React.useMemo(
    () => buildRuns(matrix, palette),
    [matrix, palette]
  )

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn('pixelated', className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {runs.map((run, i) => (
        <rect
          key={i}
          x={run.x}
          y={run.y}
          width={run.width}
          height={1}
          fill={run.fill}
          shapeRendering="crispEdges"
        />
      ))}
    </svg>
  )
}
