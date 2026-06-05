'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
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
    if (!email || !password || !name) {
      setError('All fields are required.')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const user = {
        id: 'usr_' + Math.random().toString(36).slice(2, 8),
        email,
        displayName: name,
        avatarUrl: null,
        theme: 'dark',
        joinedAt: new Date().toISOString(),
      }
      localStorage.setItem('defiliban-user', JSON.stringify(user))
      router.push('/account')
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
        Create Account
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '22px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}
      >
        Join Defiliban.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-dim)',
          marginBottom: '24px',
        }}
      >
        Free access to DeFi protocol intelligence.
      </p>

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
          label="Display Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Your name"
        />
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
          placeholder="At least 8 characters"
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
          {loading ? 'Creating account...' : 'Create Account'}
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
        Already have an account?{' '}
        <Link
          href="/login"
          style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          Sign in →
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
