import type { CoinPrice } from '@/lib/types'

export const MOCK_PRICES: CoinPrice[] = [
  { id: 'bitcoin',        symbol: 'BTC',   name: 'Bitcoin',    current_price: 98420,    price_change_percentage_24h: 2.41,  market_cap: 1_930_000_000_000, total_volume: 42_000_000_000 },
  { id: 'ethereum',       symbol: 'ETH',   name: 'Ethereum',   current_price: 3810,     price_change_percentage_24h: 1.82,  market_cap: 458_000_000_000,   total_volume: 18_000_000_000 },
  { id: 'solana',         symbol: 'SOL',   name: 'Solana',     current_price: 182.40,   price_change_percentage_24h: -0.63, market_cap: 86_000_000_000,    total_volume: 4_200_000_000 },
  { id: 'binancecoin',    symbol: 'BNB',   name: 'BNB',        current_price: 614,      price_change_percentage_24h: 0.92,  market_cap: 89_000_000_000,    total_volume: 1_900_000_000 },
  { id: 'avalanche-2',    symbol: 'AVAX',  name: 'Avalanche',  current_price: 41.20,    price_change_percentage_24h: -1.24, market_cap: 17_000_000_000,    total_volume: 620_000_000 },
  { id: 'chainlink',      symbol: 'LINK',  name: 'Chainlink',  current_price: 18.75,    price_change_percentage_24h: 3.10,  market_cap: 11_000_000_000,    total_volume: 480_000_000 },
  { id: 'uniswap',        symbol: 'UNI',   name: 'Uniswap',    current_price: 11.40,    price_change_percentage_24h: 4.22,  market_cap: 6_800_000_000,     total_volume: 210_000_000 },
  { id: 'aave',           symbol: 'AAVE',  name: 'Aave',       current_price: 224,      price_change_percentage_24h: 2.88,  market_cap: 3_300_000_000,     total_volume: 130_000_000 },
  { id: 'curve-dao-token',symbol: 'CRV',   name: 'Curve DAO',  current_price: 0.62,     price_change_percentage_24h: -2.10, market_cap: 870_000_000,       total_volume: 56_000_000 },
  { id: 'lido-dao',       symbol: 'LDO',   name: 'Lido DAO',   current_price: 2.14,     price_change_percentage_24h: 1.54,  market_cap: 1_920_000_000,     total_volume: 88_000_000 },
  { id: 'arbitrum',       symbol: 'ARB',   name: 'Arbitrum',   current_price: 1.24,     price_change_percentage_24h: 3.40,  market_cap: 4_960_000_000,     total_volume: 160_000_000 },
  { id: 'optimism',       symbol: 'OP',    name: 'Optimism',   current_price: 2.88,     price_change_percentage_24h: 5.12,  market_cap: 3_140_000_000,     total_volume: 210_000_000 },
  { id: 'matic-network',  symbol: 'POL',   name: 'Polygon',    current_price: 0.98,     price_change_percentage_24h: -0.44, market_cap: 9_500_000_000,     total_volume: 320_000_000 },
  { id: 'cosmos',         symbol: 'ATOM',  name: 'Cosmos',     current_price: 12.60,    price_change_percentage_24h: 1.08,  market_cap: 4_800_000_000,     total_volume: 180_000_000 },
  { id: 'polkadot',       symbol: 'DOT',   name: 'Polkadot',   current_price: 9.82,     price_change_percentage_24h: 0.76,  market_cap: 12_400_000_000,    total_volume: 240_000_000 },
  { id: 'maker',          symbol: 'MKR',   name: 'Maker',      current_price: 2840,     price_change_percentage_24h: 1.92,  market_cap: 2_780_000_000,     total_volume: 72_000_000 },
  { id: 'compound-governance-token', symbol: 'COMP', name: 'Compound', current_price: 68.40, price_change_percentage_24h: 2.34, market_cap: 480_000_000, total_volume: 28_000_000 },
  { id: 'gmx',            symbol: 'GMX',   name: 'GMX',        current_price: 38.20,    price_change_percentage_24h: -1.80, market_cap: 380_000_000,       total_volume: 18_000_000 },
  { id: 'synthetix-network-token', symbol: 'SNX', name: 'Synthetix', current_price: 3.24, price_change_percentage_24h: 0.98, market_cap: 940_000_000,    total_volume: 42_000_000 },
  { id: 'blur',           symbol: 'BLUR',  name: 'Blur',       current_price: 0.28,     price_change_percentage_24h: -3.20, market_cap: 310_000_000,       total_volume: 24_000_000 },
]
