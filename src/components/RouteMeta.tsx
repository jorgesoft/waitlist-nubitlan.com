import * as React from 'react'
import { useLocation } from 'react-router-dom'

import { headTags, resolveMeta } from '@/lib/seo'

/**
 * Keeps <head> in sync with the current route on client-side navigation.
 *
 * The first page load already has the right tags: the build writes them into
 * each route's HTML (see vite/seo-prerender.ts). On every navigation this
 * swaps the whole `data-seo` set for the new route's.
 */
export default function RouteMeta() {
  const { pathname } = useLocation()

  React.useEffect(() => {
    const { title, tags } = headTags(resolveMeta(pathname))
    document.title = title

    document.head.querySelectorAll('[data-seo]').forEach((node) => node.remove())
    for (const { tag, attrs, text } of tags) {
      const element = document.createElement(tag)
      for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value)
      element.setAttribute('data-seo', '')
      if (text) element.textContent = text
      document.head.appendChild(element)
    }
  }, [pathname])

  return null
}
