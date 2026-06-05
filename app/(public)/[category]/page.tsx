import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { TIER1_SLUGS, getCategoryMeta, isValidTier1 } from '@/lib/constants/categories'
import { MOCK_ARTICLES, toPreview } from '@/lib/mock/articles'
import { ArticleGrid } from '@/components/articles/ArticleGrid'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import Link from 'next/link'

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return TIER1_SLUGS.map((slug) => ({ category: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = getCategoryMeta(category)
  if (!meta) return {}
  return {
    title: meta.label,
    description: meta.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!isValidTier1(category)) notFound()

  const meta = getCategoryMeta(category)!
  const articles = MOCK_ARTICLES.filter((a) => a.tier1 === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(toPreview)

  const featured = articles.find((a) => a.isFeatured)
  const rest = articles.filter((a) => !a.isFeatured)

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--sp-4) var(--sp-16)' }}>
      {/* Category header */}
      <div
        style={{
          padding: '32px 0 24px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '32px',
        }}
      >
        <CategoryBadge category={category} size="md" />
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.4px',
            marginTop: '12px',
            marginBottom: '8px',
          }}
        >
          {meta.label}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-dim)',
            maxWidth: '600px',
          }}
        >
          {meta.description}
        </p>

        {/* Subcategory pills */}
        {meta.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {meta.subcategories.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px', fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Layout: featured left + grid right */}
      {featured && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px',
            marginBottom: '40px',
          }}
          className="md:grid-cols-[2fr_3fr]"
        >
          <ArticleCard article={featured} variant="featured" />
          <ArticleGrid articles={rest.slice(0, 4)} columns={2} />
        </div>
      )}

      {/* Rest of articles */}
      {!featured && <ArticleGrid articles={articles} columns={3} />}
      {featured && rest.length > 4 && (
        <>
          <div
            style={{
              borderTop: '1px solid var(--border)',
              padding: '32px 0 16px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px', fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'var(--text-dim)',
                marginBottom: '16px',
              }}
            >
              More in {meta.label}
            </h2>
          </div>
          <ArticleGrid articles={rest.slice(4)} columns={3} />
        </>
      )}
    </div>
  )
}
