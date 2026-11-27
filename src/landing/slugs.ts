/**
 * The flyer landing pages. These paths are printed as QR codes on physical
 * flyers, so they must never change: nubitlan.com/escuelas, /isp, /empresas.
 *
 * Kept in its own tiny module so the router (main.tsx), the SEO metadata and
 * the API can all import the list without pulling in the page copy.
 */
export const AUDIENCE_SLUGS = ['escuelas', 'isp', 'empresas'] as const

export type AudienceSlug = (typeof AUDIENCE_SLUGS)[number]

export function isAudienceSlug(value: unknown): value is AudienceSlug {
  return typeof value === 'string' && (AUDIENCE_SLUGS as readonly string[]).includes(value)
}
