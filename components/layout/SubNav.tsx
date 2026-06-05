'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCategoryMeta } from '@/lib/constants/categories'

export function SubNav() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const tier1Slug = segments[0] ?? ''
  const subSlug = segments[1] ?? ''
  const meta = getCategoryMeta(tier1Slug)
  const subcats = meta?.subcategories ?? []

  return (
    <div
      className="scrollbar-none"
      style={{
        height: '36px',
        background: 'var(--bg-surface2)',
        borderBottom: '1px solid var(--border)',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <div
        className="flex items-center h-full"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          minWidth: 'max-content',
        }}
      >
        {/* Breaking — always visible */}
        <SubNavLink
          href="/risk/exploits"
          label="Breaking"
          active={pathname === '/risk/exploits'}
          accent
        />

        {/* Context-sensitive subcategory links */}
        {subcats.map((sub) => (
          <SubNavLink
            key={sub.href}
            href={sub.href}
            label={sub.label}
            active={subSlug === sub.slug && pathname.includes(tier1Slug)}
          />
        ))}

        {/* Spacer */}
        <div style={{ flex: 1, minWidth: '16px' }} />

        {/* Permanent links */}
        <SubNavLink
          href="/cmc"
          label="CMC Data"
          active={pathname === '/cmc'}
        />
        <SubNavLink
          href="/sponsored-articles"
          label="Sponsored"
          active={pathname === '/sponsored-articles'}
        />
        <SubNavLink
          href="/press-release"
          label="Press Release"
          active={pathname === '/press-release'}
        />
      </div>
    </div>
  )
}

function SubNavLink({
  href,
  label,
  active,
  accent,
}: {
  href: string
  label: string
  active: boolean
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px', fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        padding: '0 10px',
        height: '36px',
        display: 'inline-flex',
        alignItems: 'center',
        color: accent
          ? 'var(--color-negative)'
          : active
          ? 'var(--text-primary)'
          : 'var(--text-dim)',
        borderBottom: active
          ? '1.5px solid var(--text-primary)'
          : '1.5px solid transparent',
        whiteSpace: 'nowrap',
        transition: 'color 0.15s',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {label}
    </Link>
  )
}
