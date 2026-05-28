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
      style={{ gap: '1px', background: 'var(--border)' }}
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_280px]"
    >
      {/* ── Left: Research Spotlight ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <ResearchSpotlight article={featured} />
      </div>

      {/* ── Middle: Latest Insights (3 articles, fill height) ── */}
      <div style={{ background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
        <LatestInsights articles={latest.slice(0, 3)} />
      </div>

      {/* ── Right: Market Leaders ── */}
      <div style={{ background: 'var(--bg-page)' }}>
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
  const confidenceLabel = 'High'
  const confidenceColor = 'var(--color-positive)'

  return (
    /* CSS Grid: text col (1fr) + image col (fixed) — reliable height for fill */
    <div
      style={{ height: '100%', minHeight: '360px' }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_260px]"
    >
      {/* Text content */}
      <div style={{ padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>

        {/* Badge */}
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '1px',
            color: 'var(--color-positive)', border: '1px solid var(--color-positive)',
            borderRadius: '2px', padding: '2px 8px',
          }}>
            Research Spotlight
          </span>
        </div>

        {/* Headline */}
        <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
          <h2
            className="line-clamp-5"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '26px', fontWeight: 800,
              letterSpacing: '-0.5px', color: 'var(--text-primary)', lineHeight: 1.15,
            }}
          >
            {article.title}
          </h2>
        </Link>

        {/* Confidence + metadata */}
        <div style={{
          display: 'flex', gap: 'var(--sp-5)', flexWrap: 'wrap',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          padding: 'var(--sp-3) 0',
        }}>
          {/* Confidence */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: '3px' }}>Confidence</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1 }}>{confidence}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>/100</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: confidenceColor, fontWeight: 500 }}>{confidenceLabel}</span>
          </div>
          {/* Data Sources */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: '3px' }}>Data Sources</p>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '2px' }}>
              {['Onchain', 'Market', 'Model'].map((src) => (
                <span key={src} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-dim)',
                  border: '1px solid var(--border)', borderRadius: '2px', padding: '2px 5px',
                }}>{src}</span>
              ))}
            </div>
          </div>
          {/* Last Updated */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: '3px' }}>Last Updated</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>

        {/* Why it matters */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-2)' }}>
            Why it matters:
          </p>
          <p className="line-clamp-3" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.65 }}>
            {article.excerpt}
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/article/${article.slug}`}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.5px',
              background: 'var(--color-positive)', color: '#1A1A18',
              padding: 'var(--sp-2) var(--sp-5)', borderRadius: '20px',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
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

      {/* Image column — CSS Grid gives explicit height so fill works */}
      <div
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-surface)' }}
        className="hidden lg:block"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          style={{ objectFit: 'cover', opacity: 0.8 }}
          sizes="260px"
          priority
        />
        {/* Left-to-right fade so text bleeds in cleanly */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-page) 0%, transparent 20%)' }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Latest Insights — 3 articles, fill height  */
/* ─────────────────────────────────────────── */
function LatestInsights({ articles }: { articles: ArticlePreview[] }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'var(--sp-3) var(--sp-4)',
        borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)' }}>
          Latest Insights
        </span>
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none' }}>
          View all →
        </Link>
      </div>

      {/* 3 articles — each fills 1/3 height */}
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
                padding: 'var(--sp-4)',
                borderBottom: i < articles.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              className="row-hover"
            >
              <h3
                className="line-clamp-3"
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700,
                  color: 'var(--text-primary)', lineHeight: 1.4,
                  marginBottom: 'var(--sp-2)',
                }}
              >
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
  const top10 = [...prices].sort((a, b) => b.market_cap - a.market_cap).slice(0, 10)

  function fmt7d(val: number) {
    const s = (val >= 0 ? '+' : '') + val.toFixed(2) + '%'
    return { text: s, up: val >= 0 }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'var(--sp-3) var(--sp-4)',
        borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)' }}>
          Market Leaders
        </span>
        <Link href="/cmc" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none' }}>
          View all →
        </Link>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '24px 1fr 56px 20px',
        padding: 'var(--sp-1) var(--sp-4)', borderBottom: '1px solid var(--border)', gap: 'var(--sp-2)',
      }}>
        {['#', 'ASSET', '7D %', ''].map((h) => (
          <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-dim)', textAlign: h === '7D %' ? 'right' : 'left' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Coin rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {top10.map((coin, i) => {
          const mock7d = coin.price_change_percentage_24h * 3.5
          const { text, up } = fmt7d(mock7d)
          return (
            <Link key={coin.id} href="/cmc" style={{ textDecoration: 'none', display: 'block' }}>
              <div
                className="row-hover"
                style={{
                  display: 'grid', gridTemplateColumns: '24px 1fr 56px 20px',
                  padding: 'var(--sp-2) var(--sp-4)',
                  borderBottom: i < top10.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'center', gap: 'var(--sp-2)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>{i + 1}</span>
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

      {/* Footer */}
      <div style={{ padding: 'var(--sp-2) var(--sp-4)', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>Updated 2m ago</span>
      </div>
    </div>
  )
}
