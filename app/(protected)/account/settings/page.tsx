'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import type { MockUser } from '@/lib/types'

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState<MockUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
    const raw = localStorage.getItem('defiliban-user')
    if (!raw) {
      router.push('/login?next=/account/settings')
      return
    }
    setUser(JSON.parse(raw))
  }, [router])

  function handleLogout() {
    localStorage.removeItem('defiliban-user')
    router.push('/')
  }

  if (!mounted || !user) return null

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 16px' }}>
      <Link
        href="/account"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px', fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: 'var(--text-dim)',
          textDecoration: 'none',
          marginBottom: '24px',
        }}
      >
        <ArrowLeft size={12} />
        Account
      </Link>

      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '20px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '32px',
        }}
      >
        Settings
      </h1>

      {/* Theme */}
      <SettingSection title="Appearance">
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['dark', 'light'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                padding: '8px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: theme === t ? 'var(--border-strong)' : 'var(--border)',
                background:
                  theme === t ? 'var(--bg-surface)' : 'transparent',
                color:
                  theme === t ? 'var(--text-primary)' : 'var(--text-dim)',
                transition: 'all 0.15s',
              }}
            >
              {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          ))}
        </div>
      </SettingSection>

      {/* Account info */}
      <SettingSection title="Account">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <InfoRow label="Display name" value={user.displayName} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Member since" value={new Date(user.joinedAt).getFullYear().toString()} />
        </div>
      </SettingSection>

      {/* Newsletter */}
      <SettingSection title="Newsletter">
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-dim)',
            marginBottom: '12px',
          }}
        >
          Manage your newsletter subscription preferences.
        </p>
        <Link
          href="/newsletter"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            background: 'var(--text-primary)',
            color: 'var(--bg-void)',
            padding: '8px 16px',
            borderRadius: '20px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Newsletter settings →
        </Link>
      </SettingSection>

      {/* Sign out */}
      <SettingSection title="Session">
        <button
          onClick={handleLogout}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            padding: '8px 16px',
            border: '1px solid var(--color-negative)',
            borderRadius: '4px',
            color: 'var(--color-negative)',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </SettingSection>
    </div>
  )
}

function SettingSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px', fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--text-dim)',
          marginBottom: '16px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-dim)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  )
}
