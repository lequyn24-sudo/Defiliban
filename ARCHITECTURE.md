# ARCHITECTURE.md — See SPEC.md §2 for full system diagram
# Full version in Defiliban-spec.zip (previous session)
# Key addition v2.1: AI Pipeline architecture

## AI Pipeline Flow
RSS Sources → rss-parser → dedupe check (Supabase) → Claude API → articles (draft) → Admin queue → publish → ISR

## Vercel Cron config (vercel.json)
```json
{
  "crons": [{
    "path": "/api/pipeline/run",
    "schedule": "0 */2 * * *"
  }]
}
```
