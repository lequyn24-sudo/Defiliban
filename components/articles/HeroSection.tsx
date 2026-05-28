import Link from 'next/link'
import Image from 'next/image'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { timeAgo, readTimeLabel } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'
import type { CoinPrice } from '@/lib/types'

interface Props {
  featured: ArticlePreview
  latest: ArticlePreview[]
  prices: CoinPrice[]
}

export function HeroSection({ featured, latest, prices }: Props) {
  const marketLeaders = [...prices]
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1px',
        background: 'var(--border)',
      }}
      className="lg:grid-cols-[2fr_1.2fr_1fr]"
    >
      {/* ── Column 1: Research Spotlight ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <ResearchSpotlight article={featured} />
      </div>

      {/* ── Column 2: Latest Insights ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <LatestInsights articles={latest.slice(0, 3)} />
      </div>

      {/* ── Column 3: Market Leaders ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <MarketLeaders coins={marketLeaders} />
      </div>
    </div>
  )
}

function ResearchSpotlight({ article }: { article: ArticlePreview }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Image with overlay */}
      <div style={{ position: 'relative', height: '220px', background: 'var(--bg-surface)', flexShrink: 0 }}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          style={{ objectFit: 'cover', opacity: 0.75 }}
          sizes="(max-width: 1024px) 100vw, 640px"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(37,37,37,0.97) 0%, rgba(37,37,37,0.3) 60%, transparent 100%)',
          }}
        />
        {/* Research Spotlight badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              background: 'var(--color-positive)',
              color: '#1A1A18',
              padding: '3px 8px',
              borderRadius: '2px',
              fontWeight: 500,
            }}
          >
            Research Spotlight
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Confidence / meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--text-dim)',
              }}
            >
              Confidence
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-positive)',
              }}
            >
              82/100
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--text-dim)',
              }}
            >
              Data Sources
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
              }}
            >
              Onchain · Market · Model
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--text-dim)',
              }}
            >
              Last Updated
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-dim)',
              }}
            >
              {timeAgo(article.publishedAt)}
            </span>
          </div>
        </div>

        {/* Title */}
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

        {/* Why it matters */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--text-dim)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Why it matters:
          </span>
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
        </div>

        {/* CTA buttons */}
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
            Read Full Research →
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

      {/* Articles list */}
      <div style={{ flex: 1 }}>
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              style={{
                padding: '16px',
                borderBottom: i < articles.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              className="row-hover"
            >
              <h3
                className="line-clamp-2"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.45,
                  marginBottom: '8px',
                }}
              >
                {article.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function MarketLeaders({ coins }: { coins: CoinPrice[] }) {
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
          Market Leaders
        </span>
        <Link
          href="/cmc"
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

      {/* Column header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '20px 1fr 60px',
          padding: '6px 16px',
          borderBottom: '1px solid var(--border)',
          gap: '8px',
        }}
      >
        {['#', 'ASSET', '7D %'].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--text-dim)',
              textAlign: h === '7D %' ? 'right' : 'left',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Coin rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {coins.map((coin, i) => {
          const up = coin.price_change_percentage_24h >= 0
          return (
            <div
              key={coin.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr 60px',
                padding: '7px 16px',
                gap: '8px',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'rgba(232,232,198,0.35)',
                }}
              >
                {i + 1}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                {/* Color circle as coin icon */}
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: `hsl(${(i * 37) % 360}, 50%, 55%)`,
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {coin.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {coin.symbol}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: up ? 'var(--color-positive)' : 'var(--color-negative)',
                  textAlign: 'right',
                }}
              >
                {up ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-dim)',
          }}
        >
          Updated 2m ago
        </span>
      </div>
    </div>
  )
}
