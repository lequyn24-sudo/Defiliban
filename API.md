# API.md — Defiliban API Reference
> Version 1.0 · May 2026

All API routes live under `/api/`. They are Next.js Route Handlers (Edge Runtime where noted).

---

## Authentication

Protected routes require a valid Supabase JWT in the `Authorization` header:

```
Authorization: Bearer <supabase_access_token>
```

The Supabase JS client (`@supabase/ssr`) handles this automatically when using `createServerClient()` in server components and route handlers.

---

## Prices

### `GET /api/prices`

Returns cached top-20 crypto prices.  
**Cache:** 30 seconds (Vercel Edge Cache + `revalidate` header)  
**Runtime:** Edge

**Response `200`:**
```json
{
  "data": [
    {
      "id": "bitcoin",
      "symbol": "BTC",
      "name": "Bitcoin",
      "current_price": 98420,
      "price_change_percentage_24h": 2.4,
      "market_cap": 1940000000000,
      "total_volume": 48000000000,
      "image": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png"
    }
  ],
  "updated_at": "2026-05-27T14:32:00Z",
  "is_stale": false
}
```

**Error `503` (CoinGecko down, returns last known cache):**
```json
{
  "data": [...],
  "updated_at": "2026-05-27T14:00:00Z",
  "is_stale": true,
  "stale_reason": "upstream_unavailable"
}
```

---

### `GET /api/prices/[coinId]`

Single coin detail including 7-day sparkline.  
**Cache:** 60 seconds

**Params:** `coinId` — CoinGecko coin id (e.g. `bitcoin`, `ethereum`)

**Response `200`:**
```json
{
  "id": "bitcoin",
  "symbol": "BTC",
  "name": "Bitcoin",
  "current_price": 98420,
  "price_change_percentage_24h": 2.4,
  "price_change_percentage_7d": 8.2,
  "market_cap": 1940000000000,
  "market_cap_rank": 1,
  "total_volume": 48000000000,
  "circulating_supply": 19700000,
  "max_supply": 21000000,
  "ath": 109000,
  "ath_date": "2026-01-20T00:00:00Z",
  "sparkline_7d": [92000, 94000, 96000, 95000, 97000, 98000, 98420]
}
```

**Error `404`:**
```json
{ "error": "coin_not_found", "message": "No coin with id 'xxxxx'" }
```

---

## Newsletter

### `POST /api/newsletter/subscribe`

**Rate limit:** 3 requests per IP per hour  
**Runtime:** Edge

**Request body:**
```json
{
  "email": "reader@example.com",
  "locale": "vi"
}
```

**Validation:**
- `email`: required, valid email format, max 254 chars
- `locale`: optional, `"vi"` | `"en"`, defaults to `"vi"`

**Response `200` (new subscriber, confirmation email sent):**
```json
{
  "status": "pending",
  "message": "Confirmation email sent. Please check your inbox."
}
```

**Response `200` (already subscribed and active):**
```json
{
  "status": "already_active",
  "message": "You are already subscribed."
}
```

**Response `422` (validation error):**
```json
{
  "error": "validation_error",
  "fields": { "email": "Invalid email address" }
}
```

**Response `429` (rate limited):**
```json
{
  "error": "rate_limited",
  "message": "Too many requests. Try again in 60 minutes.",
  "retry_after": 3600
}
```

---

### `GET /api/newsletter/unsubscribe?token=[token]`

One-click unsubscribe from email link.  
**Auth:** Token in query param (no JWT required)

**Response:** Redirects to `/newsletter/unsubscribed` page on success.

**Response `400`:**
```json
{ "error": "invalid_token", "message": "Unsubscribe link is invalid or expired." }
```

---

## Articles (Passthrough from Sanity)

These endpoints are thin wrappers around Sanity GROQ queries, adding server-side caching.

### `GET /api/articles`

**Query params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `locale` | `vi\|en` | `vi` | Content language |
| `category` | string | — | Filter by category slug |
| `tag` | string | — | Filter by tag |
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Items per page (max 50) |
| `featured` | boolean | — | Only featured articles |

