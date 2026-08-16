import type { ComponentType } from 'react'

import type { PixelIconName } from '@/components/pixel/icon'
import PasswordGenerator from './password-generator/PasswordGenerator'

/**
 * Tool registry.
 *
 * Adding a tool means adding one entry here — routes, the tools index and the
 * short-URL aliases are all generated from this list, so nothing else needs to
 * be touched.
 *
 *   slug      Canonical path segment, mounted at /herramientas/<slug>.
 *   shortPath Memorable alias like "/ps". The tool renders at BOTH paths, so a
 *             shared link never bounces through a redirect. Keep these short
 *             and make sure they cannot collide with a real page route.
 */
export interface Tool {
  slug: string
  shortPath: string
  name: string
  tagline: string
  description: string
  icon: PixelIconName
  component: ComponentType
  /** Rendered as pixel chips on the tool card. */
  highlights: string[]
}

export const TOOLS: Tool[] = [
  {
    slug: 'generador-de-contrasenas',
    shortPath: '/ps',
    name: 'Generador de contraseñas',
    tagline: 'Contraseñas y frases seguras, generadas en tu navegador.',
    description:
      'Crea contraseñas aleatorias o frases de tipo diceware, con medidor de entropía en tiempo real. Todo se genera localmente con la API criptográfica del navegador — nada viaja por la red.',
    icon: 'lock',
    component: PasswordGenerator,
    highlights: ['100% local', 'Sin registro', 'Código abierto'],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}

/** Full canonical path for a tool, e.g. "/herramientas/generador-de-contrasenas". */
export function toolPath(tool: Tool): string {
  return `/herramientas/${tool.slug}`
}
