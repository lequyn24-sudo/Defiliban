# DATAMODEL.md — Database Schema & ERD
> Defiliban · Supabase (PostgreSQL) · Version 1.0

---

## ERD (Entity Relationship Diagram)

```
┌─────────────────────┐         ┌──────────────────────┐
│   auth.users        │         │   public.profiles    │
│  (Supabase managed) │ 1 ──── 1│                      │
│  id: uuid (PK)      │         │  id: uuid (FK→auth)  │
│  email: text        │         │  display_name: text  │
│  ...                │         │  role: text          │
└─────────────────────┘         │  locale: text        │
                                │  theme: text         │
                                │  ticker_enabled: bool│
                                │  created_at: ts      │
                                └────────┬─────────────┘
                                         │
                          ┌──────────────┴───────────────┐
                          │                              │
               ┌──────────▼──────────┐     ┌────────────▼────────────┐
               │  public.bookmarks   │     │   public.reads          │
               │                     │     │                         │
               │  id: uuid (PK)      │     │  id: uuid (PK)          │
               │  user_id: uuid (FK) │     │  user_id: uuid (FK)     │
               │  article_id: text   │     │  article_id: text       │
               │  article_slug: text │     │  article_slug: text     │
               │  article_title: text│     │  read_at: timestamptz   │
               │  article_image: text│     │  read_duration_sec: int │
               │  saved_at: ts       │     │                         │
               │  UNIQUE(user,article)│    │  UNIQUE(user,article)   │
               └─────────────────────┘     └─────────────────────────┘

┌──────────────────────────┐
│  public.subscribers      │
│                          │
│  id: uuid (PK)           │
│  email: text UNIQUE      │
│  status: text            │
│    (pending/active/      │
│     unsubscribed)        │
│  locale: text            │
│  confirm_token: text     │
│  confirmed_at: ts        │
│  unsubscribed_at: ts     │
│  created_at: ts          │
└──────────────────────────┘

Note: Articles, Authors, Categories are stored in Sanity CMS (not Postgres).
Bookmarks and Reads store article metadata denormalized for performance
(no join to Sanity needed when listing saved articles).
```

---

## Full SQL Migration

```sql
-- ============================================================
-- Migration: 001_initial_schema.sql
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── PROFILES ──────────────────────────────────────────────────
create table public.profiles (
  id              uuid references auth.users on delete cascade primary key,
  email           text unique not null,
  display_name    text,
  avatar_url      text,
  role            text not null default 'user'
                  constraint profiles_role_check
                  check (role in ('user', 'editor', 'admin')),
  locale          text not null default 'vi'
                  constraint profiles_locale_check
                  check (locale in ('vi', 'en')),
  theme           text not null default 'system'
                  constraint profiles_theme_check
                  check (theme in ('light', 'dark', 'system')),
  ticker_enabled  boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.profiles is 'Extended user profile, linked to auth.users';
comment on column public.profiles.role is 'user | editor | admin';

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── BOOKMARKS ─────────────────────────────────────────────────
create table public.bookmarks (
  id              uuid not null default gen_random_uuid() primary key,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  article_id      text not null,
  article_slug    text not null,
  article_title   text not null,
  article_image   text,
  saved_at        timestamptz not null default now(),
  constraint bookmarks_user_article_unique unique (user_id, article_id)
);

comment on table public.bookmarks is 'User-saved articles. article_* fields denormalized from Sanity.';

create index bookmarks_user_id_idx on public.bookmarks (user_id);
create index bookmarks_saved_at_idx on public.bookmarks (saved_at desc);


-- ── READS ─────────────────────────────────────────────────────
create table public.reads (
  id                  uuid not null default gen_random_uuid() primary key,
  user_id             uuid not null references public.profiles(id) on delete cascade,
  article_id          text not null,
  article_slug        text not null,
  read_at             timestamptz not null default now(),
  read_duration_sec   integer,
  constraint reads_user_article_unique unique (user_id, article_id)
);

comment on table public.reads is 'Articles the user has read (auto-tracked after 30s). Retained 90 days.';

create index reads_user_id_idx on public.reads (user_id);
create index reads_read_at_idx on public.reads (read_at desc);

-- Auto-purge reads older than 90 days (run via pg_cron or Supabase scheduled function)
-- create extension if not exists "pg_cron";
-- select cron.schedule('purge-old-reads', '0 3 * * *',
--   $$ delete from public.reads where read_at < now() - interval '90 days' $$
-- );


-- ── SUBSCRIBERS ───────────────────────────────────────────────
create table public.subscribers (
  id                  uuid not null default gen_random_uuid() primary key,
  email               text unique not null,
  status              text not null default 'pending'
                      constraint subscribers_status_check
                      check (status in ('pending', 'active', 'unsubscribed')),
  locale              text not null default 'vi'
                      constraint subscribers_locale_check
                      check (locale in ('vi', 'en')),
  confirm_token       text unique,
  confirmed_at        timestamptz,
  unsubscribed_at     timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.subscribers is 'Newsletter subscribers. Double opt-in via confirm_token.';

create index subscribers_email_idx on public.subscribers (email);
create index subscribers_status_idx on public.subscribers (status);

create trigger subscribers_updated_at
  before update on public.subscribers
  for each row execute procedure public.handle_updated_at();


-- ============================================================
-- Migration: 002_rls_policies.sql
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles    enable row level security;
alter table public.bookmarks   enable row level security;
alter table public.reads       enable row level security;
alter table public.subscribers enable row level security;


-- ── PROFILES RLS ──────────────────────────────────────────────
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can view all profiles
create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );


-- ── BOOKMARKS RLS ─────────────────────────────────────────────
create policy "bookmarks_all_own"
  on public.bookmarks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── READS RLS ─────────────────────────────────────────────────
create policy "reads_all_own"
  on public.reads for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── SUBSCRIBERS RLS ───────────────────────────────────────────
-- No user auth needed for subscription (public form)
-- Only service role can read/update (API routes use service_role key)
-- No RLS policies → service_role bypasses RLS by default

-- Admins can read via dashboard
create policy "subscribers_select_admin"
  on public.subscribers for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
```

