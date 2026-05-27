import { NextResponse } from 'next/server'
import { MOCK_PRICES } from '@/lib/mock/prices'

export const runtime = 'edge'

export function GET() {
  return NextResponse.json(MOCK_PRICES, {
    headers: {
      'Cache-Control': 's-maxage=30, stale-while-revalidate=60',
    },
  })
}
