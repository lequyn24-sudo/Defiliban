import Link from 'next/link'
import Image from 'next/image'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { timeAgo, readTimeLabel } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'

interface Props {
  article: ArticlePreview
  variant?: 'featured' | 'default' | 'compact' | 'horizontal'
  index?: number
}

export function ArticleCard({
  article,
  variant = 'default',
  index = 0,
}: Props) {
  if (variant === 'featured') return <FeaturedCard article={article} />
  if (variant === 'compact') return <CompactCard article={article} index={index} />
  if (variant === 'horizontal') return <HorizontalCard article={article} />
  return <DefaultCard article={article} />
}

function FeaturedCard({ article }: { article: ArticlePreview }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block group"
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          background: 'var(--bg-surface2)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* Cover image */}
        <div style={{ position: 'relative', height: '240px', background: 'var(--bg-surface)' }}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover', opacity: 0.85 }}
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(37,37,37,0.95) 0%, transparent 60%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
            <CategoryBadge
              category={article.category}
              isBreaking={article.isBreaking}
              isSponsor={article.isSponsor}
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <h2
            className="line-clamp-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '-0.3px',
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginBottom: '10px',
            }}
          >
            {article.title}
          </h2>
          <p
            className="line-clamp-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.6,
              marginBottom: '16px',
            }}
          >
            {article.excerpt}
          </p>
          <MetaRow article={article} />
        </div>
      </div>
    </Link>
  )
}

function DefaultCard({ article }: { article: ArticlePreview }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block group"
      style={{ textDecoration: 'none' }}
    >
      <div
        className="card-hover"
        style={{
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            height: '160px',
            background: 'var(--bg-surface)',
            flexShrink: 0,
          }}
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover', opacity: 0.8, transition: 'opacity 0.2s' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: '14px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <CategoryBadge
            category={article.category}
            isBreaking={article.isBreaking}
            isSponsor={article.isSponsor}
          />
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.45,
            }}
          >
            {article.title}
          </h3>
          <p
            className="line-clamp-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--text-dim)',
              lineHeight: 1.55,
              flex: 1,
            }}
          >
            {article.excerpt}
          </p>
          <MetaRow article={article} />
        </div>
      </div>
    </Link>
  )
}

function CompactCard({
  article,
  index,
}: {
  article: ArticlePreview
  index: number
}) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block group"
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          padding: '12px 0',
          borderBottom: '1px solid var(--border)',
          alignItems: 'flex-start',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--text-faint)',
            fontWeight: 500,
            flexShrink: 0,
            minWidth: '20px',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {article.isBreaking && (
            <CategoryBadge
              category={article.category}
              isBreaking={article.isBreaking}
            />
          )}
          {!article.isBreaking && (
            <CategoryBadge category={article.category} />
          )}
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              marginTop: '4px',
              marginBottom: '4px',
            }}
          >
            {article.title}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-dim)',
            }}
          >
            {timeAgo(article.publishedAt)} · {readTimeLabel(article.readTimeMin)}
          </span>
        </div>
      </div>
    </Link>
  )
}

function HorizontalCard({ article }: { article: ArticlePreview }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block group"
      style={{ textDecoration: 'none' }}
    >
      <div
        className="card-hover"
        style={{
          display: 'flex',
          gap: '12px',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '80px',
            height: '64px',
            flexShrink: 0,
            background: 'var(--bg-surface)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover', opacity: 0.8 }}
            sizes="80px"
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CategoryBadge category={article.category} />
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              marginTop: '4px',
              marginBottom: '4px',
            }}
          >
            {article.title}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-dim)',
            }}
          >
            {timeAgo(article.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  )
}

function MetaRow({ article }: { article: ArticlePreview }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-dim)',
        }}
      >
        {timeAgo(article.publishedAt)}
      </span>
      <span style={{ color: 'var(--border)', fontSize: '10px' }}>·</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-dim)',
        }}
      >
        {readTimeLabel(article.readTimeMin)}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-faint)',
        }}
      >
        {article.sourceAttribution}
      </span>
    </div>
  )
}
