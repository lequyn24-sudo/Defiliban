'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('defiliban-user')
    if (user) router.push('/account')
  }, [router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const user = {
        id: 'usr_' + Math.random().toString(36).slice(2, 8),
        email,
        displayName: email.split('@')[0],
        avatarUrl: null,
        theme: 'dark',
        joinedAt: new Date().toISOString(),
      }
      localStorage.setItem('defiliban-user', JSON.stringify(user))
      const next = new URLSearchParams(window.location.search).get('next')
      router.push(next ?? '/account')
    }, 800)
  }

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px', fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          color: 'var(--text-dim)',
          marginBottom: '8px',
        }}
      >
        Sign In
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '22px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '24px',
        }}
      >
        Welcome back.
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--bg-surface2)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="your@email.com"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        {error && (
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--color-negative)',
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'var(--text-primary)',
            color: 'var(--bg-void)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            fontWeight: 500,
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-dim)',
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        No account?{' '}
        <Link
          href="/register"
          style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          Register for free →
        </Link>
      </p>
    </div>
  )
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px', fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: 'var(--text-dim)',
          marginBottom: '6px',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '10px 12px',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-primary)',
          outline: 'none',
        }}
      />
    </div>
  )
}
