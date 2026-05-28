import { ArticleCard } from '@/components/articles/ArticleCard'
import type { ArticlePreview } from '@/lib/types'

interface Props {
  articles: ArticlePreview[]
  columns?: 2 | 3
  variant?: 'default' | 'horizontal'
}

export function ArticleGrid({
  articles,
  columns = 3,
  variant = 'default',
}: Props) {
  if (articles.length === 0) {
    return (
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-dim)',
          padding: '40px 0',
          textAlign: 'center',
        }}
      >
        No articles found.
      </p>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            variant="horizontal"
          />
        ))}
      </div>
    )
  }

  const gridCols =
    columns === 2
      ? 'repeat(auto-fill, minmax(280px, 1fr))'
      : 'repeat(auto-fill, minmax(260px, 1fr))'

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        gap: 'var(--sp-4)',
      }}
    >
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} variant="default" />
      ))}
    </div>
  )
}
