'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { BarChart2, Menu, X } from 'lucide-react'
import { MAIN_NAV_CATEGORIES } from '@/lib/constants/categories'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const EXTRA_LINKS = [
  { slug: 'tools', label: 'Tools', href: '/tools' },
  { slug: 'about', label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`)
      setSearchValue('')
    }
  }

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        height: '52px',
        background: 'var(--bg-void)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <nav
        className="flex items-center h-full gap-6 px-4"
        style={{ maxWidth: '1280px', margin: '0 auto' }}
      >
        {/* Wordmark + subtitle */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0"
          style={{ textDecoration: 'none' }}
        >
          <BarChart2 size={16} style={{ color: 'var(--text-primary)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              DEFILIBAN
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.4px',
                color: 'var(--text-dim)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              DeFi Protocol Deep-Dive Specialist
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center flex-1 gap-1">
          {MAIN_NAV_CATEGORIES.map((cat) => {
            const active = pathname.startsWith(`/${cat.slug}`)
            return (
              <NavLink
                key={cat.slug}
                href={`/${cat.slug}`}
                label={cat.label}
                active={active}
              />
            )
          })}
          {EXTRA_LINKS.map((link) => (
            <NavLink
              key={link.slug}
              href={link.href}
              label={link.label}
              active={pathname.startsWith(link.href)}
            />
          ))}
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center"
          style={{
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <input
            ref={searchRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search research..."
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-primary)',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: 'var(--sp-2) 36px var(--sp-2) var(--sp-2)',
              width: '180px',
              outline: 'none',
              letterSpacing: '0.3px',
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              pointerEvents: 'none',
              letterSpacing: '0',
            }}
          >
            [/]
          </span>
        </form>

        {/* Theme toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Subscribe pill */}
        <Link
          href="/newsletter"
          className="hidden md:block"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            background: 'var(--text-primary)',
            color: 'var(--bg-void)',
            padding: 'var(--sp-2) var(--sp-3)',
            borderRadius: '20px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          Subscribe
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
          }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 md:hidden z-50 py-4 px-4"
          style={{
            top: '52px',
            background: 'var(--bg-void)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search research..."
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-primary)',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: 'var(--sp-2) var(--sp-3)',
                width: '100%',
                outline: 'none',
              }}
            />
          </form>
          {[...MAIN_NAV_CATEGORIES, ...EXTRA_LINKS].map((cat) => (
            <Link
              key={cat.slug}
              href={'href' in cat ? cat.href : `/${cat.slug}`}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--text-dim)',
                padding: 'var(--sp-2) 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              {cat.label}
            </Link>
          ))}
          <div style={{ marginTop: '12px' }}>
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                background: 'var(--text-primary)',
                color: 'var(--bg-void)',
                padding: 'var(--sp-2) var(--sp-3)',
                borderRadius: '20px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        color: active ? 'var(--text-primary)' : 'var(--text-dim)',
        padding: 'var(--sp-1) var(--sp-3)',
        height: '52px',
        display: 'inline-flex',
        alignItems: 'center',
        borderBottom: active ? '1.5px solid var(--text-primary)' : '1.5px solid transparent',
        transition: 'color 0.15s, border-color 0.15s',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Link>
  )
}
