import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Icons from pixelarticons (https://pixelarticons.com, MIT).
 *
 * The package ships ESM in `.js` files without declaring `"type": "module"`,
 * so its prebuilt React components are risky to depend on. Its `svg/` folder
 * is the reliable source of truth, so the markup is imported as raw text and
 * inlined at build time. Only the icons listed here reach the bundle, and
 * each one stays in sync with the installed package.
 *
 * Add an icon: import the SVG and add it to ICONS. Browse names at
 * https://pixelarticons.com or in `node_modules/pixelarticons/svg`.
 */

import alertSvg from 'pixelarticons/svg/square-alert.svg?raw'
import articleSvg from 'pixelarticons/svg/article.svg?raw'
import bookSvg from 'pixelarticons/svg/book-open.svg?raw'
import chartSvg from 'pixelarticons/svg/chart.svg?raw'
import checkSvg from 'pixelarticons/svg/check.svg?raw'
import clipboardSvg from 'pixelarticons/svg/clipboard.svg?raw'
import cloudSvg from 'pixelarticons/svg/cloud.svg?raw'
import cloudSunSvg from 'pixelarticons/svg/cloud-sun.svg?raw'
import closeSvg from 'pixelarticons/svg/close.svg?raw'
import lockSvg from 'pixelarticons/svg/lock.svg?raw'
import monitorSvg from 'pixelarticons/svg/monitor.svg?raw'
import moonSvg from 'pixelarticons/svg/moon.svg?raw'
import robotSvg from 'pixelarticons/svg/robot.svg?raw'
import searchSvg from 'pixelarticons/svg/search.svg?raw'
import shieldSvg from 'pixelarticons/svg/shield.svg?raw'
import targetSvg from 'pixelarticons/svg/target.svg?raw'
import teachSvg from 'pixelarticons/svg/teach.svg?raw'
import trophySvg from 'pixelarticons/svg/trophy.svg?raw'
import usersSvg from 'pixelarticons/svg/users.svg?raw'
import videoSvg from 'pixelarticons/svg/video.svg?raw'
import zapSvg from 'pixelarticons/svg/zap.svg?raw'

/** Keeps only the drawing commands, dropping the file's own <svg> wrapper. */
function inner(raw: string): string {
  return raw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>[\s\S]*$/, '')
    .trim()
}

const ICONS = {
  alert: inner(alertSvg),
  article: inner(articleSvg),
  book: inner(bookSvg),
  chart: inner(chartSvg),
  check: inner(checkSvg),
  clipboard: inner(clipboardSvg),
  cloud: inner(cloudSvg),
  'cloud-sun': inner(cloudSunSvg),
  close: inner(closeSvg),
  lock: inner(lockSvg),
  monitor: inner(monitorSvg),
  moon: inner(moonSvg),
  robot: inner(robotSvg),
  search: inner(searchSvg),
  shield: inner(shieldSvg),
  target: inner(targetSvg),
  teach: inner(teachSvg),
  trophy: inner(trophySvg),
  users: inner(usersSvg),
  video: inner(videoSvg),
  zap: inner(zapSvg),
} as const

export type PixelIconName = keyof typeof ICONS

export const PIXEL_ICON_NAMES = Object.keys(ICONS) as PixelIconName[]

export interface PixelIconProps
  extends Omit<React.ComponentProps<'svg'>, 'dangerouslySetInnerHTML'> {
  name: PixelIconName
  /** Accessible label. Omit to leave the icon decorative. */
  title?: string
}

export function PixelIcon({
  name,
  title,
  className,
  ...props
}: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      /* No default size: callers set one, which lets a component class such
         as .cloud-sprite own the sizing without losing to a utility. */
      className={cn('pixelated shrink-0', className)}
      /* Build-time constants from the pixelarticons package — never user
         input, so there is nothing here to sanitise at runtime. */
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
      {...props}
    />
  )
}