---

## Sanity Content Schema

Content is stored in Sanity (not Postgres). Documents are fetched via GROQ queries.

### Document types

```
article       → Published news articles (bilingual)
author        → Writers/contributors
category      → DeFi, Markets, Web3, Policy, Research
tag           → Flexible tagging
siteSettings  → Global config (site name, social links, etc.)
```

### GROQ Query Examples

```groq
// Fetch latest articles for homepage
*[_type == "article" && publishedAt <= now()]
  | order(publishedAt desc)[0...10] {
  _id,
  "slug": slug.current,
  "title": title_vi,
  "excerpt": excerpt_vi,
  "category": category->{ "slug": slug.current, "label": label_vi },
  "author": author->{ name, "slug": slug.current, "avatar": avatar.asset->url },
  "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt },
  publishedAt,
  isBreaking,
  isFeatured,
  tags
}

// Fetch single article by slug
*[_type == "article" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  "title": title_vi,
  "excerpt": excerpt_vi,
  body_vi,
  "category": category->{ "slug": slug.current, "label": label_vi },
  "author": author->{ name, "slug": slug.current, avatar, bio_vi, twitter },
  "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt, caption },
  publishedAt,
  updatedAt,
  isBreaking,
  relatedCoins,
  tags,
  "related": *[_type == "article" && category._ref == ^.category._ref && _id != ^._id]
    | order(publishedAt desc)[0...3] {
    "slug": slug.current,
    "title": title_vi,
    "coverImage": { "url": coverImage.asset->url }
  }
}
```

---

## TypeScript Types

```typescript
// types/index.ts

export interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  body: PortableTextBlock[]
  category: Category
  author: Author
  coverImage: { url: string; alt: string; caption?: string }
  publishedAt: string
  updatedAt?: string
  readTimeMin: number
  tags: string[]
  relatedCoins: string[]
  isBreaking: boolean
  isFeatured: boolean
  related?: ArticlePreview[]
}

export interface ArticlePreview {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: Category
  author: Pick<Author, 'name' | 'slug'>
  coverImage: { url: string; alt: string }
  publishedAt: string
  readTimeMin: number
  isBreaking: boolean
  tags: string[]
}

export interface Author {
  name: string
  slug: string
  avatar: string
  bio: string
  twitter?: string
}

export interface Category {
  slug: 'markets' | 'defi' | 'web3' | 'policy' | 'research'
  label: string
}

export interface CoinPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

export interface UserProfile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  role: 'user' | 'editor' | 'admin'
  locale: 'vi' | 'en'
  theme: 'light' | 'dark' | 'system'
  ticker_enabled: boolean
  created_at: string
}

export interface Bookmark {
  id: string
  article_id: string
  article_slug: string
  article_title: string
  article_image: string | null
  saved_at: string
}
```
