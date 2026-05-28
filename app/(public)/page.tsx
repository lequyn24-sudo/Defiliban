import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/articles/HeroSection'
import { ResearchCoverageSection } from '@/components/sections/ResearchCoverageSection'
import { CategoryNewsSection } from '@/components/sections/CategoryNewsSection'
import { MOCK_ARTICLES, getLatestArticles, toPreview } from '@/lib/mock/articles'
import { MOCK_PRICES } from '@/lib/mock/prices'
import { timeAgo } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'
import type { CoinPrice } from '@/lib/types'

export default function HomePage() {
  const allPreviews = MOCK_ARTICLES.map(toPreview)
  const featured = allPreviews.find((a) => a.isFeatured && a.tier1 === 'protocols') ?? allPreviews[0]
  const latest = getLatestArticles(8).map(toPreview)
  const mostRead = latest.slice(3, 8)

  const protocolArticles  = allPreviews.filter((a) => a.tier1 === 'protocols').slice(0, 3)
  const yieldArticles     = allPreviews.filter((a) => a.tier1 === 'yield').slice(0, 3)
  const liquidityArticles = allPreviews.filter((a) => a.tier1 === 'liquidity').slice(0, 3)
  const riskArticles      = allPreviews.filter((a) => a.tier1 === 'risk').slice(0, 3)

  const sponsoredArticles = allPreviews
    .filter((a) => a.isSponsor || a.tier1 === 'sponsored-articles')
    .concat(allPreviews.filter((a) => a.tier1 === 'protocols').slice(0, 3))
    .slice(0, 4)

  const pressReleaseArticles = allPreviews
    .filter((a) => a.tier1 === 'press-release')
    .concat(allPreviews.filter((a) => a.tier1 === 'infrastructure').slice(0, 4))
    .slice(0, 5)

  return (
    <div>
      {/* ── Hero: Latest Insights | Featured Spotlight | Most Read ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <HeroSection featured={featured} latest={latest} mostRead={mostRead} />
      </div>

      {/* ── Market Overview Strip ── */}
      <MarketOverviewStrip prices={MOCK_PRICES} />

      {/* ── Category News Sections ── */}
      <div style={{ background: 'var(--bg-page)' }}>
        <CategoryNewsSection
          eyebrow="PROTOCOLS"
          title="Protocol Deep-Dives"
          slug="protocols"
          articles={protocolArticles}
        />
        <CategoryNewsSection
          eyebrow="YIELD"
          title="Yield & Returns"
          slug="yield"
          articles={yieldArticles}
        />
        <CategoryNewsSection
          eyebrow="LIQUIDITY"
          title="Liquidity Architecture"
          slug="liquidity"
          articles={liquidityArticles}
        />
        <CategoryNewsSection
          eyebrow="RISK"
          title="Risk & Exploits"
          slug="risk"
          articles={riskArticles}
        />
      </div>

      {/* ── Research Framework (compact strip) ── */}
      <ResearchFrameworkSection />

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── Research Coverage ── */}
      <ResearchCoverageSection />

      {/* ── Commercial Content: Sponsored + Press Release + Transparency ── */}
      <CommercialSection
        sponsored={sponsoredArticles}
        pressRelease={pressReleaseArticles}
      />
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Market Overview Strip                      */
/* ─────────────────────────────────────────── */
function MarketOverviewStrip({ prices }: { prices: CoinPrice[] }) {
  const top6 = [...prices].sort((a, b) => b.market_cap - a.market_cap).slice(0, 6)

  function fmt(price: number) {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    if (price >= 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(4)}`
  }

  return (
    <div
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'var(--sp-3) var(--sp-4)',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--sp-3)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-dim)',
            }}
          >
            Market Overview
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
            View full market data →
          </Link>
        </div>

        {/* 6-coin grid */}
        <div
          className="grid grid-cols-3 lg:grid-cols-6"
          style={{ gap: '1px', background: 'var(--border)' }}
        >
          {top6.map((coin) => {
            const up = coin.price_change_percentage_24h >= 0
            return (
              <div
                key={coin.id}
                style={{
                  background: 'var(--bg-void)',
                  padding: 'var(--sp-2) var(--sp-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-2)',
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative',
                    background: 'var(--bg-surface)',
                  }}
                >
                  {coin.imageUrl ? (
                    <Image
                      src={coin.imageUrl}
                      alt={coin.name}
                      fill
                      sizes="24px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : null}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {coin.symbol}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: up ? 'var(--color-positive)' : 'var(--color-negative)',
                        fontWeight: 500,
                      }}
                    >
                      {up ? '+' : ''}{coin.price_change_percentage_24h.toFixed(1)}%
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fmt(coin.current_price)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Trust Bar                                  */
/* ─────────────────────────────────────────── */
function TrustBar() {
  const items = [
    {
      icon: '◈',
      title: 'All research is data-backed',
      body: 'We combine onchain data, market metrics, and protocol analysis.',
    },
    {
      icon: '◫',
      title: 'Transparent methodology',
      body: 'Every insight includes sources, assumptions, and limitations.',
    },
    {
      icon: '◉',
      title: 'Built for professionals',
      body: 'Actionable intelligence for allocators, researchers, and builders.',
    },
    {
      icon: null,
      title: '155,842',
      body: 'Researchers trust Defiliban',
      large: true,
    },
  ]

  return (
    <div
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: '1280px', margin: '0 auto' }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{
              padding: 'var(--sp-6)',
              borderRight: i < items.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--sp-3)',
            }}
          >
            {item.icon && (
              <span
                style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}
              >
                {item.icon}
              </span>
            )}
            <div>
              {item.large ? (
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '28px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.3px',
                    marginBottom: 'var(--sp-1)',
                  }}
                >
                  {item.title}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--sp-1)',
                    letterSpacing: '0.2px',
                  }}
                >
                  {item.title}
                </p>
              )}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.55,
                }}
              >
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Research Framework — compact 3-col strip   */
/* ─────────────────────────────────────────── */
function ResearchFrameworkSection() {
  const topics = ['Protocol structure', 'Yield systems', 'Liquidity architecture', 'Risk surfaces']

  const confidenceLevels = [
    { range: '80–100', label: 'High', color: 'var(--color-positive)' },
    { range: '60–79',  label: 'Moderate', color: '#E8C84A' },
    { range: '40–59',  label: 'Low', color: '#E8A04A' },
    { range: '0–39',   label: 'Very low', color: 'var(--color-negative)' },
  ]

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-page)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          gap: '1px',
          background: 'var(--border)',
        }}
        className="grid grid-cols-1 lg:grid-cols-3"
      >
        {/* Col 1: Research Framework */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-dim)',
              marginBottom: 'var(--sp-2)',
            }}
          >
            Research Framework
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: 'var(--sp-4)',
            }}
          >
            How We Break Down DeFi
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            {topics.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  padding: 'var(--sp-1) var(--sp-2)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            href="/protocols"
            style={{
              display: 'inline-block',
              marginTop: 'var(--sp-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-dim)',
              textDecoration: 'none',
            }}
          >
            Explore framework →
          </Link>
        </div>

        {/* Col 2: Why Defiliban */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-dim)',
              marginBottom: '6px',
            }}
          >
            Why Defiliban
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: 'var(--sp-3)',
            }}
          >
            Why this site feels different
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.6,
              marginBottom: 'var(--sp-3)',
            }}
          >
            Built to explain how DeFi systems are designed, where they fail, and what actually matters — not a generic crypto feed, not a broad market portal.
          </p>
          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-dim)',
              textDecoration: 'none',
            }}
          >
            Our methodology →
          </Link>
        </div>

        {/* Col 3: Confidence Scale */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-dim)',
              marginBottom: '6px',
            }}
          >
            How We Rate Our Research
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: 'var(--sp-4)',
            }}
          >
            Confidence scale
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {confidenceLevels.map((lvl) => (
              <div key={lvl.range} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: lvl.color,
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-dim)',
                    minWidth: '52px',
                  }}
                >
                  {lvl.range}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {lvl.label}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            style={{
              display: 'inline-block',
              marginTop: 'var(--sp-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-dim)',
              textDecoration: 'none',
            }}
          >
            Learn methodology →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────── */
/*  Commercial Section                         */
/* ─────────────────────────────────────────── */
function CommercialSection({ sponsored, pressRelease }: { sponsored: ArticlePreview[]; pressRelease: ArticlePreview[] }) {
  const featuredSponsored = sponsored[0]
  const restSponsored = sponsored.slice(1)

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-page)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          gap: '1px',
          background: 'var(--border)',
        }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px]"
      >
        {/* ── Sponsored Articles ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-8) var(--sp-6)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: '6px',
            }}
          >
            Commercial Content
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 'var(--sp-5)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              Sponsored Articles
            </h2>
            <Link
              href="/sponsored-articles"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', textDecoration: 'none' }}
            >
              View all →
            </Link>
          </div>

          {/* Featured sponsored article */}
          {featuredSponsored && (
            <Link
              href={`/article/${featuredSponsored.slug}`}
              style={{ textDecoration: 'none', display: 'block', marginBottom: '1px' }}
            >
              <div style={{ background: 'var(--bg-page)' }} className="row-hover">
                <div
                  style={{
                    position: 'relative',
                    height: '180px',
                    background: 'var(--bg-surface)',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={featuredSponsored.coverImage}
                    alt={featuredSponsored.title}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.8 }}
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(26,26,24,0.7) 0%, transparent 60%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      background: 'var(--text-primary)',
                      color: 'var(--bg-void)',
                      padding: 'var(--sp-1) var(--sp-2)',
                      borderRadius: '2px',
                      fontWeight: 500,
                    }}
                  >
                    Sponsored
                  </span>
                </div>
                <div style={{ padding: 'var(--sp-4) var(--sp-3) var(--sp-4)' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                      marginBottom: 'var(--sp-2)',
                    }}
                  >
                    {featuredSponsored.title.replace('[Sponsored] ', '')}
                  </h3>
                  <p
                    className="line-clamp-2"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      color: 'var(--text-dim)',
                      lineHeight: 1.55,
                      marginBottom: 'var(--sp-3)',
                    }}
                  >
                    {featuredSponsored.excerpt}
                  </p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
                    Read Full Article →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Smaller sponsored articles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {restSponsored.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--sp-3)',
                    padding: 'var(--sp-3)',
                    background: 'var(--bg-page)',
                    alignItems: 'center',
                  }}
                  className="row-hover"
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '64px',
                      height: '48px',
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
                      sizes="64px"
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        color: 'var(--text-dim)',
                        display: 'block',
                        marginBottom: 'var(--sp-1)',
                      }}
                    >
                      Sponsored
                    </span>
                    <p
                      className="line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title.replace('[Sponsored] ', '')}
                    </p>
                  </div>
                  <span style={{ color: 'var(--text-dim)', flexShrink: 0, fontSize: '16px' }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Press Release ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-8) var(--sp-6)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 'var(--sp-5)',
              marginTop: '15px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              Press Release
            </h2>
            <Link
              href="/press-release"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', textDecoration: 'none' }}
            >
              View all →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {pressRelease.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--sp-3)',
                    padding: 'var(--sp-3)',
                    background: 'var(--bg-page)',
                    alignItems: 'flex-start',
                  }}
                  className="row-hover"
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '84px',
                      height: '64px',
                      flexShrink: 0,
                      background: 'var(--bg-surface)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover', opacity: 0.75 }}
                      sizes="84px"
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        color: 'var(--text-dim)',
                        display: 'block',
                        marginBottom: 'var(--sp-1)',
                      }}
                    >
                      Press Release
                    </span>
                    <p
                      className="line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        marginBottom: 'var(--sp-2)',
                      }}
                    >
                      {article.title}
                    </p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
                      {timeAgo(article.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Trust & Transparency ── */}
        <div style={{ background: 'var(--bg-void)', padding: 'var(--sp-8) var(--sp-6)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: 'var(--sp-5)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Trust & Transparency
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {[
              { icon: '◉', label: 'Editorial independence', desc: 'We do not accept payment for editorial coverage.' },
              { icon: '◈', label: 'Source transparency', desc: 'All data sources are cited in every research piece.' },
              { icon: '◫', label: 'Last updated', desc: 'All timestamps reflect real update time.' },
              { icon: '◌', label: 'Have feedback?', desc: 'Help us improve →', isLink: true },
            ].map(({ icon, label, desc, isLink }) => (
              <div key={label} style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--text-dim)',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  {icon}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--sp-1)',
                    }}
                  >
                    {label}
                  </p>
                  {isLink ? (
                    <Link
                      href="/about"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', textDecoration: 'none' }}
                    >
                      {desc}
                    </Link>
                  ) : (
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        color: 'var(--text-dim)',
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
