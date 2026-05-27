export type Tier1Slug =
  | 'protocols'
  | 'yield'
  | 'liquidity'
  | 'risk'
  | 'infrastructure'
  | 'sponsored-articles'
  | 'press-release'
  | 'cmc'

export interface SubCategory {
  slug: string
  label: string
  href: string
}

export interface CategoryMeta {
  slug: Tier1Slug
  label: string
  description: string
  badgeClass: string
  subcategories: SubCategory[]
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'protocols',
    label: 'Protocols',
    description:
      'Deep-dive protocol analysis covering DEX mechanics, lending markets, derivatives, stablecoin design, and DAO governance.',
    badgeClass: 'badge-protocols',
    subcategories: [
      { slug: 'dex',         label: 'DEX',         href: '/protocols/dex' },
      { slug: 'lending',     label: 'Lending',     href: '/protocols/lending' },
      { slug: 'derivatives', label: 'Derivatives', href: '/protocols/derivatives' },
      { slug: 'stablecoins', label: 'Stablecoins', href: '/protocols/stablecoins' },
      { slug: 'governance',  label: 'Governance',  href: '/protocols/governance' },
    ],
  },
  {
    slug: 'yield',
    label: 'Yield',
    description:
      'Staking mechanics, farming incentives, and vault strategies — actionable yield intelligence for DeFi participants.',
    badgeClass: 'badge-yield',
    subcategories: [
      { slug: 'staking',    label: 'Staking',    href: '/yield/staking' },
      { slug: 'farming',    label: 'Farming',    href: '/yield/farming' },
      { slug: 'strategies', label: 'Strategies', href: '/yield/strategies' },
    ],
  },
  {
    slug: 'liquidity',
    label: 'Liquidity',
    description:
      'Pool composition, cross-protocol capital movements, and AMM pricing model analysis.',
    badgeClass: 'badge-liquidity',
    subcategories: [
      { slug: 'pools',         label: 'Pools',         href: '/liquidity/pools' },
      { slug: 'capital-flows', label: 'Capital Flows', href: '/liquidity/capital-flows' },
      { slug: 'amm',           label: 'AMM',           href: '/liquidity/amm' },
    ],
  },
  {
    slug: 'risk',
    label: 'Risk',
    description:
      'Exploit post-mortems, liquidation cascade analysis, and smart contract vulnerability disclosures.',
    badgeClass: 'badge-risk',
    subcategories: [
      { slug: 'exploits',       label: 'Exploits',       href: '/risk/exploits' },
      { slug: 'liquidations',   label: 'Liquidations',   href: '/risk/liquidations' },
      { slug: 'smart-contract', label: 'Smart Contract', href: '/risk/smart-contract' },
    ],
  },
  {
    slug: 'infrastructure',
    label: 'Infrastructure',
    description:
      'Oracle integrity, bridge security architecture, and Layer 2 rollup performance analysis.',
    badgeClass: 'badge-infra',
    subcategories: [
      { slug: 'oracles', label: 'Oracles', href: '/infrastructure/oracles' },
      { slug: 'bridges', label: 'Bridges', href: '/infrastructure/bridges' },
      { slug: 'layer2',  label: 'Layer 2', href: '/infrastructure/layer2' },
    ],
  },
  {
    slug: 'sponsored-articles',
    label: 'Sponsored',
    description: 'Clearly labelled partner and sponsored content.',
    badgeClass: 'badge-sponsored',
    subcategories: [],
  },
  {
    slug: 'press-release',
    label: 'Press Release',
    description: 'Official protocol announcements and project press releases.',
    badgeClass: 'badge-infra',
    subcategories: [],
  },
  {
    slug: 'cmc',
    label: 'CMC Data',
    description: 'CoinMarketCap data integration — market cap, volume, and token metrics.',
    badgeClass: 'badge-protocols',
    subcategories: [],
  },
]

export const TIER1_SLUGS: Tier1Slug[] = CATEGORIES.map((c) => c.slug)

export const MAIN_NAV_CATEGORIES = CATEGORIES.filter(
  (c) => !['sponsored-articles', 'press-release', 'cmc'].includes(c.slug)
)

export function getCategoryMeta(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function isValidTier1(slug: string): slug is Tier1Slug {
  return TIER1_SLUGS.includes(slug as Tier1Slug)
}

export function isValidSubcategory(tier1: string, sub: string): boolean {
  const meta = getCategoryMeta(tier1)
  if (!meta) return false
  return meta.subcategories.some((s) => s.slug === sub)
}
