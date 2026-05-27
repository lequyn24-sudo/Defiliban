import Link from 'next/link'
import { BarChart2 } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-page)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        textAlign: 'center',
      }}
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          marginBottom: '48px',
        }}
      >
        <BarChart2 size={16} style={{ color: 'var(--text-dim)' }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
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
          fontFamily: 'var(--font-mono)',
          fontSize: '80px',
          fontWeight: 500,
          color: 'var(--text-faint)',
          lineHeight: 1,
          marginBottom: '16px',
        }}
      >
        404
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '20px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}
      >
        Page not found.
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-dim)',
          marginBottom: '32px',
          maxWidth: '400px',
        }}
      >
        The article or page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          background: 'var(--text-primary)',
          color: 'var(--bg-void)',
          padding: '10px 24px',
          borderRadius: '20px',
          textDecoration: 'none',
        }}
      >
        Return Home →
      </Link>
    </div>
  )
}
