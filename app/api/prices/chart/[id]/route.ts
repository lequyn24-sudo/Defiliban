import { NextResponse } from 'next/server'
import { fetchChart } from '@/lib/coingecko'

export const revalidate = 300

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params
  try {
    const prices = await fetchChart(id, 7)
    return NextResponse.json({ coinId: id, prices })
  } catch {
    return NextResponse.json({ error: 'Chart data unavailable' }, { status: 500 })
  }
}
