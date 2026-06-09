import { NextResponse } from 'next/server'
import { fetchMarkets } from '@/lib/coingecko'
import { MOCK_PRICES } from '@/lib/mock/prices'

export const revalidate = 60

export async function GET() {
  try {
    const prices = await fetchMarkets(50)
    return NextResponse.json(prices)
  } catch {
    return NextResponse.json(MOCK_PRICES)
  }
}
