import Link from 'next/link'
import { BarChart2 } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants/categories'
import { SubscribeForm } from '@/components/ui/SubscribeForm'

export function Footer() {
  const defiCats = CATEGORIES.filter((c) =>
    ['protocols', 'yield', 'liquidity', 'risk', 'infrastructure'].includes(c.slug)
  )

  return (
    <footer
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Newsletter strip */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '40px 16px',
        }}
      >
        <div
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <SubscribeForm dark />
        </div>
      </div>

      {/* Links grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '40px 16px 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
              <BarChart2 size={14} style={{ color: 'var(--text-dim)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                DEFILIBAN
              </span>
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                lineHeight: 1.6,
                maxWidth: '200px',
              }}
            >
              AI-powered DeFi protocol intelligence. Authoritative. Precise. No hype.
            </p>
          </div>

          {/* Category columns */}
          {defiCats.map((cat) => (
            <div key={cat.slug}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--text-dim)',
                  marginBottom: '12px',
                }}
              >
                {cat.label}
              </p>
              <div className="flex flex-col gap-2">
                <FooterLink href={`/${cat.slug}`} label={`All ${cat.label}`} />
                {cat.subcategories.slice(0, 4).map((sub) => (
                  <FooterLink key={sub.href} href={sub.href} label={sub.label} />
                ))}
              </div>
            </div>
          ))}

          {/* About column */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--text-dim)',
                marginBottom: '12px',
              }}
            >
              Platform
            </p>
            <div className="flex flex-col gap-2">
              <FooterLink href="/newsletter" label="Newsletter" />
              <FooterLink href="/search" label="Search" />
              <FooterLink href="/cmc" label="CMC Data" />
              <FooterLink href="/sponsored-articles" label="Sponsored" />
              <FooterLink href="/press-release" label="Press Release" />
              <FooterLink href="/login" label="Sign In" />
              <FooterLink href="/register" label="Register" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '16px',
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
              color: 'var(--text-faint)',
            }}
          >
            © 2026 Defiliban · AI-generated content based on public sources · Not financial advice
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-faint)',
            }}
          >
            Dark Retro Digital · v2.1
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
        fontSize: '12px',
        color: 'var(--text-dim)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
    >
      {label}
    </Link>
  )
}
