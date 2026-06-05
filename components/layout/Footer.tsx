import Link from 'next/link'
import { BarChart2, Twitter, Linkedin, Mail, Rss } from 'lucide-react'

const COVERAGE_LINKS = [
  { label: 'Protocols', href: '/protocols' },
  { label: 'Yield', href: '/yield' },
  { label: 'Liquidity', href: '/liquidity' },
  { label: 'Risk', href: '/risk' },
  { label: 'Infrastructure', href: '/infrastructure' },
]

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Editorial Standards', href: '/about' },
  { label: 'Content Disclaimer', href: '/about' },
  { label: 'Sponsored Articles', href: '/sponsored-articles' },
  { label: 'Press Release', href: '/press-release' },
]

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Main footer grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'var(--sp-10) var(--sp-6) var(--sp-8)',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 3fr) 1fr 1fr 1fr',
          gap: 'var(--sp-10)',
        }}
        className="max-md:!grid-cols-1 max-md:gap-10"
      >
        {/* Brand column */}
        <div style={{ maxWidth: '260px' }}>
          <Link
            href="/"
            className="flex items-center gap-2 mb-4"
            style={{ textDecoration: 'none' }}
          >
            <BarChart2 size={14} style={{ color: 'var(--text-dim)' }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                DEFILIBAN
              </span>
            </div>
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.65,
              marginBottom: 'var(--sp-1)',
            }}
          >
            A DeFi protocol deep-dive specialist covering protocol structure, yield systems, liquidity architecture, infrastructure dependencies, and risk surfaces.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--text-dim)',
              marginTop: 'var(--sp-3)',
            }}
          >
            NOT A NEWS SITE. A SYSTEM-LEVEL VIEW OF DEFI.
          </p>
        </div>

        {/* Coverage column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: 'var(--sp-3)',
            }}
          >
            Coverage
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {COVERAGE_LINKS.map((link) => (
              <FooterLink key={link.href + link.label} href={link.href} label={link.label} />
            ))}
          </div>
        </div>

        {/* Company column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: 'var(--sp-3)',
            }}
          >
            Company
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {COMPANY_LINKS.map((link) => (
              <FooterLink key={link.href + link.label} href={link.href} label={link.label} />
            ))}
          </div>
        </div>

        {/* Connect column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: 'var(--sp-3)',
            }}
          >
            Connect
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
            {[
              { Icon: Twitter, label: 'X / Twitter', href: '#' },
              { Icon: Linkedin, label: 'LinkedIn', href: '#' },
              { Icon: Mail, label: 'Email', href: '/newsletter' },
              { Icon: Rss, label: 'RSS', href: '#' },
            ].map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="social-icon"
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: 'var(--sp-3) var(--sp-6)',
        }}
      >
        <div
          className="flex items-center justify-between flex-wrap gap-3"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              opacity: 0.55,
            }}
          >
            © 2026 Defiliban · All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              opacity: 0.55,
            }}
          >
            AI-generated content based on public sources · Not financial advice
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        color: 'var(--text-dim)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
    >
      {label}
    </Link>
  )
}
