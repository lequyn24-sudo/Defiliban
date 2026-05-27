import { MOCK_PRICES } from '@/lib/mock/prices'
import { formatPrice } from '@/lib/utils/format'

export function PriceTicker() {
  const doubled = [...MOCK_PRICES, ...MOCK_PRICES]

  return (
    <div
      className="overflow-hidden scrollbar-none"
      style={{
        height: '32px',
        background: 'var(--bg-void)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* LIVE badge */}
      <div
        className="flex-shrink-0 flex items-center gap-1.5 px-3 h-full"
        style={{ borderRight: '1px solid var(--border)' }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--color-positive)', display: 'inline-block' }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            color: 'var(--text-dim)',
          }}
        >
          Live
        </span>
      </div>

      {/* Scrolling prices */}
      <div className="flex-1 overflow-hidden">
        <div className="ticker-track">
          {doubled.map((coin, i) => {
            const up = coin.price_change_percentage_24h >= 0
            return (
              <span
                key={`${coin.id}-${i}`}
                className="inline-flex items-center gap-2 px-4 flex-shrink-0"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  {coin.symbol.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-dim)',
                  }}
                >
                  {formatPrice(coin.current_price)}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: up
                      ? 'var(--color-positive)'
                      : 'var(--color-negative)',
                  }}
                >
                  {up ? '+' : ''}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
                <span style={{ color: 'var(--border)', fontSize: '10px' }}>
                  ·
                </span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
