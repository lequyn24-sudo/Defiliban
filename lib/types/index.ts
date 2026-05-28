export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  tier1: string
  coverImage: string
  publishedAt: string
  readTimeMin: number
  sourceAttribution: string
  isBreaking: boolean
  isFeatured: boolean
  isSponsor: boolean
  tags: string[]
}

export type ArticlePreview = Omit<Article, 'body'>

export interface CoinPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  imageUrl?: string
}

export interface MockUser {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  theme: 'dark' | 'light' | 'system'
  joinedAt: string
}
