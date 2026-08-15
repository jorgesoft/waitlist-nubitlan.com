import yaml from 'js-yaml'
import { marked } from 'marked'

/**
 * File-based blog.
 *
 * Posts are markdown files in `src/content/blog/*.md` with a YAML frontmatter
 * block. Vite inlines them at build time via `import.meta.glob`, so there is
 * no runtime fetch, no database and no CMS — writing a post means adding a
 * file and committing it.
 *
 * Frontmatter fields:
 *   title       (required) Post title.
 *   date        (required) ISO date, e.g. 2026-08-14. Drives ordering.
 *   excerpt     (required) One- or two-sentence summary for cards and SEO.
 *   author      (optional) Defaults to "Equipo Nubitlan".
 *   tags        (optional) List of strings, used by the tag filter.
 *   draft       (optional) When true the post is hidden in production builds.
 *   coverAlt    (optional) Alt text if the post body opens with an image.
 */

export interface PostFrontmatter {
  title: string
  /** ISO `YYYY-MM-DD`. */
  date: string
  excerpt: string
  author?: string
  tags?: string[]
  draft?: boolean
}

/**
 * Frontmatter as it comes back from the YAML parser, before normalisation.
 *
 * `date` is deliberately `unknown`: js-yaml's default schema resolves an
 * unquoted `2026-08-12` to a **Date object**, not a string. Typing it as
 * `string` would compile fine and then blow up at runtime on the first
 * `date.localeCompare`, so the raw value is narrowed explicitly instead.
 */
interface RawFrontmatter extends Omit<Partial<PostFrontmatter>, 'date'> {
  date?: unknown
}

/** Coerces a frontmatter date into `YYYY-MM-DD`, or null if unusable. */
function normalizeDate(value: unknown): string | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? null
      : value.toISOString().slice(0, 10)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  return null
}

export interface Post extends PostFrontmatter {
  slug: string
  author: string
  tags: string[]
  /** Rendered HTML body. */
  html: string
  /** Estimated reading time in minutes, minimum 1. */
  readingMinutes: number
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

interface ParsedFile {
  data: RawFrontmatter
  body: string
}

function parseFrontmatter(raw: string, slug: string): ParsedFile {
  const match = raw.match(FRONTMATTER_PATTERN)

  if (!match) {
    console.warn(`[blog] "${slug}" has no frontmatter block; skipping.`)
    return { data: {}, body: raw }
  }

  try {
    const data = yaml.load(match[1]) as RawFrontmatter | null
    return { data: data ?? {}, body: raw.slice(match[0].length) }
  } catch (error) {
    console.warn(`[blog] Invalid YAML frontmatter in "${slug}":`, error)
    return { data: {}, body: raw.slice(match[0].length) }
  }
}

/** Average adult reading speed for Spanish prose, rounded down a little. */
const WORDS_PER_MINUTE = 200

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

marked.setOptions({ gfm: true, breaks: false })

// `eager` so posts are part of the main bundle and available synchronously —
// the volume here is small, and it keeps the blog pages free of loading states.
const files = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function buildPosts(): Post[] {
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(files)) {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw, slug)
    const date = normalizeDate(data.date)

    // A post without a title or a usable date cannot be rendered or ordered.
    if (!data.title || !date) {
      console.warn(
        `[blog] "${slug}" is missing a valid "title" or "date"; skipping.`
      )
      continue
    }

    // Drafts stay visible while developing, hidden in production builds.
    if (data.draft && import.meta.env.PROD) continue

    posts.push({
      slug,
      title: data.title,
      date,
      excerpt: data.excerpt ?? '',
      author: data.author ?? 'Equipo Nubitlan',
      // A bare `tags: seguridad` parses to a string, whose .includes() would
      // then match substrings instead of whole tags — coerce to an array.
      tags: Array.isArray(data.tags)
        ? data.tags.filter((tag): tag is string => typeof tag === 'string')
        : [],
      draft: data.draft ?? false,
      html: marked.parse(body, { async: false }),
      readingMinutes: estimateReadingMinutes(body),
    })
  }

  // Newest first.
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export const posts: Post[] = buildPosts()

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

/** All tags in use, ordered by frequency then alphabetically. */
export function getAllTags(): string[] {
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}

/** Posts sharing the most tags with the given one, nearest first. */
export function getRelatedPosts(post: Post, limit = 2): Post[] {
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      shared: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) => b.shared - a.shared || b.post.date.localeCompare(a.post.date)
    )
    .slice(0, limit)
    .map((entry) => entry.post)
}

const DATE_FORMATTER = new Intl.DateTimeFormat('es-SV', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return date
  return DATE_FORMATTER.format(parsed)
}
