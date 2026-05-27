'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'
import type { MockUser } from '@/lib/types'
import { Bookmark, Clock, Settings, LogOut } from 'lucide-react'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<MockUser | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const raw = localStorage.getItem('defiliban-user')
    if (!raw) {
      router.push('/login?next=/account')
      return
    }
    setUser(JSON.parse(raw))
  }, [router])

  function handleLogout() {
    localStorage.removeItem('defiliban-user')
    router.push('/')
  }

  if (!mounted || !user) {
    return (
      <div
        style={{
          maxWidth: '800px',
          margin: '64px auto',
          padding: '0 16px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-dim)',
          }}
        >
          Loading...
        </p>
      </div>
    )
  }

  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}
    >
      {/* Profile header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            {initials}
          </span>
        </div>

        <div>
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '4px',
            }}
          >
            {user.displayName}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--text-dim)',
              marginBottom: '4px',
            }}
          >
            {user.email}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-faint)',
            }}
          >
            Member since {formatDate(user.joinedAt)}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '8px 14px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: 'var(--text-dim)',
          }}
        >
          <LogOut size={12} />
          Sign Out
        </button>
      </div>

      {/* Quick actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '40px',
        }}
      >
        <ActionCard
          href="/account/bookmarks"
          icon={<Bookmark size={18} />}
          label="Bookmarks"
          description="Saved articles"
        />
        <ActionCard
          href="/account/settings"
          icon={<Settings size={18} />}
          label="Settings"
          description="Theme & preferences"
        />
        <ActionCard
          href="/search"
          icon={<Clock size={18} />}
          label="Search"
          description="Find articles"
        />
      </div>

      {/* Plan info */}
      <div
        style={{
          background: 'var(--bg-surface2)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '24px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--text-dim)',
            marginBottom: '12px',
          }}
        >
          Subscription
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          Free Plan — Full article access included.
        </p>
        <Link
          href="/newsletter"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            background: 'var(--text-primary)',
            color: 'var(--bg-void)',
            padding: '8px 16px',
            borderRadius: '20px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '4px',
          }}
        >
          Get Weekly Newsletter
        </Link>
      </div>
    </div>
  )
}

function ActionCard({
  href,
  icon,
  label,
  description,
}: {
  href: string
  icon: React.ReactNode
  label: string
  description: string
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: 'var(--bg-surface2)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        textDecoration: 'none',
        transition: 'border-color 0.15s',
      }}
    >
      <span style={{ color: 'var(--text-dim)' }}>{icon}</span>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-dim)',
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  )
}
