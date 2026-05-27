import Link from 'next/link'
import { HeroSection } from '@/components/articles/HeroSection'
import { ArticleGrid } from '@/components/articles/ArticleGrid'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { MOCK_ARTICLES, getLatestArticles, toPreview } from '@/lib/mock/articles'
import { CATEGORIES } from '@/lib/constants/categories'

export default function HomePage() {
  const allPreviews = MOCK_ARTICLES.map(toPreview)
  const featured = allPreviews.find((a) => a.isFeatured && a.tier1 === 'protocols') ?? allPreviews[0]
  const latest = getLatestArticles(10).map(toPreview)

  const sections = CATEGORIES.filter((c) =>
    ['protocols', 'yield', 'risk', 'liquidity', 'infrastructure'].includes(c.slug)
  ).map((cat) => ({
    meta: cat,
    articles: allPreviews.filter((a) => a.tier1 === cat.slug).slice(0, 3),
  }))

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero */}
      <HeroSection featured={featured} latest={latest} />

      {/* Category sections */}
      <div style={{ padding: '0 16px' }}>
        {sections.map(({ meta, articles }) => {
          if (articles.length === 0) return null
          return (
            <section
              key={meta.slug}
              style={{ paddingTop: '48px', paddingBottom: '32px' }}
            >
              {/* Section header */}
              <div
                className="flex items-center justify-between mb-4"
                style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'var(--text-dim)',
                  }}
                >
                  {meta.label}
                </h2>
                <Link
                  href={`/${meta.slug}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-dim)',
                    textDecoration: 'none',
                  }}
                >
                  View all →
                </Link>
              </div>
              <ArticleGrid articles={articles} columns={3} />
            </section>
          )
        })}
      </div>

      {/* Newsletter CTA */}
      <div
        style={{
          margin: '32px 16px',
          padding: '40px',
          background: 'var(--bg-surface2)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
        }}
      >
        <SubscribeForm />
      </div>
    </div>
  )
}
