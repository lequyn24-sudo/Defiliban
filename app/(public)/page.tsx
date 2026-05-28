import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/articles/HeroSection'
import { ResearchCoverageSection } from '@/components/sections/ResearchCoverageSection'
import { MOCK_ARTICLES, getLatestArticles, toPreview } from '@/lib/mock/articles'
import { MOCK_PRICES } from '@/lib/mock/prices'
import { timeAgo } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'

export default function HomePage() {
  const allPreviews = MOCK_ARTICLES.map(toPreview)
  const featured = allPreviews.find((a) => a.isFeatured && a.tier1 === 'protocols') ?? allPreviews[0]
  const latest = getLatestArticles(6).map(toPreview)

  // Sponsored content — real + supplemented
  const sponsoredArticles = allPreviews
    .filter((a) => a.isSponsor || a.tier1 === 'sponsored-articles')
    .concat(allPreviews.filter((a) => a.tier1 === 'protocols').slice(0, 3))
    .slice(0, 4)

  // Press release content
  const pressReleaseArticles = allPreviews
    .filter((a) => a.tier1 === 'press-release')
    .concat(allPreviews.filter((a) => a.tier1 === 'infrastructure').slice(0, 4))
    .slice(0, 5)

  return (
    <div>
      {/* ── Hero: Research Spotlight / Latest Insights / Market Leaders ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <HeroSection featured={featured} latest={latest} prices={MOCK_PRICES} />
      </div>

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── Research Coverage ── */}
      <ResearchCoverageSection />

      {/* ── Research Framework / Why Defiliban / Confidence Scale ── */}
      <ResearchFrameworkSection />

      {/* ── Commercial Content: Sponsored + Press Release + Transparency ── */}
      <CommercialSection
        sponsored={sponsoredArticles}
        pressRelease={pressReleaseArticles}
      />
    </div>
  )
}

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
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{
              padding: '22px 24px',
              borderRight: i < items.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            {item.icon && (
              <span
                style={{
                  fontSize: '18px',
                  color: 'var(--text-dim)',
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: '2px',
                }}
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
                    marginBottom: '4px',
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
                    marginBottom: '5px',
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

function ResearchFrameworkSection() {
  const clusters = [
    {
      title: 'Protocol structure',
      desc: 'How products are built, governed, and economically aligned.',
      href: '/protocols',
    },
    {
      title: 'Yield systems',
      desc: 'Where yield comes from and who ultimately carries the cost.',
      href: '/yield',
    },
    {
      title: 'Liquidity architecture',
      desc: 'How usable liquidity behaves when capital conditions change.',
      href: '/liquidity',
    },
    {
      title: 'Risk surfaces',
      desc: 'Where governance, contracts, and incentives can fall first.',
      href: '/risk',
    },
  ]

  const confidenceLevels = [
    { range: '80 – 100', label: 'High confidence', note: 'Strong data & clear signal', color: 'var(--color-positive)' },
    { range: '60 – 79', label: 'Moderate confidence', note: 'Good data, some uncertainty', color: '#E8C84A' },
    { range: '40 – 59', label: 'Low confidence', note: 'Limited data or mixed signals', color: '#E8A04A' },
    { range: '0 – 39', label: 'Very low confidence', note: 'Speculative / early signal', color: 'var(--color-negative)' },
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
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1px',
          background: 'var(--border)',
        }}
        className="lg:grid-cols-3"
      >
        {/* Col 1: Research Framework */}
        <div style={{ background: 'var(--bg-page)', padding: '40px 32px' }}>
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
            Research Framework
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '4px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              How We Break Down DeFi
            </h2>
            <Link
              href="/protocols"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
              }}
            >
              Explore framework →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clusters.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    padding: '14px',
                    cursor: 'pointer',
                  }}
                  className="cluster-card"
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '5px',
                    }}
                  >
                    {c.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      color: 'var(--text-dim)',
                      lineHeight: 1.5,
                      marginBottom: '8px',
                    }}
                  >
                    {c.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                    }}
                  >
                    Explore cluster →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2: Why Defiliban */}
        <div style={{ background: 'var(--bg-page)', padding: '40px 32px' }}>
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
              fontSize: '24px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            Why this site feels different
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {[
              { icon: '✗', text: 'Not a generic crypto feed.' },
              { icon: '✗', text: 'Not a broad market portal chasing every narrative equally.' },
              { icon: '✓', text: 'Built to explain how DeFi systems are designed, where they fail, and what actually matters beneath the surface.' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: icon === '✓' ? 'var(--color-positive)' : 'var(--text-dim)',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {icon}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                    lineHeight: 1.55,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
          {/* Methodology card */}
          <div
            style={{
              padding: '18px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              background: 'var(--bg-surface2)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              Methodology transparency
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                color: 'var(--text-dim)',
                lineHeight: 1.55,
                marginBottom: '12px',
              }}
            >
              Every research piece includes our methodology, data sources, assumptions, and limitations.
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
              View methodology →
            </Link>
          </div>
        </div>

        {/* Col 3: Confidence Scale */}
        <div style={{ background: 'var(--bg-page)', padding: '40px 32px' }}>
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
              fontSize: '24px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            How we rate our research
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {confidenceLevels.map((lvl) => (
              <div
                key={lvl.range}
                style={{
                  padding: '12px 14px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  borderLeft: `3px solid ${lvl.color}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '3px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: lvl.color,
                    }}
                  >
                    {lvl.range}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {lvl.label}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-dim)',
                  }}
                >
                  {lvl.note}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-dim)',
              textDecoration: 'none',
            }}
          >
            Learn more about our confidence methodology →
          </Link>
        </div>
      </div>
    </section>
  )
}

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
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1px',
          background: 'var(--border)',
        }}
        className="lg:grid-cols-[1fr_1fr_300px]"
      >
        {/* ── Sponsored Articles ── */}
        <div style={{ background: 'var(--bg-page)', padding: '32px 24px' }}>
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
              marginBottom: '20px',
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
                      padding: '3px 8px',
                      borderRadius: '2px',
                      fontWeight: 500,
                    }}
                  >
                    Sponsored
                  </span>
                </div>
                <div style={{ padding: '16px 14px 18px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                      marginBottom: '8px',
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
                      marginBottom: '12px',
                    }}
                  >
                    {featuredSponsored.excerpt}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                    }}
                  >
                    Read Full Article →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Smaller sponsored articles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {restSponsored.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '14px',
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
                        marginBottom: '4px',
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

        {/* ── Press Release — card format with thumbnails ── */}
        <div style={{ background: 'var(--bg-page)', padding: '32px 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '20px',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {pressRelease.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    background: 'var(--bg-page)',
                    alignItems: 'flex-start',
                  }}
                  className="row-hover"
                >
                  {/* Thumbnail */}
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
                        marginBottom: '5px',
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
                        marginBottom: '6px',
                      }}
                    >
                      {article.title}
                    </p>
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
              </Link>
            ))}
          </div>
        </div>

        {/* ── Trust & Transparency ── */}
        <div style={{ background: 'var(--bg-void)', padding: '32px 24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Trust & Transparency
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { icon: '◉', label: 'Editorial independence', desc: 'We do not accept payment for editorial coverage.' },
              { icon: '◈', label: 'Source transparency', desc: 'All data sources are cited in every research piece.' },
              { icon: '◫', label: 'Last updated', desc: 'All timestamps reflect real update time.' },
              { icon: '◌', label: 'Have feedback?', desc: 'Help us improve →', isLink: true },
            ].map(({ icon, label, desc, isLink }) => (
              <div key={label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
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
                      marginBottom: '3px',
                    }}
                  >
                    {label}
                  </p>
                  {isLink ? (
                    <Link
                      href="/about"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-dim)',
                        textDecoration: 'none',
                      }}
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
