# SECURITY.md — Security & Authentication
> Defiliban · Version 1.0 · May 2026

---

## Authentication Strategy

### Provider: Supabase Auth

Supabase Auth handles session management, token refresh, and OAuth. We use `@supabase/ssr` for server-side access.

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set({ name, value, ...options }) },
        remove(name, options) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )
}
```

### Session tokens

| Token | TTL | Storage | Rotation |
|-------|-----|---------|----------|
| Access token (JWT) | 1 hour | Memory | On every refresh |
| Refresh token | 7 days | httpOnly cookie, SameSite=Strict | On use (rotation enabled) |

### Supported auth methods

1. **Email + Password** — Supabase managed, bcrypt hashed
2. **Google OAuth** — via Supabase OAuth provider
3. *Magic link (future v2)* — not in MVP scope

---

## Role-Based Access Control (RBAC)

Roles are stored in `public.profiles.role` and checked server-side.

```typescript
// lib/auth/check-role.ts
import { createClient } from '@/lib/supabase/server'

export async function getUserRole() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile?.role ?? null
}

export async function requireRole(required: string[]) {
  const role = await getUserRole()
  if (!role || !required.includes(role)) {
    throw new Error('Insufficient permissions')
  }
  return role
}
```

### Permission matrix

| Action | guest | user | editor | admin |
|--------|-------|------|--------|-------|
| Read articles | ✓ | ✓ | ✓ | ✓ |
| View ticker | ✓ | ✓ | ✓ | ✓ |
| Subscribe newsletter | ✓ | ✓ | ✓ | ✓ |
| Bookmark articles | — | ✓ | ✓ | ✓ |
| Reading history | — | ✓ | ✓ | ✓ |
| Account settings | — | ✓ | ✓ | ✓ |
| Sanity Studio | — | — | ✓ | ✓ |
| Manage users | — | — | — | ✓ |
| View subscriber list | — | — | — | ✓ |
| Trigger revalidation | — | — | ✓ | ✓ |

---

## Middleware (Route Protection)

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/tai-khoan', '/account']
const AUTH_PATHS = ['/dang-nhap', '/dang-ky', '/login', '/register']
const EDITOR_PATHS = ['/studio']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* cookie helpers */ } }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = request.nextUrl

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))
  if (isProtected && !session) {
    const redirectUrl = new URL('/dang-nhap', request.url)
    redirectUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages
  const isAuthPage = AUTH_PATHS.some(p => pathname.startsWith(p))
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/tai-khoan', request.url))
  }

  // Editor/admin only paths
  const isEditorPath = EDITOR_PATHS.some(p => pathname.startsWith(p))
  if (isEditorPath && session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || !['editor', 'admin'].includes(profile.role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
```

---

## Security Headers

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob: cdn.sanity.io assets.coingecko.com *.supabase.co",
      "connect-src 'self' *.supabase.co api.coingecko.com vitals.vercel-insights.com",
      "frame-src 'self'",
    ].join('; ')
  },
]
```

---

## Input Validation (Zod)

All API routes validate input with Zod before processing:

```typescript
// lib/validations/newsletter.ts
import { z } from 'zod'

export const subscribeSchema = z.object({
  email: z.string().email('Invalid email').max(254),
  locale: z.enum(['vi', 'en']).optional().default('vi'),
})

// Usage in route handler:
const result = subscribeSchema.safeParse(body)
if (!result.success) {
  return Response.json(
    { error: 'validation_error', fields: result.error.flatten().fieldErrors },
    { status: 422 }
  )
}
```

---

## Rate Limiting

```typescript
// lib/rate-limit.ts
// Using Vercel KV (Redis) for distributed rate limiting

import { kv } from '@vercel/kv'

export async function rateLimit(
  identifier: string,   // IP or user ID
  limit: number,        // max requests
  window: number        // seconds
): Promise<{ success: boolean; remaining: number }> {
  const key = `rl:${identifier}`
  const count = await kv.incr(key)

  if (count === 1) {
    await kv.expire(key, window)
  }

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
  }
}
```

Rate limits by endpoint:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/newsletter/subscribe` | 3 req | 1 hour |
| `/api/auth/login` | 10 req | 15 min |
| `/api/prices` | 60 req | 1 min |
| Other `/api/*` | 100 req | 1 min |

---

## GDPR Compliance

- **Data minimization**: Only collect email for newsletter (no name required)
- **Consent**: Clear opt-in copy, double opt-in via email confirmation
- **Right to access**: Users can export their data from `/tai-khoan/cai-dat`
- **Right to erasure**: Account deletion deletes all Supabase data within 30 days
- **Data retention**: Reading history auto-purged after 90 days
- **Privacy policy**: Required at `/chinh-sach-bao-mat`
- **No third-party trackers**: Umami self-hosted analytics, no cookies
