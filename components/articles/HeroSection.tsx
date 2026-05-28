'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { timeAgo } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'
import type { CoinPrice } from '@/lib/types'

interface Props {
  featured: ArticlePreview
  latest: ArticlePreview[]
  prices: CoinPrice[]
}

export function HeroSection({ featured, latest, prices }: Props) {
  return (
    <div
      style={{ gap: 'var(--sp-4)', padding: 'var(--sp-4) 0' }}
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(260px,2fr)_260px]"
    >
      {/* ── Research Spotlight ── */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface2)', height: '100%' }}>
        <ResearchSpotlight article={featured} />
      </div>

      {/* ── Latest Insights ── */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface2)', display: 'flex', flexDirection: 'column' }}>
        <LatestInsights articles={latest.slice(0, 3)} />
      </div>

      {/* ── Market Leaders ── */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface2)' }}>
        <MarketLeaders prices={prices} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Research Spotlight                          */
/* ─────────────────────────────────────────── */
function ResearchSpotlight({ article }: { article: ArticlePreview }) {
  const confidence = 82
  const confidenceColor = 'var(--color-positive)'
  // Landscape image — same seed as article coverImage, displayed at top of card
  const landscapeSrc = article.coverImage  // already 800×450 (16:9)

  return (
    /* Flex-col: image on top → text below */
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Thumbnail — landscape, full width */}
      <div style={{ position: 'relative', height: '120px', flexShrink: 0, background: 'var(--bg-surface)', overflow: 'hidden' }}>
        <Image
          src={landscapeSrc}
          alt={article.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 1024px) 100vw, 700px"
          priority
        />
      </div>
      {/* Text content — flex:1 fills remaining height */}
      <div style={{ flex: 1, padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', overflow: 'hidden' }}
      >
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '1px',
            background: 'var(--color-positive)', color: '#1A1A18',
            borderRadius: '2px', padding: '2px 8px',
          }}>
            Research Spotlight
          </span>
        </div>

        <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
          <h2 className="line-clamp-3" style={{
            fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 800,
            letterSpacing: '-0.3px', color: 'var(--text-primary)', lineHeight: 1.25,
          }}>
            {article.title}
          </h2>
        </Link>

        {/* Compact meta: confidence + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: confidenceColor }}>
            {confidence}/100 High
          </span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>
            {timeAgo(article.publishedAt)}
          </span>
        </div>

        {/* Excerpt */}
        <p className="line-clamp-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.6, flex: 1 }}>
          {article.excerpt}
        </p>

        <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', flexWrap: 'wrap', marginTop: 'auto' }}>
          <Link href={`/article/${article.slug}`} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.5px',
            background: 'var(--color-positive)', color: '#1A1A18',
            padding: 'var(--sp-2) var(--sp-5)', borderRadius: '20px',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Read Full Research →
          </Link>
          <button style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.5px',
            background: 'transparent', color: 'var(--text-dim)',
            padding: 'var(--sp-2) var(--sp-4)', borderRadius: '20px',
            border: '1px solid var(--border)', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            Save
          </button>
        </div>
      </div>

    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Latest Insights — 3 articles + subtext    */
/* ─────────────────────────────────────────── */
function LatestInsights({ articles }: { articles: ArticlePreview[] }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header — title only, no subtext */}
      <div style={{
        padding: 'var(--sp-3) var(--sp-4)',
        borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)' }}>
          Latest Insights
        </span>
      </div>

      {/* 3 articles — title + meta only, equal height rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            style={{ textDecoration: 'none', flex: 1, display: 'flex' }}
          >
            <div
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 'var(--sp-3) var(--sp-4)',
                borderBottom: i < articles.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              className="row-hover"
            >
              <h3 className="line-clamp-2" style={{
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700,
                color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 'var(--sp-2)',
              }}>
                {article.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-2)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                  {timeAgo(article.publishedAt)}
                </span>
                <CategoryBadge category={article.category} isBreaking={article.isBreaking} isSponsor={article.isSponsor} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Market Leaders                              */
/* ─────────────────────────────────────────── */
function MarketLeaders({ prices }: { prices: CoinPrice[] }) {
  const top10 = [...prices].sort((a, b) => b.market_cap - a.market_cap).slice(0, 5)

  function fmt7d(val: number) {
    return { text: (val >= 0 ? '+' : '') + val.toFixed(2) + '%', up: val >= 0 }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
          Market Leaders
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-dim)' }}>
            Top assets by market cap
          </span>
          <Link href="/cmc" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '20px 1fr 52px 16px',
        padding: 'var(--sp-1) var(--sp-3)', borderBottom: '1px solid var(--border)', gap: 'var(--sp-2)',
      }}>
        {['#', 'ASSET', '7D %', ''].map((h) => (
          <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-dim)', textAlign: h === '7D %' ? 'right' : 'left' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1 }}>
        {top10.map((coin, i) => {
          const mock7d = coin.price_change_percentage_24h * 3.5
          const { text, up } = fmt7d(mock7d)
          return (
            <Link key={coin.id} href="/cmc" style={{ textDecoration: 'none', display: 'block' }}>
              <div className="row-hover" style={{
                display: 'grid', gridTemplateColumns: '20px 1fr 52px 16px',
                padding: 'var(--sp-2) var(--sp-3)',
                borderBottom: i < top10.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'center', gap: 'var(--sp-2)',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)' }}>{i + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', minWidth: 0 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'var(--bg-surface)' }}>
                    {coin.imageUrl && <Image src={coin.imageUrl} alt={coin.name} fill sizes="20px" style={{ objectFit: 'cover' }} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {coin.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>({coin.symbol})</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: up ? 'var(--color-positive)' : 'var(--color-negative)', textAlign: 'right', display: 'block' }}>
                  {text}
                </span>
                <Star size={10} style={{ color: 'var(--text-dim)', opacity: 0.5 }} />
              </div>
            </Link>
          )
        })}
      </div>

      <div style={{ padding: 'var(--sp-2) var(--sp-3)', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>Updated 2m ago</span>
      </div>
    </div>
  )
}
