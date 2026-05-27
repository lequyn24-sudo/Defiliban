'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

interface Props {
  compact?: boolean
  dark?: boolean
}

export function SubscribeForm({ compact = false, dark = false }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="flex items-center gap-3"
        style={{ color: 'var(--color-positive)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
      >
        <CheckCircle size={16} />
        <span>Check your inbox — confirmation email sent.</span>
      </div>
    )
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            flex: 1,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            padding: '8px 12px',
            borderRadius: '4px',
            outline: 'none',
          }}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: 'var(--text-primary)',
            color: 'var(--bg-page)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
    )
  }

  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: 'var(--text-dim)',
          marginBottom: '16px',
        }}
      >
        DeFi Protocol Intelligence — Weekly
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}
      >
        Stay ahead of the protocol curve.
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-dim)',
          marginBottom: '24px',
          maxWidth: '480px',
        }}
      >
        Weekly deep-dives on DeFi protocols, yield strategies, and on-chain risk. No hype — just authoritative analysis.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            flex: '1 1 240px',
            background: dark ? 'rgba(232,232,198,0.06)' : 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            padding: '10px 16px',
            borderRadius: '4px',
            outline: 'none',
          }}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: 'var(--text-primary)',
            color: 'var(--bg-page)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '10px 24px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <Send size={13} />
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
        </button>
      </form>
      {errorMsg && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-negative)',
            marginTop: '8px',
          }}
        >
          {errorMsg}
        </p>
      )}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-faint)',
          marginTop: '12px',
        }}
      >
        No spam · Unsubscribe anytime
      </p>
    </div>
  )
}
