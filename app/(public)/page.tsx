import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/articles/HeroSection'
import { ResearchCoverageSection } from '@/components/sections/ResearchCoverageSection'
import { MOCK_ARTICLES, getLatestArticles, toPreview } from '@/lib/mock/articles'
import { MOCK_PRICES } from '@/lib/mock/prices'
import { timeAgo } from '@/lib/utils/format'
import type { ArticlePreview } from '@/lib/types'
import type { CoinPrice } from '@/lib/types'

export default function HomePage() {
  const allPreviews = MOCK_ARTICLES.map(toPreview)
  const featured = allPreviews.find((a) => a.isFeatured && a.tier1 === 'protocols') ?? allPreviews[0]
  const latest = getLatestArticles(8).map(toPreview)

  const sponsoredArticles = allPreviews
    .filter((a) => a.isSponsor || a.tier1 === 'sponsored-articles')
    .concat(allPreviews.filter((a) => a.tier1 === 'protocols').slice(0, 6))
    .slice(0, 6)

  const pressReleaseArticles = allPreviews
    .filter((a) => a.tier1 === 'press-release')
    .concat(allPreviews.filter((a) => a.tier1 === 'infrastructure').slice(0, 6))
    .slice(0, 6)

  return (
    <div>
      {/* ── Hero: Research Spotlight | Latest Insights | Market Leaders ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <HeroSection featured={featured} latest={latest} prices={MOCK_PRICES} />
      </div>

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── Research Coverage ── */}
      <ResearchCoverageSection />

      {/* ── Research Framework: cluster cards | why defiliban | confidence scale ── */}
      <ResearchFrameworkSection />

      {/* ── Commercial Content: Sponsored + Press Release + Transparency ── */}
      <CommercialSection
        sponsored={sponsoredArticles}
        pressRelease={pressReleaseArticles}
      />
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
/*  Research Framework — 3-col with cluster    */
/* ─────────────────────────────────────────── */
function ResearchFrameworkSection() {
  const clusters = [
    { slug: 'protocol-structure', label: 'Protocol structure', desc: 'How products are built, governed, and economically aligned.', img: 'proto01', href: '/protocols' },
    { slug: 'yield-systems',      label: 'Yield systems',      desc: 'Where yield comes from and who ultimately carries the cost.', img: 'yield01', href: '/yield' },
    { slug: 'liquidity-arch',     label: 'Liquidity architecture', desc: 'How usable liquidity behaves when capital conditions change.', img: 'liq01', href: '/liquidity' },
    { slug: 'risk-surfaces',      label: 'Risk surfaces',      desc: 'Where governance, contracts, and incentives can fall first.', img: 'risk01', href: '/risk' },
  ]

  const whyPoints = [
    'Not a generic crypto feed.',
    'Not a broad market portal chasing every narrative equally.',
    'Built to explain how DeFi systems are designed, where they fail, and what actually matters beneath the surface.',
    'Research first. Structure second. Headlines last.',
  ]

  const confidenceLevels = [
    { range: '80 – 100', label: 'High confidence',      desc: 'Strong data & clear signal',      color: 'var(--color-positive)' },
    { range: '60 – 79',  label: 'Moderate confidence',  desc: 'Good data, some uncertainty',     color: '#E8C84A' },
    { range: '40 – 59',  label: 'Low confidence',       desc: 'Limited data or mixed signals',   color: '#E8A04A' },
    { range: '0 – 39',   label: 'Very low confidence',  desc: 'Speculative / early signal',      color: 'var(--color-negative)' },
  ]

  return (
    <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-page)' }}>
      <div
        style={{ maxWidth: '1280px', margin: '0 auto', gap: '1px', background: 'var(--border)' }}
        className="grid grid-cols-1 lg:grid-cols-3"
      >
        {/* ── Col 1: Cluster cards ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-dim)' }}>
              Research Framework
            </p>
            <Link href="/protocols" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Explore framework →
            </Link>
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-5)', letterSpacing: '-0.2px' }}>
            How We Break Down DeFi
          </h2>
          <div className="grid grid-cols-2" style={{ gap: 'var(--sp-3)', gridAutoRows: '1fr' }}>
            {clusters.map((c) => (
              <Link key={c.slug} href={c.href} style={{ textDecoration: 'none', display: 'flex' }}>
                <div style={{ background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%' }} className="card-hover">
                  <div style={{ position: 'relative', height: '72px', background: 'var(--bg-surface)', flexShrink: 0 }}>
                    <Image
                      src={`https://picsum.photos/seed/${c.img}/200/100`}
                      alt={c.label}
                      fill
                      style={{ objectFit: 'cover', opacity: 0.6 }}
                      sizes="160px"
                    />
                  </div>
                  <div style={{ padding: 'var(--sp-3)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-1)', lineHeight: 1.3 }}>
                      {c.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 'var(--sp-2)', flex: 1 }}>
                      {c.desc}
                    </p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>Explore cluster →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Col 2: Why Defiliban ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-dim)', marginBottom: 'var(--sp-2)' }}>
            Why Defiliban
          </p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-5)', letterSpacing: '-0.2px' }}>
            Why this site feels different
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
            {whyPoints.map((pt) => (
              <div key={pt} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid var(--color-positive)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-positive)', display: 'block' }} />
                </span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.6 }}>{pt}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', padding: 'var(--sp-4)' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-2)' }}>Methodology transparency</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.55, marginBottom: 'var(--sp-3)' }}>
              Every research piece includes our methodology, data sources, assumptions, and limitations.
            </p>
            <Link href="/about" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none' }}>
              View methodology →
            </Link>
          </div>
        </div>

        {/* ── Col 3: Confidence Scale ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-dim)', marginBottom: 'var(--sp-2)' }}>
            Confidence Scale
          </p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-5)', letterSpacing: '-0.2px' }}>
            How we rate our research
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
            {confidenceLevels.map((lvl) => (
              <div key={lvl.range} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: lvl.color, flexShrink: 0, marginTop: '3px', display: 'block' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-2)', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', minWidth: '52px' }}>{lvl.range}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{lvl.label}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-dim)' }}>{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/about" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none' }}>
            Learn more about our confidence methodology →
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
  return (
    <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-page)' }}>
      <div
        style={{ maxWidth: '1280px', margin: '0 auto', gap: '1px', background: 'var(--border)' }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px]"
      >
        {/* ── Sponsored Articles ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: 'var(--sp-1)' }}>
                Commercial Content
              </p>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Sponsored Articles
              </h2>
            </div>
            <Link href="/sponsored-articles" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View all →
            </Link>
          </div>
          <CommercialList articles={sponsored} label="Sponsored" />
        </div>

        {/* ── Press Release ── */}
        <div style={{ background: 'var(--bg-page)', padding: 'var(--sp-6)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: 'var(--sp-1)' }}>
                Official Announcements
              </p>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Press Release
              </h2>
            </div>
            <Link href="/press-release" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View all →
            </Link>
          </div>
          <CommercialList articles={pressRelease} label="Press Release" />
        </div>

        {/* ── Trust & Transparency ── */}
        <div style={{ background: 'var(--bg-void)', padding: 'var(--sp-6)' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-4)', letterSpacing: '-0.1px' }}>
            Trust & Transparency
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { icon: '◉', label: 'Editorial independence', desc: 'We do not accept payment for editorial coverage.' },
              { icon: '◈', label: 'Source transparency', desc: 'All data sources are cited in every research piece.' },
              { icon: '◫', label: 'Last updated', desc: 'All timestamps reflect real update time.' },
              { icon: '◌', label: 'AI-generated content', desc: 'All articles are AI-written from primary sources and reviewed editorially.' },
              { icon: '⬡', label: 'No affiliate links', desc: 'We do not use affiliate or referral links in research.' },
              { icon: '○', label: 'Have feedback?', desc: 'Help us improve →', isLink: true },
            ].map(({ icon, label, desc, isLink }) => (
              <div key={label} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start', padding: 'var(--sp-4) var(--sp-3)', background: 'var(--bg-void)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-dim)', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</p>
                  {isLink ? (
                    <Link href="/about" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'none' }}>{desc}</Link>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>{desc}</p>
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

/* Shared compact article row — used by Sponsored + Press Release */
function CommercialList({ articles, label }: { articles: ArticlePreview[]; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
      {articles.map((article) => (
        <Link key={article.slug} href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', padding: 'var(--sp-3)', background: 'var(--bg-page)', alignItems: 'center' }} className="row-hover">
            <div style={{ position: 'relative', width: '72px', height: '54px', flexShrink: 0, background: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
              <Image src={article.coverImage} alt={article.title} fill style={{ objectFit: 'cover', opacity: 0.8 }} sizes="72px" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                {label}
              </span>
              <p className="line-clamp-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {article.title.replace('[Sponsored] ', '')}
              </p>
            </div>
            <span style={{ color: 'var(--text-dim)', flexShrink: 0, fontSize: '14px' }}>›</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
