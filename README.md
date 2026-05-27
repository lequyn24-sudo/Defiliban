# Defiliban — Project Specification v2.0

> AI-Powered Crypto & Web3 News Platform  
> Stack: Next.js 14 · Supabase · Claude API · Vercel  
> Language: English · Target: Global audience

---

## Document Index

| File | Chapter | Description |
|------|---------|-------------|
| `SPEC.md` | 1–9 | Full product spec (executive summary → deploy) |
| `ARCHITECTURE.md` | 2 | System diagram, AI pipeline, data flow |
| `API.md` | 6 | All API endpoints with request/response |
| `DATAMODEL.md` | 6 | Supabase schema, SQL migrations, TypeScript types |
| `DESIGN_SYSTEM.md` | 4 | Design tokens, components, responsive rules |
| `SECURITY.md` | 7 | Auth, RBAC, RLS policies, security headers |
| `TESTING.md` | 9 | Test strategy, CI/CD pipeline, Vercel config |
| `AI_PIPELINE.md` | — | RSS ingestion → Claude → Admin review workflow |
| `ADMIN_DASHBOARD.md` | — | Admin panel spec for article management |
| `package.json` | — | Dependencies, ready for `npm install` |
| `.env.example` | — | All required environment variables |
| `.gitignore` | — | Standard Next.js gitignore |
| `defiliban-brand-guideline.html` | 4 | Visual brand guide |

---

## Architecture at a glance

```
RSS Feeds (CoinDesk, Decrypt...)
    ↓ Vercel Cron (every 2h)
RSS Ingestion Pipeline
    ↓ Deduplicate + filter
Claude API (claude-sonnet-4-5)
    ↓ Rewrite + add insight
Supabase (articles table, status=draft)
    ↓ Admin reviews in dashboard
Admin approves → status=published
    ↓ ISR revalidation
Next.js frontend → Vercel CDN → Readers
```

---

## Quick Start (after implementation)

```bash
# 1. Clone and install
git clone https://github.com/your-org/defiliban.git
cd defiliban
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in: Supabase, Claude API, Resend keys

# 3. Run database migrations
npx supabase db push

# 4. Start development
npm run dev

# 5. Seed with first articles
npm run pipeline:run
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Connect GitHub repo for automatic preview deploys on every PR.

---

*Spec v2.0 — May 2026 — English-only · AI-generated content · Claude API*
