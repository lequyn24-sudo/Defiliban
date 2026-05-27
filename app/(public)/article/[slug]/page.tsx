import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MOCK_ARTICLES, getRelatedArticles, toPreview } from '@/lib/mock/articles'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { formatDate, readTimeLabel } from '@/lib/utils/format'
import { getCategoryMeta } from '@/lib/constants/categories'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = MOCK_ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = MOCK_ARTICLES.find((a) => a.slug === slug)
  if (!article) notFound()

  const related = getRelatedArticles(article, 3).map(toPreview)
  const tier1Meta = getCategoryMeta(article.tier1)
  const subMeta = tier1Meta?.subcategories.find(
    (s) => `${article.tier1}/${s.slug}` === article.category
  )

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          paddingTop: '32px',
        }}
        className="lg:grid-cols-[1fr_300px]"
      >
        {/* Main article column */}
        <article style={{ maxWidth: '720px', width: '100%' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
            }}
          >
            <Link
              href={`/${article.tier1}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
              }}
            >
              {tier1Meta?.label}
            </Link>
            {subMeta && (
              <>
                <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>/</span>
                <Link
                  href={`/${article.tier1}/${subMeta.slug}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: 'var(--text-dim)',
                    textDecoration: 'none',
                  }}
                >
                  {subMeta.label}
                </Link>
              </>
            )}
          </div>

          {/* Category badge */}
          <CategoryBadge
            category={article.category}
            isBreaking={article.isBreaking}
            isSponsor={article.isSponsor}
            size="md"
          />

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              letterSpacing: '-0.3px',
              marginTop: '14px',
              marginBottom: '16px',
            }}
          >
            {article.title}
          </h1>

          {/* Deck / lead */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: 'var(--text-dim)',
              lineHeight: 1.65,
              borderLeft: '2px solid var(--border-strong)',
              paddingLeft: '16px',
              marginBottom: '20px',
            }}
          >
            {article.excerpt}
          </p>

          {/* Metadata */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border)',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
              }}
            >
              {formatDate(article.publishedAt)}
            </span>
            <span style={{ color: 'var(--border)', fontSize: '10px' }}>·</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
              }}
            >
              {readTimeLabel(article.readTimeMin)}
            </span>
          </div>

          {/* Cover image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              marginBottom: '28px',
              background: 'var(--bg-surface)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>

          {/* Article body */}
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* AI attribution */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(232,232,198,0.35)',
              marginTop: '32px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)',
            }}
          >
            {article.sourceAttribution}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '24px',
              }}
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                    borderRadius: '2px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Sidebar — related articles */}
        {related.length > 0 && (
          <aside>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'var(--text-dim)',
                marginBottom: '16px',
                paddingTop: '4px',
              }}
            >
              Related
            </h2>
            <div className="flex flex-col gap-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="horizontal" />
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Spacing */}
      <div style={{ paddingBottom: '64px' }} />
    </div>
  )
}
