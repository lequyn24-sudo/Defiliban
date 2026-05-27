import { ArticleCard } from '@/components/articles/ArticleCard'
import type { ArticlePreview } from '@/lib/types'

interface Props {
  featured: ArticlePreview
  latest: ArticlePreview[]
}

export function HeroSection({ featured, latest }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1px',
        background: 'var(--border)',
      }}
      className="md:grid-cols-[3fr_2fr] lg:grid-cols-[3fr_2fr]"
    >
      {/* Featured article — left */}
      <div style={{ background: 'var(--bg-page)' }}>
        <ArticleCard article={featured} variant="featured" />
      </div>

      {/* Latest list — right */}
      <div
        style={{
          background: 'var(--bg-page)',
          padding: '0',
        }}
      >
        {/* Section label */}
        <div
          style={{
            padding: '14px 16px 8px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-dim)',
            }}
          >
            Latest
          </span>
        </div>

        {/* Compact article list */}
        <div style={{ padding: '0 16px' }}>
          {latest.slice(0, 10).map((article, i) => (
            <ArticleCard
              key={article.slug}
              article={article}
              variant="compact"
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
