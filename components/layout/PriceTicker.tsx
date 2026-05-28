import Link from 'next/link'

const SPARKLINE_UP = (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden="true">
    <polyline
      points="0,14 8,10 16,11 24,7 32,8 40,4 48,2"
      stroke="#4CAF7A"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)

const SPARKLINE_DOWN = (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden="true">
    <polyline
      points="0,2 8,5 16,4 24,8 32,7 40,11 48,14"
      stroke="#CF5C5C"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)

interface Metric {
  label: string
  value: string
  change: string
  changeUp: boolean
  trend: string
  trendLabel: string
}

const METRICS: Metric[] = [
  { label: 'ETH TVL', value: '$61.4B', change: '+2.8%', changeUp: true, trend: '7D TREND', trendLabel: '7D TREND' },
  { label: 'STABLECOIN SUPPLY', value: '$153.2B', change: '+0.9%', changeUp: true, trend: '7D TREND', trendLabel: '7D TREND' },
  { label: 'DEX VOLUME (24H)', value: '$8.1B', change: '+4.6%', changeUp: true, trend: '24H TREND', trendLabel: '24H TREND' },
  { label: 'LENDING UTILIZATION', value: '71.2%', change: '-1.2%', changeUp: false, trend: 'RISK: COOLING', trendLabel: 'RISK: COOLING' },
]

export function PriceTicker() {
  return (
    <div
      style={{
        height: '48px',
        background: 'var(--bg-void)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <div
        className="flex items-stretch flex-1"
        style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 var(--sp-4)' }}
      >
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            style={{
              flex: '1 1 0',
              minWidth: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 var(--sp-4)',
              borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none',
              gap: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.3px',
                  flexShrink: 0,
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: m.changeUp ? 'var(--color-positive)' : 'var(--color-negative)',
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {m.change}
              </span>
              <span style={{ marginLeft: 'auto', flexShrink: 0 }}>
                {m.changeUp ? SPARKLINE_UP : SPARKLINE_DOWN}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', overflow: 'hidden' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--text-dim)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  color: 'var(--text-dim)',
                  opacity: 0.6,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {m.trendLabel}
              </span>
            </div>
          </div>
        ))}

        {/* Market Overview button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--sp-5)',
            flexShrink: 0,
            borderLeft: '1px solid var(--border)',
          }}
        >
          <Link
            href="/cmc"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: 'var(--sp-2) var(--sp-3)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Market Overview →
          </Link>
        </div>
      </div>
    </div>
  )
}
