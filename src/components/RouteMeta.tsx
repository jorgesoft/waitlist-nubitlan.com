import * as React from 'react'
import { useLocation } from 'react-router-dom'

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
    let cancelled = false
    // seo.ts pulls in every blog post and the markdown parser. The first
    // page load already has its tags from the prerendered HTML, so the module
    // is only needed for later navigations and can load in the background.
    import('@/lib/seo').then(({ headTags, resolveMeta }) => {
      if (cancelled) return
      apply(headTags(resolveMeta(pathname)))
    })
    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}

type Head = ReturnType<typeof import('@/lib/seo').headTags>

/** Replaces the `data-seo` tag set with the given route's. */
function apply({ title, tags }: Head) {
  document.title = title

  document.head.querySelectorAll('[data-seo]').forEach((node) => node.remove())
  for (const { tag, attrs, text } of tags) {
    const element = document.createElement(tag)
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value)
    element.setAttribute('data-seo', '')
    if (text) element.textContent = text
    document.head.appendChild(element)
  }
}
