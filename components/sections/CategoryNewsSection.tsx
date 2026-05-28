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
        padding: '36px 16px',
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
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '8px',
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
              marginBottom: '4px',
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
        style={{
          gap: '1px',
          background: 'var(--border)',
        }}
      >
        {articles.map((article) => (
          <div key={article.slug} style={{ background: 'var(--bg-page)' }}>
            <ArticleCard article={article} variant="default" />
          </div>
        ))}
      </div>
    </section>
  )
}
