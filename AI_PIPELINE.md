# AI_PIPELINE.md — RSS → Claude → Supabase Pipeline
> Version 1.0 · May 2026

## Overview
Every 2 hours, Vercel Cron triggers /api/pipeline/run which:
1. Fetches RSS feeds from all configured sources
2. Deduplicates against already-processed articles
3. Sends each new article to Claude API for rewriting
4. Saves rewritten draft to Supabase (status=draft)
5. Admin notified if queue > 10 pending

## RSS Sources Table (Supabase)
```sql
create table public.rss_sources (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  url         text unique not null,
  category    text not null,
  is_active   boolean default true,
  last_fetched_at timestamptz,
  created_at  timestamptz default now()
);

-- Initial seed
insert into public.rss_sources (name, url, category) values
  ('CoinDesk',      'https://feeds.feedburner.com/CoinDesk',     'auto'),
  ('The Defiant',   'https://thedefiant.io/feed',                'protocols'),
  ('Decrypt',       'https://decrypt.co/feed',                   'auto'),
  ('Cointelegraph', 'https://cointelegraph.com/rss',             'auto'),
  ('Rekt News',     'https://rekt.news/rss.xml',                 'risk/exploits');
```

## Articles Table (Supabase)
```sql
create table public.articles (
  id              uuid default gen_random_uuid() primary key,
  title           text not null,
  slug            text unique not null,
  excerpt         text,
  body            text not null,
  category        text not null,
  status          text default 'draft'
                  check (status in ('draft','published','rejected','failed')),
  source_url      text unique not null,
  source_name     text not null,
  source_hash     text unique not null,  -- md5 of source_url for dedup
  cover_image     text,
  generated_at    timestamptz default now(),
  published_at    timestamptz,
  reviewed_by     uuid references public.profiles(id),
  reviewed_at     timestamptz,
  reject_reason   text,
  read_time_min   integer,
  word_count      integer,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index articles_status_idx on public.articles (status, generated_at desc);
create index articles_category_idx on public.articles (category);
create index articles_slug_idx on public.articles (slug);
```

## Pipeline Run Log
```sql
create table public.pipeline_runs (
  id              uuid default gen_random_uuid() primary key,
  started_at      timestamptz default now(),
  finished_at     timestamptz,
  articles_fetched integer default 0,
  articles_skipped integer default 0,
  articles_generated integer default 0,
  articles_failed  integer default 0,
  error_log       jsonb,
  status          text check (status in ('running','completed','failed'))
);
```

## Pipeline Route Handler
```typescript
// app/api/pipeline/run/route.ts
import { NextRequest } from 'next/server'
import Parser from 'rss-parser'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/service'
import { md5 } from '@/lib/utils/hash'

const parser = new Parser()
const anthropic = new Anthropic()

export async function POST(req: NextRequest) {
  // Validate cron secret
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = createClient() // service role
  const run = await supabase.from('pipeline_runs')
    .insert({ status: 'running' }).select().single()

  const { data: sources } = await supabase
    .from('rss_sources').select('*').eq('is_active', true)

  let generated = 0, skipped = 0, failed = 0

  for (const source of sources ?? []) {
    try {
      const feed = await parser.parseURL(source.url)

      for (const item of feed.items.slice(0, 10)) {
        const sourceHash = md5(item.link ?? '')

        // Dedup check
        const { data: exists } = await supabase
          .from('articles').select('id')
          .eq('source_hash', sourceHash).single()
        if (exists) { skipped++; continue }

        // Claude rewrite
        const msg = await anthropic.messages.create({
          model: 'claude-sonnet-4-5',
          max_tokens: 1024,
          system: `You are a DeFi protocol analyst writing for Defiliban. 
Write authoritative, precise analysis in English. No hype.
Return JSON: { title, excerpt, body, category, cover_image_query }
Category must be one of: protocols/dex, protocols/lending, protocols/derivatives,
protocols/stablecoins, protocols/governance, yield/staking, yield/farming,
yield/strategies, liquidity/pools, liquidity/capital-flows, liquidity/amm,
risk/exploits, risk/liquidations, risk/smart-contract,
infrastructure/oracles, infrastructure/bridges, infrastructure/layer2`,
          messages: [{
            role: 'user',
            content: `Rewrite for Defiliban. Add protocol context, on-chain implications, risk/opportunity assessment.
Source: ${item.title}\n\n${item.contentSnippet ?? item.content}`
          }]
        })

        const raw = msg.content[0].type === 'text' ? msg.content[0].text : ''
        const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())

        const slug = `${parsed.category.replace('/', '-')}-${
          parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)
        }-${Math.random().toString(36).slice(2, 8)}`

        await supabase.from('articles').insert({
          title: parsed.title,
          slug,
          excerpt: parsed.excerpt,
          body: parsed.body,
          category: parsed.category,
          source_url: item.link,
          source_name: source.name,
          source_hash: sourceHash,
          word_count: parsed.body.split(' ').length,
          read_time_min: Math.ceil(parsed.body.split(' ').length / 200),
        })
        generated++
      }
    } catch (err) {
      failed++
      console.error(`Pipeline error for ${source.name}:`, err)
    }
  }

  await supabase.from('pipeline_runs').update({
    status: 'completed',
    finished_at: new Date().toISOString(),
    articles_generated: generated,
    articles_skipped: skipped,
    articles_failed: failed,
  }).eq('id', run.data?.id)

  return Response.json({ generated, skipped, failed })
}
```

## Claude Prompt Template
System prompt is configurable per category via /admin/pipeline.
Default focuses on: technical depth, protocol comparison, risk assessment.
