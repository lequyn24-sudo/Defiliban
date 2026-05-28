import Link from 'next/link'
import Image from 'next/image'

interface SignalCard {
  signal: number
  title: string
  description: string
  tags: string[]
  imageId: string
}

const SIGNAL_CARDS: SignalCard[] = [
  {
    signal: 75,
    title: 'DEX Routing Intelligence',
    description: 'Routing logic is becoming a competitive moat because users increasingly feel slippage, not fee branding, at the point of execution.',
    tags: ['DEX', 'ROUTING'],
    imageId: 'dex01',
  },
  {
    signal: 82,
    title: 'Emission-backed Yield Systems',
    description: 'Yield programs that lock attractive APY can evolve into long-term balance sheet pressure if governance cannot absorb the distribution burden.',
    tags: ['YIELD', 'EMISSIONS'],
    imageId: 'yield01',
  },
  {
    signal: 74,
    title: 'Concentrated Capital Depth',
    description: 'Headline TVL can mask fragile liquidity if usable execution depth depends on incentives that fade faster than demand stabilises.',
    tags: ['LIQUIDITY', 'MARKET MICRO'],
    imageId: 'liq01',
  },
  {
    signal: 69,
    title: 'Governance-readable Vulnerabilities',
    description: 'Some of the most dangerous protocol risks are visible in governance design long before they surface as market moving failures.',
    tags: ['GOVERNANCE', 'RISK'],
    imageId: 'gov01',
  },
  {
    signal: 81,
    title: 'Bridge and Oracle Dependency',
    description: 'Infrastructure layers shape survivability because protocols inherit risk from the systems they depend on, not only from their own codebases.',
    tags: ['INFRA', 'ORACLES'],
    imageId: 'infra01',
  },
  {
    signal: 70,
    title: 'Stablecoin Concentration Risk',
    description: 'Protocols that rely too heavily on a narrow collateral base can appear liquid in expansion and become brittle during correlated market exits.',
    tags: ['STABLECOIN', 'RISK'],
    imageId: 'stable01',
  },
]

function signalColor(score: number): string {
  if (score >= 80) return 'var(--color-positive)'
  if (score >= 60) return '#E8C84A'
  return 'var(--color-negative)'
}

export function ResearchCoverageSection() {
  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 16px 40px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
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
            Research Coverage
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '28px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              letterSpacing: '-0.2px',
            }}
          >
            What We Analyze in DeFi
          </h2>
        </div>
        <Link
          href="/protocols"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-dim)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          View all coverage →
        </Link>
      </div>

      {/* 6-card grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          gap: '1px',
          background: 'var(--border)',
        }}
      >
        {SIGNAL_CARDS.map((card) => (
          <div
            key={card.title}
            style={{
              background: 'var(--bg-page)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Card image */}
            <div
              style={{
                position: 'relative',
                height: '148px',
                background: 'var(--bg-surface)',
                flexShrink: 0,
              }}
            >
              <Image
                src={`https://picsum.photos/seed/${card.imageId}/400/200`}
                alt={card.title}
                fill
                style={{ objectFit: 'cover', opacity: 0.65 }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Signal badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: '#1A1A18',
                  background: signalColor(card.signal),
                  padding: '3px 8px',
                  borderRadius: '2px',
                  fontWeight: 500,
                }}
              >
                Signal {card.signal}
              </div>
            </div>

            {/* Card content */}
            <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.35,
                }}
              >
                {card.title}
              </h3>
              <p
                className="line-clamp-3"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {card.description}
              </p>
              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      color: 'var(--text-dim)',
                      border: '1px solid var(--border)',
                      borderRadius: '2px',
                      padding: '2px 7px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signal strength legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '16px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-dim)',
            }}
          >
            Signal Strength:
          </span>
          {[
            { label: '80–100 Strong', color: 'var(--color-positive)' },
            { label: '60–79 Moderate', color: '#E8C84A' },
            { label: '0–59 Weak', color: 'var(--color-negative)' },
          ].map(({ label, color }) => (
            <span
              key={label}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: color,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {label}
            </span>
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-dim)',
          }}
        >
          Signals updated continuously
        </span>
      </div>
    </section>
  )
}
