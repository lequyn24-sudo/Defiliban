import Link from 'next/link'
import Image from 'next/image'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { timeAgo, readTimeLabel } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'

interface Props {
  featured: ArticlePreview
  latest: ArticlePreview[]
  mostRead: ArticlePreview[]
}

export function HeroSection({ featured, latest, mostRead }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1px',
        background: 'var(--border)',
      }}
      className="lg:grid-cols-[260px_1fr_240px]"
    >
      {/* ── Left: Latest Insights ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <LatestInsights articles={latest.slice(0, 5)} />
      </div>

      {/* ── Center: Featured Spotlight ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <FeaturedSpotlight article={featured} />
      </div>

      {/* ── Right: Most Read ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <MostRead articles={mostRead} />
      </div>
    </div>
  )
}

function LatestInsights({ articles }: { articles: ArticlePreview[] }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px 10px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--text-primary)',
          }}
        >
          Latest Insights
        </span>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-dim)',
            textDecoration: 'none',
          }}
        >
          View all →
        </Link>
      </div>

      {/* Article rows */}
      <div style={{ flex: 1 }}>
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: i < articles.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              className="row-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-dim)',
                  }}
                >
                  {timeAgo(article.publishedAt)}
                </span>
                <CategoryBadge
                  category={article.category}
                  isBreaking={article.isBreaking}
                  isSponsor={article.isSponsor}
                />
              </div>
              <h3
                className="line-clamp-2"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                }}
              >
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function FeaturedSpotlight({ article }: { article: ArticlePreview }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '300px', background: 'var(--bg-surface)', flexShrink: 0 }}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          style={{ objectFit: 'cover', opacity: 0.75 }}
          sizes="(max-width: 1024px) 100vw, 760px"
          priority
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(37,37,37,0.97) 0%, rgba(37,37,37,0.2) 60%, transparent 100%)',
          }}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              background: 'var(--text-primary)',
              color: 'var(--bg-void)',
              padding: '3px 8px',
              borderRadius: '2px',
              fontWeight: 500,
            }}
          >
            Featured
          </span>
          <CategoryBadge
            category={article.category}
            isBreaking={article.isBreaking}
            isSponsor={article.isSponsor}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2
          className="line-clamp-3"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '28px',
            fontWeight: 500,
            letterSpacing: '-0.3px',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
          }}
        >
          {article.title}
        </h2>

        <p
          className="line-clamp-3"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
          }}
        >
          {article.excerpt}
        </p>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
            {timeAgo(article.publishedAt)}
          </span>
          <span style={{ color: 'var(--border)', fontSize: '12px' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
            {readTimeLabel(article.readTimeMin)}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(232,232,198,0.35)' }}>
            {article.sourceAttribution}
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '4px' }}>
          <Link
            href={`/article/${article.slug}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.5px',
              background: 'var(--text-primary)',
              color: 'var(--bg-void)',
              padding: '7px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            Read Full Article →
          </Link>
          <button
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.5px',
              background: 'transparent',
              color: 'var(--text-dim)',
              padding: '7px 16px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function MostRead({ articles }: { articles: ArticlePreview[] }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px 10px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--text-primary)',
          }}
        >
          Most Read
        </span>
      </div>

      {/* Numbered article list */}
      <div style={{ flex: 1, padding: '4px 0' }}>
        {articles.map((article, i) => (
          <div key={article.slug} style={{ padding: '0 16px' }}>
            <ArticleCard article={article} variant="compact" index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}
