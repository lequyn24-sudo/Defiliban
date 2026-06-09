import Link from 'next/link'
import { fetchTickerCoins } from '@/lib/coingecko'

const TICKER_IDS = ['bitcoin', 'ethereum', 'solana', 'binancecoin']

function formatPrice(price: number): string {
  if (price >= 1000) return `$${Math.round(price).toLocaleString('en-US')}`
  if (price >= 1) return `$${price.toFixed(2)}`
  return `$${price.toFixed(4)}`
}

function sparklinePoints(prices: number[]): string {
  if (prices.length < 2) return ''
  const step = Math.max(1, Math.floor(prices.length / 20))
  const pts = prices.filter((_, i) => i % step === 0)
  if (pts.length < 2) return ''
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const range = max - min || 1
  return pts
    .map((p, i) => {
      const x = ((i / (pts.length - 1)) * 48).toFixed(1)
      const y = (15 - ((p - min) / range) * 13).toFixed(1)
      return `${x},${y}`
    })
    .join(' ')
}

const STATIC_UP = '0,14 8,10 16,11 24,7 32,8 40,4 48,2'
const STATIC_DOWN = '0,2 8,5 16,4 24,8 32,7 40,11 48,14'

interface TickerItem {
  label: string
  price: string
  change: string
  up: boolean
  points: string
}

export async function PriceTicker() {
  let items: TickerItem[] = TICKER_IDS.map((id) => ({
    label: id === 'binancecoin' ? 'BNB' : id.slice(0, 3).toUpperCase(),
    price: '—',
    change: '—',
    up: true,
    points: STATIC_UP,
  }))

  try {
    const coins = await fetchTickerCoins(TICKER_IDS)
    if (coins.length > 0) {
      items = coins.map((coin) => {
        const up = coin.price_change_percentage_24h >= 0
        const pts = sparklinePoints(coin.sparkline)
        return {
          label: coin.symbol,
          price: formatPrice(coin.current_price),
          change: `${up ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`,
          up,
          points: pts || (up ? STATIC_UP : STATIC_DOWN),
        }
      })
    }
  } catch {
    // keep placeholder items
  }

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
        {items.map((item, i) => (
          <div
            key={item.label}
            style={{
              flex: '1 1 0',
              minWidth: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 var(--sp-4)',
              borderRight: i < items.length - 1 ? '1px solid var(--border)' : 'none',
              gap: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.3px',
                  flexShrink: 0,
                }}
              >
                {item.price}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: item.up ? 'var(--color-positive)' : 'var(--color-negative)',
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {item.change}
              </span>
              <span style={{ marginLeft: 'auto', flexShrink: 0 }}>
                <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden="true">
                  <polyline
                    points={item.points}
                    stroke={item.up ? '#4CAF7A' : '#F08080'}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', overflow: 'hidden' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--text-dim)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  color: 'var(--text-dim)',
                  opacity: 0.6,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                7D TREND
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
