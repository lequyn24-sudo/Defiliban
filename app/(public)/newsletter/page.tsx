import { Metadata } from 'next'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Newsletter — DeFi Protocol Intelligence Weekly',
  description:
    'Subscribe to Defiliban\'s weekly newsletter for deep-dive DeFi protocol analysis, yield strategies, and on-chain risk coverage.',
}

const benefits = [
  'Weekly protocol deep-dives — DEX mechanics, lending markets, and governance analysis',
  'Yield strategy breakdowns — staking, farming, and vault performance benchmarks',
  'Risk alerts — exploit post-mortems and liquidation cascade scenarios',
  'Infrastructure coverage — oracle integrity, bridge security, and L2 milestones',
  'No hype, no price predictions — authoritative, data-driven analysis only',
]

export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--text-dim)',
            marginBottom: '16px',
          }}
        >
          Defiliban Newsletter
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.3px',
            marginBottom: '16px',
          }}
        >
          DeFi Protocol Intelligence, Weekly.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
            marginBottom: '32px',
          }}
        >
          Join analysts, protocol teams, and DeFi investors who read Defiliban every week for authoritative protocol coverage. Written by AI, curated by editors — no hype, no noise.
        </p>

        {/* Subscribe form */}
        <div
          style={{
            background: 'var(--bg-surface2)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <SubscribeForm />
        </div>

        {/* Benefits */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-dim)',
              marginBottom: '16px',
            }}
          >
            What you get
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {benefits.map((b) => (
              <li key={b} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle
                  size={14}
                  style={{
                    color: 'var(--color-positive)',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'var(--text-dim)',
                    lineHeight: 1.55,
                  }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
