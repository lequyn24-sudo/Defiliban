import Link from 'next/link'
import { ArticleCard } from '@/components/articles/ArticleCard'
import type { ArticlePreview } from '@/lib/types'

interface Props {
  eyebrow: string
  title: string
  slug: string
  articles: ArticlePreview[]
}

export function CategoryNewsSection({ eyebrow, title, slug, articles }: Props) {
  if (articles.length === 0) return null

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        padding: 'var(--sp-8) var(--sp-4)',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'var(--sp-5)',
          flexWrap: 'wrap',
          gap: 'var(--sp-2)',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-dim)',
              marginBottom: 'var(--sp-1)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '24px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              letterSpacing: '-0.2px',
            }}
          >
            {title}
          </h2>
        </div>
        <Link
          href={`/${slug}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-dim)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          View all {eyebrow.toLowerCase()} →
        </Link>
      </div>

      {/* 3-column article grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ gap: 'var(--sp-4)' }}
      >
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} variant="default" />
        ))}
      </div>
    </section>
  )
}
