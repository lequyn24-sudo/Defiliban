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
          padding: '40px 24px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
        }}
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
              fontSize: '13px',
              color: 'var(--text-dim)',
              lineHeight: 1.65,
              marginBottom: '4px',
            }}
          >
            A DeFi protocol deep-dive specialist covering protocol structure, yield systems, liquidity architecture, infrastructure dependencies, and risk surfaces.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--text-dim)',
              marginTop: '12px',
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
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: '14px',
            }}
          >
            Coverage
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: '14px',
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
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: '14px',
            }}
          >
            Connect
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
          padding: '14px 24px',
        }}
      >
        <div
          className="flex items-center justify-between flex-wrap gap-3"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-dim)',
              opacity: 0.55,
            }}
          >
            © 2026 Defiliban · All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
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
        fontSize: '13px',
        color: 'var(--text-dim)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
    >
      {label}
    </Link>
  )
}
