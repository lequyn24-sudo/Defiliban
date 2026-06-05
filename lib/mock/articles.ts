import type { Article } from '@/lib/types'

const BODY_TEMPLATE = (lead: string, analysis: string, conclusion: string) => `
<p>${lead}</p>
<h2>On-Chain Context</h2>
<p>${analysis}</p>
<h2>Risk & Opportunity Assessment</h2>
<p>${conclusion}</p>
<blockquote>"This development underscores the maturation of DeFi infrastructure — protocols are increasingly competing on execution quality rather than raw liquidity depth."</blockquote>
<p>The broader market context remains constructive. Total value locked across DeFi stands at $148.2B, up 12.4% month-over-month, driven primarily by renewed institutional participation in structured yield products.</p>
<h2>Comparative Protocol Analysis</h2>
<p>When benchmarked against competitors, the divergence in execution strategies becomes clear. While some protocols have prioritised simplicity and gas efficiency, others are betting on composability and hook-based extensibility as the primary moat.</p>
<p>For DeFi participants, the actionable takeaway is to monitor on-chain flow data over the next 72 hours. Capital allocation shifts of this magnitude typically produce follow-on effects across correlated pools within three to five blocks of the initial transaction.</p>
`

export const MOCK_ARTICLES: Article[] = [
  // ── PROTOCOLS / DEX ──────────────────────────────────
  {
    id: 'art001',
    slug: 'protocols-uniswap-v4-hooks-reshape-amm-design-space-art001',
    title: 'Uniswap v4 Hooks Are Reshaping the AMM Design Space',
    excerpt: 'The customisable hook architecture introduced in Uniswap v4 is spawning an ecosystem of specialised AMM strategies that were previously impossible on-chain.',
    body: BODY_TEMPLATE(
      'Uniswap v4\'s hook system has generated over 340 unique hook implementations in the three months since mainnet launch, ranging from dynamic fee tiers to custom oracle integrations that bypass Chainlink entirely.',
      'On-chain data from Dune Analytics shows that hook-enabled pools now account for 18% of total Uniswap v4 volume, despite representing only 6% of all pools. The average fee revenue per hook pool is 2.8× higher than standard pools, suggesting that customisation unlocks meaningfully differentiated liquidity positions.',
      'The primary risk is smart contract complexity. Each hook adds a new attack surface, and the audit burden grows non-linearly with hook composition. Protocols building on top of hooks should budget for independent security reviews before deploying with significant TVL.'
    ),
    category: 'protocols/dex',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art001/800/450',
    publishedAt: '2026-06-03T08:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on The Defiant',
    isBreaking: false,
    isFeatured: true,
    isSponsor: false,
    tags: ['uniswap', 'amm', 'hooks', 'defi'],
  },
  {
    id: 'art002',
    slug: 'protocols-curve-finance-ng-pools-stable-dominance-art002',
    title: 'Curve Finance NG Pools Cement Stablecoin Swap Dominance',
    excerpt: 'The next-generation Curve pools deliver 40% lower slippage on large stablecoin swaps versus competitors, driven by a reformulated invariant.',
    body: BODY_TEMPLATE(
      'Curve Finance\'s NG (next-generation) pool architecture, deployed across Ethereum and five L2s, has processed $2.1B in stablecoin volume in the past 30 days with an average swap slippage of 0.04bps on trades under $10M.',
      'The core innovation is a reformulated invariant that dynamically adjusts the amplification coefficient based on pool imbalance. When a pool drifts beyond a configurable threshold, the curve transitions smoothly from a constant-sum to a constant-product model, preventing the price impact cliff seen in older stableswap designs.',
      'For LPs, the risk profile is nuanced. The improved invariant reduces impermanent loss during moderate price deviations, but the protocol\'s governance token (CRV) emissions remain the primary yield driver. Declining CRV price directly compresses LP APY below what raw swap fees can sustain independently.'
    ),
    category: 'protocols/dex',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art002/800/450',
    publishedAt: '2026-05-26T14:30:00Z',
    readTimeMin: 5,
    sourceAttribution: 'AI · Based on CoinDesk',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['curve', 'stableswap', 'liquidity'],
  },
  {
    id: 'art003',
    slug: 'protocols-balancer-v3-boosted-pools-go-live-art003',
    title: 'Balancer v3 Boosted Pools Go Live With Aave Integration',
    excerpt: 'Idle liquidity in Balancer pools is now automatically deposited into Aave lending markets, boosting LP returns without additional user action.',
    body: BODY_TEMPLATE(
      'Balancer v3 launched its boosted pool architecture on Ethereum mainnet, with $480M in initial TVL migrated from v2 pools in the first 48 hours. The pools route idle assets to Aave v3 while maintaining instant liquidity for swaps.',
      'The integration uses a custom ERC-4626 vault wrapper that abstracts the Aave lending position behind a standard LP token. When a swap occurs, the vault redeems only the required portion of the Aave position, minimising gas overhead. In backtests, this architecture improves LP APY by 2.4–6.8% depending on the pool\'s utilisation rate.',
      'The principal risk is withdrawal queue friction during market stress events. If Aave borrowing demand spikes simultaneously with large Balancer withdrawals, users may experience 1–3 block delays on redemptions. The team has implemented a configurable buffer reserve (currently set to 5% of pool assets) to absorb most normal outflows.'
    ),
    category: 'protocols/dex',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art003/800/450',
    publishedAt: '2026-05-25T10:15:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Decrypt',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['balancer', 'aave', 'boosted-pools'],
  },
  {
    id: 'art004',
    slug: 'protocols-dex-aggregator-war-1inch-cowswap-art004',
    title: 'DEX Aggregator Wars: 1inch vs CoW Protocol Intent Battle',
    excerpt: 'Intent-based trading models are disrupting the classical aggregator approach, with CoW Protocol\'s batch auction mechanism gaining institutional traction.',
    body: BODY_TEMPLATE(
      'The DEX aggregator landscape is bifurcating between path-based routers and intent-based settlement systems. CoW Protocol processed $14.2B in volume in Q1 2026, up 87% year-over-year, fuelled by institutional demand for MEV protection.',
      'CoW\'s batch auction mechanism allows solvers to compete for the right to settle a batch of orders, with surplus shared between traders and the protocol treasury. On-chain data shows the average MEV protection benefit per trade is $4.20 on a $10,000 swap — small individually but material at institutional scale.',
      'The trade-off is settlement latency. CoW batches settle every 5–30 minutes depending on order flow, making it unsuitable for time-sensitive arbitrage but well-positioned for large institutional block trades where price certainty outweighs speed.'
    ),
    category: 'protocols/dex',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art004/800/450',
    publishedAt: '2026-05-24T09:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on The Block',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['1inch', 'cowprotocol', 'aggregator', 'mev'],
  },
  {
    id: 'art005',
    slug: 'protocols-pancakeswap-aptos-expansion-art005',
    title: 'PancakeSwap Expands to Aptos With $50M Incentive Program',
    excerpt: 'The BNB Chain-native DEX is accelerating its multi-chain expansion strategy with a structured liquidity mining program on the Aptos Move VM.',
    body: BODY_TEMPLATE(
      'PancakeSwap has deployed its v3 architecture on Aptos, backed by a $50M incentive program funded by the Aptos Foundation. Initial bootstrapping targets the BTC, ETH, and APT core trading pairs, with stablecoin pools coming in the second phase.',
      'The Move VM\'s resource-centric execution model enables PancakeSwap to implement position-level accounting natively, eliminating the off-chain subgraph dependency that creates data lag on EVM deployments. Early benchmarks show 40ms average transaction finality versus Ethereum\'s 12-second block time.',
      'The risk is over-incentivisation diluting sustainable LP yield. When $50M in emissions are distributed over 12 months across a nascent ecosystem, mercenary capital will farm and sell, creating persistent downward pressure on CAKE token price.'
    ),
    category: 'protocols/dex',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art005/800/450',
    publishedAt: '2026-05-23T16:00:00Z',
    readTimeMin: 5,
    sourceAttribution: 'AI · Based on CoinTelegraph',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['pancakeswap', 'aptos', 'multichain'],
  },

  // ── PROTOCOLS / LENDING ──────────────────────────────
  {
    id: 'art006',
    slug: 'protocols-aave-v4-unified-liquidity-layer-art006',
    title: 'Aave v4 Introduces Unified Liquidity Layer Across All Chains',
    excerpt: 'A single shared liquidity pool accessible from any supported chain eliminates capital fragmentation — the most significant architectural change since Aave\'s inception.',
    body: BODY_TEMPLATE(
      'Aave v4\'s unified liquidity layer allows a deposit on Ethereum to collateralise a borrow on Arbitrum or Base without bridging, using a cross-chain messaging system built on LayerZero. The theoretical maximum utilisation rate increases from ~85% to ~96% under this model.',
      'The interest rate model has been overhauled to reflect cross-chain demand signals in real-time. When borrowing demand spikes on a particular chain, the rate adjusts within 2 blocks of the signal being relayed, tightening the spread between deposit and borrow APY.',
      'The primary systemic risk is message relay failure. If LayerZero experiences an outage while large cross-chain positions are open, borrowers could face liquidation based on stale collateral values. Aave has implemented a 15-minute oracle staleness threshold as a circuit breaker.'
    ),
    category: 'protocols/lending',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art006/800/450',
    publishedAt: '2026-06-01T06:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on The Defiant',
    isBreaking: true,
    isFeatured: false,
    isSponsor: false,
    tags: ['aave', 'lending', 'cross-chain', 'layerzero'],
  },
  {
    id: 'art007',
    slug: 'protocols-morpho-market-tvl-surpasses-4b-art007',
    title: 'Morpho Markets TVL Surpasses $4B as Isolated Lending Gains',
    excerpt: 'Morpho\'s risk-isolated lending market design is attracting institutional capital seeking precise exposure control unavailable in pooled lending protocols.',
    body: BODY_TEMPLATE(
      'Morpho has crossed $4B in TVL, driven by institutional adoption of its isolated lending market architecture. Each Morpho market is a standalone smart contract pairing one collateral asset with one loan asset, eliminating the cross-contamination risk present in pooled models like Aave and Compound.',
      'The protocol processes $380M in daily loan originations, with a 94% on-time repayment rate. Liquidation events have dropped 62% compared to Q4 2025 following the introduction of adaptive oracle buffers that widen price tolerance bands during high-volatility periods.',
      'Morpho\'s curator model — where market creators set risk parameters and earn a fee — creates a marketplace for risk assessment. The best curators are generating 40–80bps of annual fee revenue on curated TVL, creating a new class of DeFi risk professionals.'
    ),
    category: 'protocols/lending',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art007/800/450',
    publishedAt: '2026-05-26T11:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on Rekt News',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['morpho', 'lending', 'isolated-markets'],
  },
  {
    id: 'art008',
    slug: 'protocols-compound-v3-comet-architecture-deep-dive-art008',
    title: 'Compound v3 Comet Architecture: A Technical Deep Dive',
    excerpt: 'The Comet contract model separates each base asset into an independent market, reducing systemic risk while enabling more aggressive interest rate optimisation.',
    body: BODY_TEMPLATE(
      'Compound v3\'s Comet architecture deploys a separate smart contract for each base asset (currently USDC, USDT, and ETH on mainnet), isolating risk entirely. A liquidation event in the USDC market cannot cascade to affect ETH borrowers.',
      'The interest rate model uses a two-kink design: below 80% utilisation rates are linear; between 80–90% rates accelerate moderately; above 90% the rate jumps sharply to incentivise repayment. Back-tests show this model maintains utilisation in the 70–85% optimal range 82% of the time.',
      'The limitation is reduced capital efficiency compared to Aave\'s unified pool. Each Comet holds reserves independently, meaning aggregate protocol reserves are fragmented. This is the deliberate trade-off Compound made for predictability and auditability.'
    ),
    category: 'protocols/lending',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art008/800/450',
    publishedAt: '2026-05-25T09:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on Messari',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['compound', 'comet', 'lending', 'architecture'],
  },

  // ── PROTOCOLS / DERIVATIVES ──────────────────────────
  {
    id: 'art009',
    slug: 'protocols-gmx-v2-perp-fees-hit-200m-quarterly-art009',
    title: 'GMX v2 Perpetual Fee Revenue Hits $200M Quarterly Record',
    excerpt: 'The decentralised perpetuals protocol processes $8.4B in monthly notional volume with fee revenue shared between GLP liquidity providers and GMX stakers.',
    body: BODY_TEMPLATE(
      'GMX v2 has generated $200M in fee revenue in Q1 2026, setting a new quarterly record. The protocol\'s synthetic asset model allows traders to gain leveraged exposure to BTC, ETH, and 14 other assets using a multi-asset pool rather than order books.',
      'The GLP pool — which acts as the counterparty to all trades — has delivered a 42% APY to LPs over the past 90 days, denominated in ETH. This compares favourably to the 3–8% yields available in traditional DeFi lending, explaining the rapid TVL growth to $1.8B.',
      'The principal risk for LPs is negative PnL from skilled traders winning more than they lose. In trending markets, directional traders can extract value from the GLP pool faster than fees replenish it. The protocol\'s funding rate mechanism helps offset this but cannot eliminate it during sustained directional moves.'
    ),
    category: 'protocols/derivatives',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art009/800/450',
    publishedAt: '2026-06-02T07:30:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on The Block',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['gmx', 'perpetuals', 'derivatives'],
  },
  {
    id: 'art010',
    slug: 'protocols-hyperliquid-onchain-orderbook-revolution-art010',
    title: 'Hyperliquid\'s On-Chain Order Book Challenges CEX Latency',
    excerpt: 'A fully on-chain central limit order book processing 100,000 TPS is forcing a fundamental reconsideration of DEX design constraints.',
    body: BODY_TEMPLATE(
      'Hyperliquid has processed $1.2T in cumulative volume since launch, operating an on-chain CLOB that matches orders at sub-millisecond latency on its custom HyperBFT consensus layer. The architecture eliminates the off-chain matching engine dependency that defines most perpetual DEX designs.',
      'Market makers on Hyperliquid operate with 2bps average spreads on BTC-USDC perpetuals — approaching Binance and OKX spreads. The protocol achieves this through a validator set that is optimised for low-latency block production rather than decentralisation, with 16 validators currently active.',
      'The centralisation trade-off is significant. With 16 validators, the network has a lower Nakamoto coefficient than most L1s. The team argues that this is a temporary state that will decentralise as the HyperBFT consensus matures, but the current security model relies heavily on validator reputation.'
    ),
    category: 'protocols/derivatives',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art010/800/450',
    publishedAt: '2026-05-26T13:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Decrypt',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['hyperliquid', 'orderbook', 'perpetuals'],
  },

  // ── PROTOCOLS / STABLECOINS ──────────────────────────
  {
    id: 'art011',
    slug: 'protocols-dai-cdp-architecture-15-years-later-art011',
    title: 'DAI\'s CDP Architecture at 8 Years: What the Data Shows',
    excerpt: 'MakerDAO\'s collateralised debt position system has weathered 14 major market downturns. An analysis of its resilience and evolving risk profile.',
    body: BODY_TEMPLATE(
      'DAI has maintained its $1 peg within a 2-cent band during 98.4% of all trading hours over the past 8 years. The CDP system has processed over $180B in cumulative debt origination, with a total liquidation event count of 142,000 — only 0.08% of which resulted in protocol bad debt.',
      'The collateralisation ratio has increased from the original 150% minimum to a weighted average of 186% across all vault types today. The introduction of Real World Asset (RWA) collateral now accounts for 34% of DAI backing, shifting the risk profile from pure crypto-native to a hybrid model that maintains liquidity during crypto market drawdowns.',
      'The key structural vulnerability is governance token (MKR) concentration. The top 20 MKR wallets control 62% of voting power, creating governance centralisation risk. Maker\'s multi-year roadmap to decentralise governance through the SubDAO system is a direct response to this systemic concern.'
    ),
    category: 'protocols/stablecoins',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art011/800/450',
    publishedAt: '2026-05-26T10:00:00Z',
    readTimeMin: 9,
    sourceAttribution: 'AI · Based on DeFi Pulse',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['dai', 'makerdao', 'stablecoins', 'cdp'],
  },
  {
    id: 'art012',
    slug: 'protocols-usde-ethena-yield-mechanics-explained-art012',
    title: 'USDe Mechanics Explained: How Ethena Generates 18% Yield',
    excerpt: 'Ethena\'s synthetic dollar derives its yield from perpetual futures funding rates — a mechanism that is sustainable in trending markets but carries specific collapse scenarios.',
    body: BODY_TEMPLATE(
      'Ethena\'s USDe holds a delta-neutral position: long spot ETH (deposited as collateral) and short perpetual ETH futures. The yield comes entirely from the funding rate paid by long perpetual holders to short holders — currently averaging 18.4% annualised.',
      'The funding rate is not guaranteed. When markets turn structurally bearish, funding rates flip negative, meaning USDe holders would receive negative yield. Historical data shows that negative funding rates average 8–12% annualised and persist for 30–90 day periods before normalising.',
      'The protocol maintains a reserve fund ($240M at current size) to absorb negative funding periods without diluting USDe holders. At current yield levels and protocol size, the reserve covers approximately 9 months of maximum historical negative funding stress.'
    ),
    category: 'protocols/stablecoins',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art012/800/450',
    publishedAt: '2026-05-25T12:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Bankless',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['ethena', 'usde', 'stablecoins', 'funding-rate'],
  },

  // ── PROTOCOLS / GOVERNANCE ───────────────────────────
  {
    id: 'art013',
    slug: 'protocols-uniswap-dao-fee-switch-vote-passes-art013',
    title: 'Uniswap DAO Fee Switch Vote Passes — Protocol Revenue Begins',
    excerpt: 'After years of debate, the Uniswap governance community has approved activating the 0.05% protocol fee across all v3 pools on Ethereum mainnet.',
    body: BODY_TEMPLATE(
      'Uniswap DAO has passed a governance proposal activating the protocol fee switch with 84% approval from 62M UNI votes cast. The 0.05% fee — one-fifth of the base LP fee on a 0.3% pool — will generate an estimated $180M annually at current volume levels.',
      'The fee revenue will flow to the Uniswap treasury, which currently holds $3.8B in assets (primarily UNI tokens). The DAO has outlined three priority uses: ecosystem grants, protocol research, and token buybacks via a community-governed programmatic treasury.',
      'LP economics will tighten marginally. The 0.05% protocol fee reduces LP revenue by approximately 8% on standard pools, which may cause some marginal LPs to redeploy capital to Curve, Balancer, or other protocols where fees are fully retained by LPs.'
    ),
    category: 'protocols/governance',
    tier1: 'protocols',
    coverImage: 'https://picsum.photos/seed/art013/800/450',
    publishedAt: '2026-06-04T09:30:00Z',
    readTimeMin: 5,
    sourceAttribution: 'AI · Based on The Defiant',
    isBreaking: true,
    isFeatured: false,
    isSponsor: false,
    tags: ['uniswap', 'governance', 'fee-switch', 'dao'],
  },

  // ── YIELD / STAKING ──────────────────────────────────
  {
    id: 'art014',
    slug: 'yield-lido-staking-share-reaches-35-percent-art014',
    title: 'Lido\'s ETH Staking Share Reaches 35% — Centralisation Debate Reignites',
    excerpt: 'Lido controls 35% of all staked ETH, reigniting community debate about the systemic risk of a dominant liquid staking provider crossing the one-third threshold.',
    body: BODY_TEMPLATE(
      'Lido has crossed 35% of total staked ETH, representing $48B in stETH TVL. The one-third threshold is significant in Ethereum\'s proof-of-stake design: a validator set controlling >33% of stake can theoretically prevent finalisation of the beacon chain.',
      'The Ethereum research community has long flagged this risk. Lido\'s node operator set — 34 whitelisted operators — acts as a diversification layer, but critics argue that the concentration of economic control in a single protocol\'s governance is the real concern, not individual operator distribution.',
      'Lido governance has proposed two mitigation measures: a soft cap at 33% requiring a supermajority governance vote to exceed, and accelerated staking router diversification to bring on-chain staking pools from smaller operators. Neither measure is yet binding.'
    ),
    category: 'yield/staking',
    tier1: 'yield',
    coverImage: 'https://picsum.photos/seed/art014/800/450',
    publishedAt: '2026-05-31T05:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on Ethereum Research Forum',
    isBreaking: true,
    isFeatured: true,
    isSponsor: false,
    tags: ['lido', 'staking', 'ethereum', 'centralisation'],
  },
  {
    id: 'art015',
    slug: 'yield-eigenlayer-restaking-tvl-hits-22b-art015',
    title: 'EigenLayer Restaking TVL Hits $22B as AVS Ecosystem Matures',
    excerpt: 'Actively Validated Services are generating real fee revenue for restakers, transitioning EigenLayer from a speculative bet to an infrastructure layer with measurable yield.',
    body: BODY_TEMPLATE(
      'EigenLayer\'s restaking protocol has attracted $22B in TVL across native ETH restaking, liquid staking token restaking, and EigenPod deposits. Eighteen AVS services are live, generating collective fee revenue of $4.2M monthly to restakers.',
      'The highest-yielding AVSes currently are EigenDA (Ethereum data availability layer) at 4.8% additional APY and Lagrange (ZK coprocessor) at 3.2% APY. These are paid in AVS-native tokens, which introduces secondary token risk into the yield calculation.',
      'Slashing risk is the critical variable that most restakers underestimate. An AVS that suffers a liveness failure or safety violation can trigger slashing of the restaked ETH. The current framework allows up to 50% slashing of restaked principal for severe violations — meaningful risk for yield that averages 8–15% annually.'
    ),
    category: 'yield/staking',
    tier1: 'yield',
    coverImage: 'https://picsum.photos/seed/art015/800/450',
    publishedAt: '2026-05-26T08:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on The Block',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['eigenlayer', 'restaking', 'avs'],
  },
  {
    id: 'art016',
    slug: 'yield-rocketpool-eth-staking-permissionless-model-art016',
    title: 'Rocket Pool\'s Permissionless Node Operator Model Gains Traction',
    excerpt: 'Growing concerns about Lido\'s dominance are driving institutional capital toward Rocket Pool\'s decentralised node operator architecture.',
    body: BODY_TEMPLATE(
      'Rocket Pool has seen $1.2B in inflows in the past 30 days as institutional stakers seek a more decentralised alternative to Lido. The protocol\'s minipool architecture allows any node operator with 8 ETH to participate, creating a set of 3,400 active operators compared to Lido\'s 34.',
      'The rETH premium — the spread between rETH\'s market price and its underlying ETH value — has widened to 0.8%, indicating strong demand for decentralised liquid staking exposure. The protocol\'s Oracle DAO provides accurate ETH:rETH exchange rates through an on-chain price update mechanism.',
      'The limitation is yield efficiency. Rocket Pool\'s permissionless model introduces node operator coordination overhead that reduces maximum APY by approximately 0.5–0.8% versus Lido. For institutional actors, this cost is increasingly justified by decentralisation considerations and regulatory clarity around non-custodial staking.'
    ),
    category: 'yield/staking',
    tier1: 'yield',
    coverImage: 'https://picsum.photos/seed/art016/800/450',
    publishedAt: '2026-05-25T14:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on Bankless',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['rocketpool', 'staking', 'decentralisation'],
  },

  // ── YIELD / FARMING ──────────────────────────────────
  {
    id: 'art017',
    slug: 'yield-pendle-pt-token-yield-strategy-institutional-art017',
    title: 'Pendle PT Tokens: The Institutional Fixed-Rate Yield Strategy',
    excerpt: 'Pendle\'s principal token separation allows DeFi participants to lock in fixed yield rates on ETH staking and RWA positions — a product with no traditional finance equivalent.',
    body: BODY_TEMPLATE(
      'Pendle has processed $8.4B in cumulative volume, with institutional adoption accelerating through Q1 2026. The protocol splits yield-bearing tokens into Principal Tokens (PT) and Yield Tokens (YT), allowing separate trading of the two components.',
      'Current PT-stETH offers a fixed 4.2% APY through December 2026 maturity — 0.8% above what a direct stETH deposit provides. The PT discount reflects both the time value of money and the market\'s implied forward yield expectation for ETH staking.',
      'YT trading is the high-conviction play. YT holders receive all yield generated above the fixed rate sold to PT buyers. If ETH staking APY increases to 6% by maturity (driven by EigenLayer restaking rewards), YT holders receive the surplus 1.8% on the full notional — amplified 4–10x on the YT price they paid.'
    ),
    category: 'yield/farming',
    tier1: 'yield',
    coverImage: 'https://picsum.photos/seed/art017/800/450',
    publishedAt: '2026-05-26T09:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on DeFi Llama',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['pendle', 'yield-tokenization', 'fixed-rate'],
  },
  {
    id: 'art018',
    slug: 'yield-convex-curve-bribery-economy-500m-art018',
    title: 'Convex-Curve Bribery Economy Hits $500M Annualised',
    excerpt: 'The vote market for Curve gauge weights has matured into a structured derivatives market, with protocols paying an average $0.18 per veCRV vote.',
    body: BODY_TEMPLATE(
      'The Curve gauge weight bribery economy — coordinated primarily through Convex\'s vlCVX vote market — has reached $500M in annualised bribe payments. Protocols competing for CRV emissions as a cheap liquidity acquisition mechanism pay an average of $0.18 per veCRV voting power per epoch.',
      'The most aggressive buyers are stablecoin issuers (Frax, Liquity, crvUSD) and new L2 protocols bootstrapping initial liquidity. The average cost-per-$1M of attracted TVL through bribery is $12,000 annually — cheaper than direct token emissions in 78% of back-tested scenarios.',
      'The sustainability question is whether bribery returns degrade as the system scales. Data from the past 18 months shows ROI for bribers has been relatively stable at 1.8–2.4x, suggesting the market is efficient at pricing gauge weight demand.'
    ),
    category: 'yield/farming',
    tier1: 'yield',
    coverImage: 'https://picsum.photos/seed/art018/800/450',
    publishedAt: '2026-05-25T11:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Dune Analytics',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['convex', 'curve', 'bribery', 'governance'],
  },

  // ── YIELD / STRATEGIES ───────────────────────────────
  {
    id: 'art019',
    slug: 'yield-yearn-v3-vault-modular-strategy-art019',
    title: 'Yearn v3 Vaults Go Modular: Any Strategy, One Interface',
    excerpt: 'The v3 architecture allows third-party strategy developers to build on Yearn\'s aggregator infrastructure, transforming it from a curated product into a protocol.',
    body: BODY_TEMPLATE(
      'Yearn v3 has deployed 28 new modular vaults in Q1 2026, contributed by 14 independent strategy developers. The new architecture separates the vault (balance tracking, share accounting) from the strategy (yield generation logic), allowing strategies to be added or removed without migrating user funds.',
      'Top-performing v3 strategies include an Aave-Morpho rotation strategy generating 8.4% APY and a Pendle YT accumulation strategy generating 12.1% APY with higher risk. The rotation strategy uses an on-chain signal — the spread between Aave and Morpho borrow rates — to automatically shift deposits to the higher-yielding venue.',
      'The modular model introduces strategy quality variance risk. Unlike curated v2 vaults where Yearn\'s core team reviewed every strategy, v3 allows community strategies with lighter-touch governance approval. Users must evaluate individual strategy risks rather than relying on a uniform safety floor.'
    ),
    category: 'yield/strategies',
    tier1: 'yield',
    coverImage: 'https://picsum.photos/seed/art019/800/450',
    publishedAt: '2026-05-26T07:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on Yearn Finance Blog',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['yearn', 'vaults', 'strategies', 'modular'],
  },

  // ── LIQUIDITY / POOLS ────────────────────────────────
  {
    id: 'art020',
    slug: 'liquidity-eth-usdc-500-pool-depth-analysis-art020',
    title: 'ETH/USDC 0.05% Pool Depth Analysis: Who Really Provides Liquidity',
    excerpt: 'A forensic analysis of the ETH/USDC 0.05% Uniswap v3 pool reveals that 87% of active liquidity comes from 12 addresses — a concentration that surprises even veteran DeFi researchers.',
    body: BODY_TEMPLATE(
      'On-chain analysis of the ETH/USDC 0.05% pool on Uniswap v3 reveals extreme LP concentration: 87% of in-range liquidity is provided by 12 addresses, with the top 3 controlling 64%. These are algorithmic market makers, not passive retail LPs.',
      'The dominant strategy used by top LPs is geometric liquidity distribution — concentrating liquidity in logarithmically spaced tick ranges rather than uniform distributions. This approach generates 3–4x higher fee income per unit of capital deployed compared to naive uniform distributions.',
      'Retail LPs entering this pool without active management underperform the algorithmic market makers significantly. Modelling shows a passive LP at ±20% range from current price earns 40% less in fees than a geometrically distributed position, while taking identical impermanent loss exposure.'
    ),
    category: 'liquidity/pools',
    tier1: 'liquidity',
    coverImage: 'https://picsum.photos/seed/art020/800/450',
    publishedAt: '2026-05-27T04:00:00Z',
    readTimeMin: 9,
    sourceAttribution: 'AI · Based on Dune Analytics',
    isBreaking: false,
    isFeatured: true,
    isSponsor: false,
    tags: ['uniswap', 'liquidity', 'market-making', 'analysis'],
  },
  {
    id: 'art021',
    slug: 'liquidity-base-chain-tvl-crosses-12b-art021',
    title: 'Base Chain TVL Crosses $12B, Emerging as Layer 2 Liquidity Hub',
    excerpt: 'Coinbase\'s L2 has attracted institutional DeFi flows, with Aerodrome Finance and Morpho Base accounting for 60% of the chain\'s total value locked.',
    body: BODY_TEMPLATE(
      'Base has crossed $12B in TVL, making it the third-largest Ethereum L2 by this metric. The growth is concentrated in two protocols: Aerodrome Finance ($3.8B TVL) and Morpho Base ($3.4B TVL), both launched in the past 6 months.',
      'Base\'s competitive advantage is its Coinbase distribution funnel. The Coinbase app\'s direct-to-Base onramp processes 40,000 new users per day, providing a consistent retail liquidity inflow that organic DeFi ecosystems struggle to replicate.',
      'The centralisation risk is non-trivial. Base is a Stage 0 rollup — Coinbase controls the sequencer and can theoretically censor or reorder transactions. The roadmap to Stage 2 decentralisation requires both a permissionless proving system and a 14-day exit window for users, neither of which is live.'
    ),
    category: 'liquidity/pools',
    tier1: 'liquidity',
    coverImage: 'https://picsum.photos/seed/art021/800/450',
    publishedAt: '2026-05-26T12:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on L2Beat',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['base', 'layer2', 'liquidity', 'aerodrome'],
  },

  // ── LIQUIDITY / CAPITAL FLOWS ────────────────────────
  {
    id: 'art022',
    slug: 'liquidity-bridge-flows-ethereum-arbitrum-400m-weekly-art022',
    title: 'Ethereum→Arbitrum Bridge Flows Reach $400M Weekly High',
    excerpt: 'Capital migration from Ethereum mainnet to Arbitrum is accelerating, driven by GMX v2 fee revenue and Arbitrum Orbit chain liquidity incentives.',
    body: BODY_TEMPLATE(
      'Ethereum-to-Arbitrum bridge flows have hit $400M in a single week, the highest since Arbitrum\'s initial launch in 2021. The dominant destination protocols are GMX v2 ($180M), Pendle on Arbitrum ($82M), and new Orbit L3 chains ($64M combined).',
      'The capital flow dynamic is being driven by yield differentials. The base fee on Arbitrum is 94% lower than Ethereum mainnet, allowing protocols to offer higher net yields on the same gross revenue. A 6% gross yield on Ethereum becomes 6.8% on Arbitrum after gas cost subtraction on a $10,000 position.',
      'The risk of capital concentration in Arbitrum is a sequencer dependency. Arbitrum\'s sequencer is operated by Offchain Labs and is not yet decentralised. A sequencer outage — which has occurred twice in the past 18 months — temporarily freezes all protocol interactions, including liquidations.'
    ),
    category: 'liquidity/capital-flows',
    tier1: 'liquidity',
    coverImage: 'https://picsum.photos/seed/art022/800/450',
    publishedAt: '2026-05-26T15:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on DefiLlama',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['arbitrum', 'bridge', 'capital-flows'],
  },
  {
    id: 'art023',
    slug: 'liquidity-stablecoin-dominance-usdc-tether-defi-art023',
    title: 'USDC Reclaims DeFi Stablecoin Dominance as Tether Share Slides',
    excerpt: 'USDC\'s DeFi market share has risen to 48% from 34% a year ago, driven by regulatory clarity and the MiCA compliance framework in European DeFi protocols.',
    body: BODY_TEMPLATE(
      'USDC now represents 48% of total stablecoin TVL in DeFi protocols, up from 34% 12 months ago. The shift is driven by European DeFi protocols implementing MiCA compliance requirements that mandate fiat-backed stablecoins with EU-registered issuers.',
      'Tether\'s USDT share has fallen to 38% from 51%, primarily in on-chain DeFi (its dominance in CEX trading pairs remains above 70%). The market share loss is concentrated in lending protocols where USDT\s lack of MiCA registration creates legal uncertainty for institutional depositors.',
      'The competitive dynamic is net positive for stablecoin market efficiency. Two dominant fiat-backed stablecoins creates redundancy that reduces systemic risk from any single issuer failure — a lesson learned from USDC\'s brief depeg during the SVB banking crisis of 2023.'
    ),
    category: 'liquidity/capital-flows',
    tier1: 'liquidity',
    coverImage: 'https://picsum.photos/seed/art023/800/450',
    publishedAt: '2026-05-25T08:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on The Block',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['usdc', 'tether', 'stablecoins', 'mica'],
  },

  // ── LIQUIDITY / AMM ──────────────────────────────────
  {
    id: 'art024',
    slug: 'liquidity-concentrated-liquidity-evolution-post-v3-art024',
    title: 'Post-v3 Concentrated Liquidity: Where AMM Design Goes Next',
    excerpt: 'Three years after Uniswap v3 introduced concentrated liquidity, a new generation of AMMs is addressing its fundamental limitations through dynamic rebalancing.',
    body: BODY_TEMPLATE(
      'Concentrated liquidity AMMs have grown to represent 68% of DEX volume, but the fundamental problem — impermanent loss amplification in concentrated ranges — remains unsolved. New protocols are experimenting with dynamic rebalancing, liquidity vaults, and oracle-guided position management.',
      'The most promising approach is dual-AMM design: a concentrated liquidity pool for active trading ranges paired with a passive full-range pool as a backstop. During normal market conditions, 95% of volume routes through the concentrated pool. During high-volatility events, automatic position rebalancing triggers when price moves outside a configurable band.',
      'The next frontier is AMM-native MEV capture. Currently, $800M annually in MEV is extracted from AMMs by external arbitrageurs. Protocols like UniswapX and 1inch Fusion are routing this value back to LPs through intent-based auctions, but true in-AMM MEV capture remains an open research problem.'
    ),
    category: 'liquidity/amm',
    tier1: 'liquidity',
    coverImage: 'https://picsum.photos/seed/art024/800/450',
    publishedAt: '2026-05-24T11:00:00Z',
    readTimeMin: 9,
    sourceAttribution: 'AI · Based on Paradigm Research',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['amm', 'concentrated-liquidity', 'design'],
  },

  // ── RISK / EXPLOITS ──────────────────────────────────
  {
    id: 'art025',
    slug: 'risk-euler-finance-200m-exploit-post-mortem-art025',
    title: 'Cross-Protocol Flash Loan Exploit Drains $48M From Lending Protocol',
    excerpt: 'A flash loan attack exploiting a reentrancy vulnerability in a lending protocol\'s donation mechanism extracted $48M in under 60 seconds — a post-mortem analysis.',
    body: BODY_TEMPLATE(
      'A DeFi lending protocol was exploited for $48M on May 24, 2026, in an attack that combined a flash loan, a donation mechanism edge case, and a reentrancy vulnerability in the liquidation callback. The attacker repaid the flash loan and exited with $48M profit in a single transaction.',
      'The attack vector centred on the protocol\'s "donate to reserve" function, which allowed users to increase a pool\'s reserves without minting shares. This created a discrepancy between the pool\'s share price and its actual asset value, which the attacker exploited via a sequence of leveraged positions and targeted liquidations.',
      'Three root cause lessons: First, donation functions require the same security scrutiny as deposit functions. Second, flash loan access should be restricted during protocol state changes. Third, share price manipulation via direct asset transfers is a class of vulnerability that auditors should explicitly test for in all lending protocols.'
    ),
    category: 'risk/exploits',
    tier1: 'risk',
    coverImage: 'https://picsum.photos/seed/art025/800/450',
    publishedAt: '2026-05-24T20:00:00Z',
    readTimeMin: 10,
    sourceAttribution: 'AI · Based on Rekt News',
    isBreaking: true,
    isFeatured: true,
    isSponsor: false,
    tags: ['exploit', 'flash-loan', 'reentrancy', 'post-mortem'],
  },
  {
    id: 'art026',
    slug: 'risk-oracle-manipulation-attack-vectors-2026-art026',
    title: 'Oracle Manipulation Attack Vectors: A 2026 Threat Landscape',
    excerpt: 'Five novel oracle manipulation techniques have been documented in 2026 alone, exploiting the growing complexity of multi-source price aggregation systems.',
    body: BODY_TEMPLATE(
      'Oracle manipulation remains the most common attack vector for DeFi exploits in 2026, responsible for 62% of total funds lost ($340M year-to-date). The attack surface is expanding as protocols adopt more complex multi-source aggregation with longer TWAP windows.',
      'The most dangerous new technique is "slow bleeding" oracle manipulation — gradually accumulating a position over multiple blocks to shift a TWAP oracle without triggering circuit breakers. Traditional flash-loan defences don\'t protect against slow bleeds because the manipulation unfolds across 30–100 blocks.',
      'The industry standard defence is shifting to multi-layer oracle systems: a Chainlink primary price with a Uniswap v3 TWAP circuit breaker and a custom deviation guard. When all three sources diverge by more than a configurable threshold, the protocol automatically pauses new borrows.'
    ),
    category: 'risk/exploits',
    tier1: 'risk',
    coverImage: 'https://picsum.photos/seed/art026/800/450',
    publishedAt: '2026-05-23T13:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on Blockworks Research',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['oracle', 'manipulation', 'security', 'twap'],
  },

  // ── RISK / LIQUIDATIONS ──────────────────────────────
  {
    id: 'art027',
    slug: 'risk-eth-price-8k-scenario-liquidation-cascade-art027',
    title: 'ETH $8K Scenario: Mapping the DeFi Liquidation Cascade',
    excerpt: 'If ETH reaches $8,000, on-chain data shows $3.2B in DeFi borrowing positions would face liquidation — but the cascade structure is more nuanced than the headline suggests.',
    body: BODY_TEMPLATE(
      'At the current ETH price of $3,810, there is $3.2B in DeFi borrowing positions that would face liquidation if ETH reaches $8,000 — representing a 110% price increase. The positions are distributed across Aave ($1.4B), Morpho ($820M), Compound ($480M), and smaller protocols.',
      'The liquidation would not be simultaneous. Aave\'s health factor decay is gradual, with the first liquidations triggering at $7,200 ($480M exposure). The bulk of liquidations ($1.8B) trigger between $7,800 and $8,200 — the zone where most leveraged long positions have their liquidation prices set.',
      'The cascade risk is self-limiting. Unlike the March 2020 Black Thursday event (when DAI liquidations congested the Ethereum network), current gas capacity on L2s provides sufficient throughput to process all liquidations within 3–8 blocks. The real risk is oracle update latency on congested L1 during rapid price moves.'
    ),
    category: 'risk/liquidations',
    tier1: 'risk',
    coverImage: 'https://picsum.photos/seed/art027/800/450',
    publishedAt: '2026-05-22T14:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on Chaos Labs',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['liquidations', 'eth', 'risk-analysis'],
  },

  // ── RISK / SMART CONTRACT ────────────────────────────
  {
    id: 'art028',
    slug: 'risk-spearbit-audit-findings-2026-defi-protocols-art028',
    title: 'Spearbit Audit Findings 2026: The Most Common DeFi Vulnerabilities',
    excerpt: 'An analysis of 40 published Spearbit audit reports reveals three vulnerability classes responsible for 74% of all critical findings across DeFi protocols.',
    body: BODY_TEMPLATE(
      'Spearbit\'s 2026 audit report compilation covers 40 protocol reviews across lending, DEX, and derivatives categories. Critical findings (potential for fund loss) averaged 1.8 per audit, with high findings averaging 4.2 per audit. Total vulnerabilities that would have resulted in fund loss, had they reached production: $4.8B estimated exposure.',
      'The three dominant vulnerability classes are: (1) Accounting errors in fee-on-transfer token handling (28% of criticals), (2) Price manipulation via single-block oracle reads (26% of criticals), and (3) Access control bypass through proxy upgrade patterns (20% of criticals). ERC-4626 vault implementations had the highest critical density at 2.4 per audit.',
      'The corrective trend is promising. Protocols that underwent multiple audits showed a 67% reduction in critical findings between first and second reviews, suggesting that the audit-and-iterate approach creates measurable security improvement. Continuous audit partnerships — where auditors maintain ongoing access — reduced critical findings by 82% versus point-in-time audits.'
    ),
    category: 'risk/smart-contract',
    tier1: 'risk',
    coverImage: 'https://picsum.photos/seed/art028/800/450',
    publishedAt: '2026-05-21T10:00:00Z',
    readTimeMin: 9,
    sourceAttribution: 'AI · Based on Spearbit Research',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['audit', 'smart-contracts', 'security', 'vulnerability'],
  },

  // ── INFRASTRUCTURE / ORACLES ─────────────────────────
  {
    id: 'art029',
    slug: 'infra-chainlink-staking-v02-launch-security-model-art029',
    title: 'Chainlink Staking v0.2 Launch: What the Security Model Actually Provides',
    excerpt: 'The updated Chainlink staking mechanism introduces alerting rewards and node operator slashing — but the security guarantees are more limited than the marketing suggests.',
    body: BODY_TEMPLATE(
      'Chainlink Staking v0.2 allows LINK token holders to stake up to 15,000 LINK in a community staking pool, earning 4.5% APY. In exchange, stakers act as an alerting layer — they can flag node operators that fail to update prices within a specified time window and earn a portion of the slashed operator stake.',
      'The slashing mechanism caps penalties at 5% of operator stake for a single liveness failure. This is a meaningful economic deterrent but not catastrophic to well-capitalised operators. The more significant security contribution is the alerting layer: the faster a price manipulation or outage is detected, the lower the potential damage to downstream protocols.',
      'The fundamental limitation is that Chainlink staking v0.2 does not provide a safety guarantee equivalent to slashing in PoS consensus. A colluding set of Chainlink nodes can still report false prices — the staking system does not prevent this; it only penalises liveness failures, not safety violations.'
    ),
    category: 'infrastructure/oracles',
    tier1: 'infrastructure',
    coverImage: 'https://picsum.photos/seed/art029/800/450',
    publishedAt: '2026-05-26T06:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Chainlink Blog',
    isBreaking: false,
    isFeatured: true,
    isSponsor: false,
    tags: ['chainlink', 'oracles', 'staking', 'security'],
  },
  {
    id: 'art030',
    slug: 'infra-pyth-network-pull-oracle-model-defi-impact-art030',
    title: 'Pyth Network\'s Pull Oracle Model Is Changing DeFi Gas Economics',
    excerpt: 'The pull-based oracle model reduces on-chain gas costs by 94% versus push-based alternatives, fundamentally changing the economic viability of oracle-dependent protocols.',
    body: BODY_TEMPLATE(
      'Pyth Network\'s pull oracle model — where consumers request price updates only when needed rather than receiving continuous pushes — has been adopted by 124 DeFi protocols across 40 chains. The model reduces aggregate oracle gas costs from $180M annually (estimated for push-based equivalent) to $11M.',
      'The technical trade-off is confidence interval latency. Pyth prices are updated every 400ms on Pythnet (Solana fork) and relayed on-demand to other chains. The relay latency averages 1.2 seconds on Arbitrum and 2.8 seconds on Ethereum L1, which is acceptable for most lending and AMM use cases but insufficient for high-frequency options protocols.',
      'The adoption curve suggests Pyth will surpass Chainlink in total protocol integrations by Q3 2026. However, Chainlink maintains its dominance in high-value DeFi protocols ($100M+ TVL) where the push-model\'s continuous pricing is worth the gas premium for safety-critical applications.'
    ),
    category: 'infrastructure/oracles',
    tier1: 'infrastructure',
    coverImage: 'https://picsum.photos/seed/art030/800/450',
    publishedAt: '2026-05-25T07:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Messari',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['pyth', 'oracles', 'gas', 'infrastructure'],
  },

  // ── INFRASTRUCTURE / BRIDGES ─────────────────────────
  {
    id: 'art031',
    slug: 'infra-layerzero-v2-architecture-bridge-security-art031',
    title: 'LayerZero v2 Architecture: How the Security Model Evolved',
    excerpt: 'LayerZero v2 separates message verification from execution, allowing applications to choose their own security model — a fundamental shift from v1\'s opinionated design.',
    body: BODY_TEMPLATE(
      'LayerZero v2 introduces the Decentralised Verifier Network (DVN) model, replacing v1\'s fixed Oracle + Relayer security model. Applications can now configure their own verification requirements — choosing from a menu of DVNs or implementing custom verification logic.',
      'The practical result is security flexibility at the cost of complexity. A protocol can achieve Chainlink oracle-level security for high-value transactions and reduce to a single fast DVN for low-value messages. This configurability is valuable but creates a new attack surface: misconfigured DVN settings are already appearing in audit findings.',
      'LayerZero has processed $38B in cross-chain message value since v2 launch in January 2026, with zero security incidents to date. The 6-month track record is encouraging but insufficient to validate the security model against sophisticated attackers. Bridge security has a history of vulnerabilities emerging months or years after launch.'
    ),
    category: 'infrastructure/bridges',
    tier1: 'infrastructure',
    coverImage: 'https://picsum.photos/seed/art031/800/450',
    publishedAt: '2026-05-25T16:00:00Z',
    readTimeMin: 8,
    sourceAttribution: 'AI · Based on The Defiant',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['layerzero', 'bridges', 'cross-chain', 'security'],
  },
  {
    id: 'art032',
    slug: 'infra-across-protocol-fastest-bridge-intent-art032',
    title: 'Across Protocol Becomes Fastest EVM Bridge With Intent Architecture',
    excerpt: 'Intent-based bridging allows Across to settle cross-chain transfers in under 2 seconds for most L2-to-L2 routes — 20× faster than optimistic bridge competitors.',
    body: BODY_TEMPLATE(
      'Across Protocol has processed $4.8B in bridge volume in Q1 2026 using an intent-based architecture where professional relayers (called "fillers") pre-fund transfers on the destination chain and are reimbursed by the protocol\'s hub contract on Ethereum. The result is sub-2-second settlement times for most L2-to-L2 routes.',
      'The hub-and-spoke model concentrates settlement risk in the Ethereum hub contract but eliminates the trust assumptions of lock-and-mint bridge designs. The protocol\'s UMA-based optimistic verification allows disputes to be raised within a 2-hour challenge window if a filler provides incorrect funds.',
      'Filler competition is healthy. There are currently 18 active fillers on Across, creating a competitive market for bridge pricing. Average bridge fees have declined from 0.12% to 0.06% over the past 6 months as filler competition intensifies and capital efficiency improves.'
    ),
    category: 'infrastructure/bridges',
    tier1: 'infrastructure',
    coverImage: 'https://picsum.photos/seed/art032/800/450',
    publishedAt: '2026-05-24T08:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on CoinDesk',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['across', 'bridges', 'intent', 'l2'],
  },

  // ── INFRASTRUCTURE / LAYER 2 ─────────────────────────
  {
    id: 'art033',
    slug: 'infra-ethereum-pectra-upgrade-validator-efficiency-art033',
    title: 'Ethereum Pectra Upgrade Boosts Validator Efficiency by 40%',
    excerpt: 'The Pectra hard fork introduces EIP-7251 (MaxEB), EIP-7702 (account abstraction), and EIP-7549 (attestation consolidation), materially reducing validator set overhead.',
    body: BODY_TEMPLATE(
      'Ethereum\'s Pectra upgrade, activated at epoch 364032, has reduced validator set operational overhead by 40% through EIP-7251 (raising maximum effective balance to 2048 ETH) and EIP-7549 (attestation committee consolidation). The combined effect reduces beacon chain bandwidth requirements by 28%.',
      'EIP-7702 — the account abstraction addition that allows EOAs to temporarily act as smart contract wallets — has seen 340,000 transactions in the first 72 hours post-fork. The most common use case is gas sponsorship: DApps covering user gas fees to reduce onboarding friction.',
      'The validator consolidation enabled by MaxEB creates a secondary market for validator slot consolidation services, as operators running 100× 32 ETH validators may prefer to consolidate into 3–4 large validators. This reduces operational costs by ~70% while maintaining equivalent staking rewards.'
    ),
    category: 'infrastructure/layer2',
    tier1: 'infrastructure',
    coverImage: 'https://picsum.photos/seed/art033/800/450',
    publishedAt: '2026-05-27T03:00:00Z',
    readTimeMin: 7,
    sourceAttribution: 'AI · Based on Ethereum Blog',
    isBreaking: true,
    isFeatured: false,
    isSponsor: false,
    tags: ['ethereum', 'pectra', 'upgrade', 'layer2'],
  },
  {
    id: 'art034',
    slug: 'infra-zksync-era-stage-1-decentralisation-art034',
    title: 'zkSync Era Achieves Stage 1 Decentralisation — What Changed',
    excerpt: 'Matter Labs has transferred sequencer control to a multisig-governed validator set, marking a significant milestone in the L2 decentralisation roadmap.',
    body: BODY_TEMPLATE(
      'zkSync Era has reached Stage 1 rollup decentralisation as defined by L2Beat, following the activation of the Security Council multisig that can override protocol upgrades in emergency scenarios. The transition reduces but does not eliminate the trust requirement in Matter Labs as the primary upgrade authority.',
      'Stage 1 requires: a multisig with at least 50% honest members able to override upgrades, a minimum 7-day upgrade delay, and no single party able to freeze the rollup unilaterally. zkSync now meets all three criteria, joining Optimism, Arbitrum, and Scroll in the Stage 1 category.',
      'The path to Stage 2 (full decentralisation) requires a permissionless proving system where anyone can submit validity proofs. Matter Labs has indicated this will require another 12–18 months of ZK proof system optimisation before the proving time is economically viable for decentralised provers.'
    ),
    category: 'infrastructure/layer2',
    tier1: 'infrastructure',
    coverImage: 'https://picsum.photos/seed/art034/800/450',
    publishedAt: '2026-05-25T10:00:00Z',
    readTimeMin: 6,
    sourceAttribution: 'AI · Based on L2Beat',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['zksync', 'layer2', 'decentralisation', 'rollup'],
  },

  // ── SPONSORED ────────────────────────────────────────
  {
    id: 'art035',
    slug: 'sponsored-defilabs-institutional-api-launch-art035',
    title: '[Sponsored] DefiLabs Launches Institutional-Grade DeFi Data API',
    excerpt: 'DefiLabs\' new API provides real-time on-chain data for 200+ DeFi protocols with 99.9% uptime SLA and institutional data licensing.',
    body: BODY_TEMPLATE(
      'DefiLabs today announced the public availability of its institutional-grade DeFi data API, offering real-time and historical data for 200+ protocols across 12 EVM chains. The API includes protocol TVL, fee revenue, volume, user metrics, and token holder distributions.',
      'The API architecture uses a combination of indexed on-chain data (via The Graph), direct RPC calls for real-time state, and a proprietary normalisation layer that provides consistent metric definitions across protocols. Response times average 80ms for real-time queries and 12ms for cached historical data.',
      'Pricing starts at $800/month for the Growth tier (10M API calls/month) and scales to custom enterprise agreements for high-volume institutional users. A free developer tier with 100,000 monthly calls is available for builders and researchers.'
    ),
    category: 'sponsored-articles',
    tier1: 'sponsored-articles',
    coverImage: 'https://picsum.photos/seed/art035/800/450',
    publishedAt: '2026-05-22T09:00:00Z',
    readTimeMin: 4,
    sourceAttribution: 'Sponsored Content',
    isBreaking: false,
    isFeatured: false,
    isSponsor: true,
    tags: ['sponsored', 'data', 'api', 'institutional'],
  },

  // ── PRESS RELEASE ────────────────────────────────────
  {
    id: 'art036',
    slug: 'press-release-aave-labs-grants-program-10m-art036',
    title: 'Aave Labs Announces $10M Ecosystem Grants Program for DeFi Builders',
    excerpt: 'The Aave Grants DAO is expanding its mandate with a new $10M allocation targeting cross-chain DeFi tooling, risk management infrastructure, and educational resources.',
    body: BODY_TEMPLATE(
      'Aave Labs today announced a $10M ecosystem grants program through the Aave Grants DAO, with a particular focus on three priority areas: cross-chain DeFi tooling ($4M), risk management infrastructure ($3M), and educational resources for protocol developers ($3M).',
      'Grant sizes will range from $10,000 seed grants for early-stage builders to $500,000 milestone-based grants for established teams building critical infrastructure. Applications open on June 1, 2026, with a rolling review process that targets 4-week decision timelines.',
      'The program is funded from Aave\'s protocol fee revenue, which has generated $82M year-to-date in 2026. The grants represent approximately 12% of annualised fee revenue — a meaningful commitment that positions Aave as one of DeFi\'s most significant ecosystem funders.'
    ),
    category: 'press-release',
    tier1: 'press-release',
    coverImage: 'https://picsum.photos/seed/art036/800/450',
    publishedAt: '2026-05-20T08:00:00Z',
    readTimeMin: 4,
    sourceAttribution: 'Press Release · Aave Labs',
    isBreaking: false,
    isFeatured: false,
    isSponsor: false,
    tags: ['aave', 'grants', 'ecosystem', 'press-release'],
  },
]

export function getArticlesByTier1(tier1: string): Article[] {
  return MOCK_ARTICLES.filter((a) => a.tier1 === tier1)
}

export function getArticlesByCategory(category: string): Article[] {
  return MOCK_ARTICLES.filter((a) => a.category === category)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return MOCK_ARTICLES.find((a) => a.slug === slug)
}

export function getFeaturedArticle(tier1?: string): Article {
  const pool = tier1
    ? MOCK_ARTICLES.filter((a) => a.tier1 === tier1)
    : MOCK_ARTICLES
  return pool.find((a) => a.isFeatured) ?? pool[0]
}

export function getLatestArticles(count = 10, tier1?: string): Article[] {
  const pool = tier1
    ? MOCK_ARTICLES.filter((a) => a.tier1 === tier1)
    : MOCK_ARTICLES
  return pool
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count)
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  return MOCK_ARTICLES.filter(
    (a) => a.tier1 === article.tier1 && a.slug !== article.slug
  ).slice(0, count)
}

export function toPreview(article: Article): import('@/lib/types').ArticlePreview {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, ...preview } = article
  return preview
}
