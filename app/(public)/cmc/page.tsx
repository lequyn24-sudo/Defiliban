import Image from 'next/image'
import Link from 'next/link'
import { MOCK_PRICES } from '@/lib/mock/prices'
import type { CoinPrice } from '@/lib/types'

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1) return `$${price.toFixed(2)}`
  return `$${price.toFixed(4)}`
}

function formatLargeNum(n: number): string {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`
  return `$${n.toLocaleString()}`
}

export default function CMCPage() {
  const sorted = [...MOCK_PRICES].sort((a, b) => b.market_cap - a.market_cap)

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--sp-10) var(--sp-4) var(--sp-16)' }}>

        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-8)' }}>
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
            Market Data
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.4px',
              }}
            >
              Market Overview
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-dim)',
              }}
            >
              {sorted.length} assets · Updated 2m ago
            </span>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 2fr 120px 100px 100px 140px 140px',
              padding: 'var(--sp-2) var(--sp-4)',
              background: 'var(--bg-surface2)',
              borderBottom: '1px solid var(--border)',
              gap: 'var(--sp-2)',
            }}
          >
            {['#', 'ASSET', 'PRICE', '24H %', '7D %', 'MARKET CAP', 'VOLUME (24H)'].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  color: 'var(--text-dim)',
                  textAlign: h === '#' || h === 'ASSET' ? 'left' : 'right',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((coin, i) => (
            <CoinRow key={coin.id} coin={coin} rank={i + 1} isEven={i % 2 === 0} />
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(232,232,198,0.35)',
            marginTop: 'var(--sp-5)',
            textAlign: 'center',
          }}
        >
          Data is illustrative / mock — not live market data · AI · Defiliban
        </p>
      </div>
    </div>
  )
}

function CoinRow({ coin, rank, isEven }: { coin: CoinPrice; rank: number; isEven: boolean }) {
  const up24 = coin.price_change_percentage_24h >= 0
  const mock7d = coin.price_change_percentage_24h * 1.4

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 2fr 120px 100px 100px 140px 140px',
        padding: 'var(--sp-3) var(--sp-4)',
        gap: 'var(--sp-2)',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        background: isEven ? 'var(--bg-page)' : 'transparent',
        transition: 'background-color 0.12s',
      }}
      className="row-hover"
    >
      {/* Rank */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'rgba(232,232,198,0.35)',
        }}
      >
        {rank}
      </span>

      {/* Asset */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'var(--bg-surface)',
            position: 'relative',
          }}
        >
          {coin.imageUrl ? (
            <Image
              src={coin.imageUrl}
              alt={coin.name}
              fill
              sizes="28px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `hsl(${(rank * 37) % 360}, 50%, 55%)`,
                display: 'inline-block',
              }}
            />
          )}
        </div>
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
              fontSize: '11px',
              color: 'var(--text-dim)',
            }}
          >
            {coin.symbol}
          </span>
        </div>
      </div>

      {/* Price */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-primary)',
          textAlign: 'right',
          display: 'block',
        }}
      >
        {formatPrice(coin.current_price)}
      </span>

      {/* 24h % */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          color: up24 ? 'var(--color-positive)' : 'var(--color-negative)',
          textAlign: 'right',
          display: 'block',
        }}
      >
        {up24 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
      </span>

      {/* 7d % (derived from 24h for mock) */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          color: mock7d >= 0 ? 'var(--color-positive)' : 'var(--color-negative)',
          textAlign: 'right',
          display: 'block',
        }}
      >
        {mock7d >= 0 ? '+' : ''}{mock7d.toFixed(2)}%
      </span>

      {/* Market cap */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-dim)',
          textAlign: 'right',
          display: 'block',
        }}
      >
        {formatLargeNum(coin.market_cap)}
      </span>

      {/* Volume */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-dim)',
          textAlign: 'right',
          display: 'block',
        }}
      >
        {formatLargeNum(coin.total_volume)}
      </span>
    </div>
  )
}