**Response `200`:**
```json
{
  "data": [
    {
      "_id": "sanity-doc-id",
      "slug": "blackrock-bitcoin-etf-50b",
      "title": "BlackRock's Bitcoin ETF crosses $50B AUM",
      "excerpt": "The iShares Bitcoin Trust...",
      "category": { "slug": "markets", "label": "Markets" },
      "author": { "name": "Sarah Chen", "slug": "sarah-chen", "avatar": "..." },
      "coverImage": { "url": "...", "alt": "..." },
      "publishedAt": "2026-05-27T12:04:00Z",
      "readTimeMin": 12,
      "tags": ["bitcoin", "etf", "blackrock"],
      "isBreaking": true,
      "isFeatured": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "pages": 8,
    "has_next": true
  }
}
```

---

### `GET /api/articles/[slug]`

**Cache:** Revalidated on demand via Sanity webhook

**Response `200`:**
```json
{
  "_id": "sanity-doc-id",
  "slug": "blackrock-bitcoin-etf-50b",
  "title": "BlackRock's Bitcoin ETF crosses $50B AUM",
  "excerpt": "...",
  "body": [...],
  "category": { "slug": "markets", "label": "Markets" },
  "author": {
    "name": "Sarah Chen",
    "slug": "sarah-chen",
    "avatar": "...",
    "bio": "...",
    "twitter": "@sarahchen"
  },
  "coverImage": { "url": "...", "alt": "...", "caption": "..." },
  "publishedAt": "2026-05-27T12:04:00Z",
  "updatedAt": "2026-05-27T13:00:00Z",
  "readTimeMin": 12,
  "tags": ["bitcoin", "etf"],
  "relatedCoins": ["bitcoin"],
  "isBreaking": true,
  "related": [
    { "slug": "...", "title": "...", "coverImage": "..." }
  ]
}
```

---

## Bookmarks (Auth required)

### `GET /api/bookmarks`

**Response `200`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "article_id": "sanity-id",
      "article_slug": "...",
      "article_title": "...",
      "article_image": "...",
      "saved_at": "2026-05-27T10:00:00Z"
    }
  ],
  "total": 14
}
```

---

### `POST /api/bookmarks`

**Request body:**
```json
{
  "article_id": "sanity-doc-id",
  "article_slug": "blackrock-bitcoin-etf-50b",
  "article_title": "BlackRock's Bitcoin ETF crosses $50B AUM",
  "article_image": "https://cdn.sanity.io/..."
}
```

**Response `201`:**
```json
{ "id": "uuid", "saved_at": "2026-05-27T14:32:00Z" }
```

**Response `409` (already bookmarked):**
```json
{ "error": "already_bookmarked" }
```

---

### `DELETE /api/bookmarks/[articleId]`

**Response `204`:** No content

**Response `404`:**
```json
{ "error": "bookmark_not_found" }
```

---

## Reads

### `POST /api/reads`

Called automatically after user reads an article for ≥ 30 seconds.

**Request body:**
```json
{
  "article_id": "sanity-doc-id",
  "article_slug": "...",
  "read_duration_sec": 480
}
```

**Response `200`:** `{ "recorded": true }`

---

## User

### `GET /api/user/profile`

**Response `200`:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "display_name": "Nguyễn Văn A",
  "avatar_url": null,
  "locale": "vi",
  "theme": "dark",
  "ticker_enabled": true,
  "created_at": "2026-01-01T00:00:00Z"
}
```

---

### `PUT /api/user/settings`

**Request body (partial update):**
```json
{
  "locale": "en",
  "theme": "light",
  "ticker_enabled": false,
  "display_name": "Sarah"
}
```

**Response `200`:** Updated profile object.

---

## Revalidation (Internal)

### `POST /api/revalidate`

Called by Sanity webhook on article publish/update.  
**Auth:** `x-sanity-webhook-signature` header validated against `SANITY_WEBHOOK_SECRET`

**Request body:**
```json
{
  "_type": "article",
  "slug": { "current": "blackrock-bitcoin-etf-50b" }
}
```

**Response `200`:**
```json
{ "revalidated": true, "path": "/vi/bai-viet/blackrock-bitcoin-etf-50b" }
```

---

## Error Format

All errors follow this structure:

```json
{
  "error": "error_code_snake_case",
  "message": "Human-readable description",
  "details": {}
}
```

**HTTP Status codes used:**
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No content (delete) |
| 400 | Bad request |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Not found |
| 409 | Conflict (duplicate) |
| 422 | Validation error |
| 429 | Rate limited |
| 500 | Internal server error |
| 503 | Upstream service unavailable |
