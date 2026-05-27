import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import {
  CATEGORIES,
  getCategoryMeta,
  isValidTier1,
  isValidSubcategory,
} from '@/lib/constants/categories'
import { MOCK_ARTICLES, toPreview } from '@/lib/mock/articles'
import { ArticleGrid } from '@/components/articles/ArticleGrid'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import Link from 'next/link'

interface Props {
  params: Promise<{ category: string; subcategory: string }>
}

export function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = []
  for (const cat of CATEGORIES) {
    for (const sub of cat.subcategories) {
      params.push({ category: cat.slug, subcategory: sub.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params
  const meta = getCategoryMeta(category)
  const sub = meta?.subcategories.find((s) => s.slug === subcategory)
  if (!sub) return {}
  return {
    title: `${sub.label} — ${meta?.label}`,
    description: `${sub.label} coverage within the ${meta?.label} category on Defiliban.`,
  }
}

export default async function SubcategoryPage({ params }: Props) {
  const { category, subcategory } = await params

  if (!isValidTier1(category)) notFound()
  if (!isValidSubcategory(category, subcategory)) notFound()

  const meta = getCategoryMeta(category)!
  const subMeta = meta.subcategories.find((s) => s.slug === subcategory)!
  const fullSlug = `${category}/${subcategory}`

  const articles = MOCK_ARTICLES.filter((a) => a.category === fullSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(toPreview)

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
      {/* Breadcrumb */}
      <div
        style={{
          padding: '20px 0 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Link
          href={`/${category}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: 'var(--text-dim)',
            textDecoration: 'none',
          }}
        >
          {meta.label}
        </Link>
        <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>/</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: 'var(--text-primary)',
          }}
        >
          {subMeta.label}
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          padding: '16px 0 24px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '32px',
        }}
      >
        <CategoryBadge category={fullSlug} size="md" />
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '24px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '-0.2px',
            marginTop: '10px',
            marginBottom: '8px',
          }}
        >
          {subMeta.label}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-dim)',
          }}
        >
          {articles.length} articles in {meta.label} / {subMeta.label}
        </p>

        {/* Sibling subcategory links */}
        <div className="flex flex-wrap gap-2 mt-4">
          {meta.subcategories.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color:
                  sub.slug === subcategory
                    ? 'var(--text-primary)'
                    : 'var(--text-dim)',
                border: `1px solid ${sub.slug === subcategory ? 'var(--border-strong)' : 'var(--border)'}`,
                padding: '4px 12px',
                borderRadius: '20px',
                textDecoration: 'none',
              }}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <ArticleGrid articles={articles} columns={3} />
    </div>
  )
}
