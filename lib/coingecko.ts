import type { CoinPrice } from '@/lib/types'

const BASE = 'https://api.coingecko.com/api/v3'

interface CoinGeckoMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  total_volume: number
  price_change_percentage_24h: number | null
  price_change_percentage_7d_in_currency?: number | null
  sparkline_in_7d?: { price: number[] }
}

interface CoinGeckoChart {
  prices: [number, number][]
}

function cgHeaders(): Record<string, string> {
  const h: Record<string, string> = { Accept: 'application/json' }
  if (process.env.COINGECKO_API_KEY) {
    h['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY
  }
  return h
}

function mapCoin(raw: CoinGeckoMarket): CoinPrice {
  return {
    id: raw.id,
    symbol: raw.symbol.toUpperCase(),
    name: raw.name,
    imageUrl: raw.image,
    current_price: raw.current_price ?? 0,
    price_change_percentage_24h: raw.price_change_percentage_24h ?? 0,
    price_change_percentage_7d: raw.price_change_percentage_7d_in_currency ?? undefined,
    market_cap: raw.market_cap ?? 0,
    total_volume: raw.total_volume ?? 0,
  }
}

export async function fetchMarkets(perPage = 20): Promise<CoinPrice[]> {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: String(perPage),
    page: '1',
    sparkline: 'false',
    price_change_percentage: '24h,7d',
  })
  const res = await fetch(`${BASE}/coins/markets?${params}`, {
    headers: cgHeaders(),
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`CoinGecko /markets ${res.status}`)
  const data: CoinGeckoMarket[] = await res.json()
  return data.map(mapCoin)
}

export async function fetchTickerCoins(
  ids: string[],
): Promise<Array<CoinPrice & { sparkline: number[] }>> {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    ids: ids.join(','),
    order: 'market_cap_desc',
    per_page: String(ids.length),
    page: '1',
    sparkline: 'true',
    price_change_percentage: '24h,7d',
  })
  const res = await fetch(`${BASE}/coins/markets?${params}`, {
    headers: cgHeaders(),
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`CoinGecko ticker ${res.status}`)
  const data: CoinGeckoMarket[] = await res.json()
  return data.map((raw) => ({
    ...mapCoin(raw),
    sparkline: raw.sparkline_in_7d?.price ?? [],
  }))
}

export async function fetchChart(coinId: string, days = 7): Promise<number[]> {
  const params = new URLSearchParams({ vs_currency: 'usd', days: String(days) })
  const res = await fetch(`${BASE}/coins/${coinId}/market_chart?${params}`, {
    headers: cgHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`CoinGecko chart ${res.status}`)
  const data: CoinGeckoChart = await res.json()
  return data.prices.map(([, price]) => price)
}
