import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { formatPostDate, getAllTags, posts, type Post } from '@/lib/blog'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PixelSprite } from '@/components/pixel/pixel-art'
import { ICON_POST, iconPalette } from '@/components/pixel/sprites'

const ALL_TAGS = 'Todos'

function BlogIndexPage() {
  const [activeTag, setActiveTag] = React.useState<string>(ALL_TAGS)
  const tags = React.useMemo(() => [ALL_TAGS, ...getAllTags()], [])

  const visiblePosts = React.useMemo(
    () =>
      activeTag === ALL_TAGS
        ? posts
        : posts.filter((post) => post.tags.includes(activeTag)),
    [activeTag]
  )

  // The newest post gets the wide treatment, but only on the unfiltered
  // view — inside a tag filter every result is equally relevant.
  const showFeatured = activeTag === ALL_TAGS && visiblePosts.length > 0
  const featured = showFeatured ? visiblePosts[0] : null
  const rest = showFeatured ? visiblePosts.slice(1) : visiblePosts

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Seguridad y cumplimiento, en claro"
        description="Guías prácticas sobre la Ley de Protección de Datos, ciberseguridad y cómo aplicarlas en tu empresa."
        icon={
          <PixelSprite
            matrix={ICON_POST}
            palette={iconPalette}
            width={56}
            height={56}
          />
        }
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {tags.length > 1 ? (
                <div
                  className="mb-12 flex flex-wrap justify-center gap-2"
                  role="group"
                  aria-label="Filtrar por tema"
                >
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      aria-pressed={activeTag === tag}
                      className={cn(
                        'font-mono focus-visible:ring-ring/50 border-2 px-3.5 py-2 text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-all focus-visible:ring-[3px] focus-visible:outline-none',
                        activeTag === tag
                          ? 'border-sky-700 bg-primary text-primary-foreground shadow-[3px_3px_0_0_var(--sky-800)] dark:border-sky-200 dark:shadow-[3px_3px_0_0_var(--sky-200)]'
                          : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ) : null}

              {featured ? <FeaturedCard post={featured} /> : null}

              {rest.length > 0 ? (
                <div
                  className={cn(
                    'stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3',
                    featured && 'mt-8'
                  )}
                >
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : null}

              {visiblePosts.length === 0 ? (
                <p className="text-muted-foreground py-16 text-center">
                  No hay publicaciones con el tema “{activeTag}” todavía.
                </p>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  )
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group focus-visible:ring-ring/50 block focus-visible:ring-[3px] focus-visible:outline-none"
    >
      <Card className="overflow-hidden border-2 border-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0_0_var(--sky-400)]">
        <CardContent className="p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="pixel">Destacado</Badge>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-balance group-hover:text-primary sm:text-4xl">
            {post.title}
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed text-pretty">
            {post.excerpt}
          </p>

          <PostMeta post={post} className="mt-6" />

          <span className="text-primary mt-6 inline-flex items-center gap-1.5 font-semibold">
            Leer artículo
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group focus-visible:ring-ring/50 flex focus-visible:ring-[3px] focus-visible:outline-none"
    >
      <Card className="flex-1 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-sky-300 group-hover:shadow-xl">
        <CardContent className="flex h-full flex-col p-7">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <h2 className="group-hover:text-primary mt-4 text-xl font-bold tracking-tight text-balance transition-colors">
            {post.title}
          </h2>

          <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          <PostMeta post={post} className="mt-5" />
        </CardContent>
      </Card>
    </Link>
  )
}

export function PostMeta({
  post,
  className,
}: {
  post: Post
  className?: string
}) {
  return (
    <div
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs',
        className
      )}
    >
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <ClockIcon className="size-3.5" />
        {post.readingMinutes} min
      </span>
      <span aria-hidden="true">·</span>
      <span>{post.author}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <PixelSprite
        matrix={ICON_POST}
        palette={iconPalette}
        width={64}
        height={64}
        className="mx-auto opacity-50"
      />
      <h2 className="mt-6 text-xl font-bold">Aún no hay publicaciones</h2>
      <p className="text-muted-foreground mx-auto mt-3 max-w-md">
        Estamos preparando los primeros artículos. Vuelve pronto.
      </p>
    </div>
  )
}

export default BlogIndexPage
