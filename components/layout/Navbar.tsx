'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BarChart2, Search, User, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { MAIN_NAV_CATEGORIES } from '@/lib/constants/categories'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

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
        className="flex items-center h-full gap-4 px-4"
        style={{ maxWidth: '1280px', margin: '0 auto' }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0"
          style={{ textDecoration: 'none' }}
        >
          <BarChart2
            size={16}
            style={{ color: 'var(--text-primary)' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            DEFILIBAN
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center flex-1 gap-0">
          {MAIN_NAV_CATEGORIES.map((cat) => {
            const active = pathname.startsWith(`/${cat.slug}`)
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  color: active ? 'var(--text-primary)' : 'var(--text-dim)',
                  padding: '4px 10px',
                  height: '52px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderBottom: active
                    ? '1.5px solid var(--text-primary)'
                    : '1.5px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                  textDecoration: 'none',
                }}
              >
                {cat.label}
              </Link>
            )
          })}
        </div>

        {/* Right controls */}
        <div
          className="flex items-center gap-2 ml-auto"
          style={{ flexShrink: 0 }}
        >
          <Link
            href="/search"
            aria-label="Search"
            style={{
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
          >
            <Search size={16} />
          </Link>

          <ThemeToggle />

          <Link
            href="/account"
            aria-label="Account"
            style={{
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
          >
            <User size={16} />
          </Link>

          <Link
            href="/newsletter"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              background: 'var(--text-primary)',
              color: 'var(--bg-void)',
              padding: '5px 14px',
              borderRadius: '20px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
          >
            Subscribe
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
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
        </div>
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
          {MAIN_NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--text-dim)',
                padding: '10px 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              {cat.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-4">
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
              }}
            >
              Search
            </Link>
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
              }}
            >
              Account
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                background: 'var(--text-primary)',
                color: 'var(--bg-void)',
                padding: '5px 12px',
                borderRadius: '20px',
                textDecoration: 'none',
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
