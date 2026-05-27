# ADMIN_DASHBOARD.md — Admin Review Dashboard Spec
> Version 1.0 · May 2026

---

## Overview

The admin dashboard at `/admin` is where editors review AI-generated article drafts and publish them to the live site. Built with Next.js App Router, protected by role check (editor/admin).

---

## Pages

### `/admin` — Dashboard Home

```
┌─────────────────────────────────────────────────────────┐
│  Defiliban Admin                          [editor@...]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │   Pending    │ │  Published   │ │  Pipeline    │   │
│  │     14       │ │   today: 8   │ │  Last: 2h ago│   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│  [Review Queue →]  [Pipeline Config →]                  │
└─────────────────────────────────────────────────────────┘
```

### `/admin/queue` — Review Queue

```
┌─────────────────────────────────────────────────────────────────────┐
│  Review Queue (14 pending)           [Bulk reject] [Run pipeline]   │
├────────────────────────────────┬──────────────┬──────────┬──────────┤
│  Title                         │  Category    │  Source  │  Action  │
├────────────────────────────────┼──────────────┼──────────┼──────────┤
│  Uniswap v5 Intent-Based...    │ protocols/dex│ CoinDesk │ [Review] │
│  Aave V4 Launches on Base...   │ prot/lending │ Decrypt  │ [Review] │
│  Lido Slashing Event Post...   │ risk/exploit │ Rekt     │ [Review] │
│  ...                           │ ...          │ ...      │ ...      │
└────────────────────────────────┴──────────────┴──────────┴──────────┘
```

- Sorted by `generated_at DESC` (newest first)
- Filter by category dropdown
- Each row: checkbox for bulk actions
- [Review] → opens `/admin/article/[id]`

### `/admin/article/[id]` — Review & Edit

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to queue                                            │
│                                                             │
│  Category:  [protocols/dex ▼]        Source: CoinDesk      │
│  Source URL: https://coindesk.com/...          [Open ↗]    │
│                                                             │
│  Title:                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Uniswap v5 Launches Intent-Based Trading...         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Excerpt:                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ The new version introduces a solver network...      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Body: (Markdown editor)                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [rendered preview of article body]                  │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Word count: 487 · Read time: ~3 min                       │
│  Generated: 2 hours ago                                    │
│                                                             │
│  [Reject ✕]                           [Approve & Publish ✓]│
└─────────────────────────────────────────────────────────────┘
```

**Approve flow:**
1. Click [Approve & Publish]
2. `status = published`, `published_at = now()`, `reviewed_by = user.id`
3. POST `/api/revalidate` to clear ISR cache for category page
4. Toast: "Published — [View article ↗]"
5. Auto-advance to next draft in queue

**Reject flow:**
1. Click [Reject ✕]
2. Modal: "Reason (optional)" text field
3. `status = rejected`, `reject_reason = text`
4. Auto-advance to next draft

### `/admin/pipeline` — Pipeline Config

Shows:
- RSS source list (enable/disable per source)
- Cron schedule display (every 2h)
- [Run pipeline now] button → POST /api/pipeline/run
- Last 10 pipeline run logs (articles_generated, articles_failed, duration)
- Claude prompt template editor (for admin role only)

---

## API Routes (Admin)

```typescript
// GET /api/admin/queue — list pending drafts
// Auth: editor+ required

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { data } = await supabase
    .from('articles')
    .select('id, title, category, source_name, generated_at, word_count')
    .eq('status', 'draft')
    .order('generated_at', { ascending: false })
  return Response.json({ data })
}

// POST /api/admin/approve/[id]
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await requireRole(['editor', 'admin'])
  const supabase = createClient()
  const user = await getUser()

  await supabase.from('articles').update({
    status: 'published',
    published_at: new Date().toISOString(),
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
  }).eq('id', params.id)

  // Trigger ISR revalidation
  const { category } = await getArticleCategory(params.id)
  await revalidatePath(`/${category}`)
  await revalidatePath('/')

  return Response.json({ published: true })
}

// POST /api/admin/reject/[id]
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await requireRole(['editor', 'admin'])
  const { reason } = await req.json()
  const supabase = createClient()

  await supabase.from('articles').update({
    status: 'rejected',
    reject_reason: reason ?? null,
    reviewed_at: new Date().toISOString(),
  }).eq('id', params.id)

  return Response.json({ rejected: true })
}
```
