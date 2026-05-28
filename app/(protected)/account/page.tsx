'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, ChevronRight } from 'lucide-react'
import type { MockUser } from '@/lib/types'

// ─── Nav tree ────────────────────────────────────────────────────────────────

type SectionId =
  | 'identity' | 'social' | 'security' | 'subscription'
  | 'preferences' | 'notifications' | 'investment-profile'
  | 'watchlist' | 'portfolio' | 'saved-articles' | 'activity'
  | 'reputation'

interface NavItem { id: SectionId; label: string }
interface NavGroup { label: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    label: 'Account',
    items: [
      { id: 'identity',     label: 'Identity' },
      { id: 'social',       label: 'Social Accounts' },
      { id: 'security',     label: 'Security' },
      { id: 'subscription', label: 'Subscription' },
    ],
  },
  {
    label: 'Personalization',
    items: [
      { id: 'preferences',        label: 'Preferences' },
      { id: 'notifications',      label: 'Notifications' },
      { id: 'investment-profile', label: 'Investment Profile' },
    ],
  },
  {
    label: 'Content',
    items: [
      { id: 'watchlist',      label: 'Watchlist' },
      { id: 'portfolio',      label: 'Portfolio' },
      { id: 'saved-articles', label: 'Saved Articles' },
      { id: 'activity',       label: 'Activity History' },
    ],
  },
  {
    label: 'Community',
    items: [
      { id: 'reputation', label: 'Reputation' },
    ],
  },
]

// ─── Section content ──────────────────────────────────────────────────────────

function SectionShell({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom: 'var(--sp-6)', paddingBottom: 'var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-1)' }}>
          {title}
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-dim)' }}>
          {desc}
        </p>
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--sp-5)' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)', marginBottom: 'var(--sp-2)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function MockInput({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      style={{
        width: '100%', maxWidth: '420px', display: 'block',
        fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-primary)',
        background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px',
        padding: 'var(--sp-3) var(--sp-4)', outline: 'none',
      }}
    />
  )
}

function SaveButton() {
  return (
    <button style={{
      marginTop: 'var(--sp-6)', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase',
      letterSpacing: '0.8px', background: 'var(--text-primary)', color: 'var(--bg-void)',
      border: 'none', borderRadius: '20px', padding: 'var(--sp-2) var(--sp-6)', cursor: 'pointer', fontWeight: 500,
    }}>
      Save Changes
    </button>
  )
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-primary)' }}>{label}</span>
      <button
        onClick={() => setOn(!on)}
        style={{
          width: '36px', height: '20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
          background: on ? 'var(--color-positive)' : 'var(--bg-surface)',
          position: 'relative', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '2px', left: on ? '18px' : '2px',
          width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
        }} />
      </button>
    </div>
  )
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--sp-16) 0' }}>
      <span style={{ fontSize: '32px', display: 'block', marginBottom: 'var(--sp-4)', opacity: 0.4 }}>{icon}</span>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>{text}</p>
    </div>
  )
}

// ─── Section components ───────────────────────────────────────────────────────

function SectionIdentity({ user }: { user: MockUser }) {
  const initials = user.displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <SectionShell title="Identity" desc="Your public profile and personal information.">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-5)', marginBottom: 'var(--sp-8)' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)' }}>{initials}</span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--sp-1)' }}>{user.displayName}</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>{user.email}</p>
        </div>
      </div>
      <Field label="Display Name"><MockInput value={user.displayName} /></Field>
      <Field label="Email"><MockInput value={user.email} /></Field>
      <Field label="Bio"><MockInput placeholder="Short bio (shown on comments)" /></Field>
      <SaveButton />
    </SectionShell>
  )
}

function SectionSocial() {
  const socials = [
    { label: 'X / Twitter', placeholder: '@handle' },
    { label: 'Discord', placeholder: 'username#0000' },
    { label: 'Telegram', placeholder: '@handle' },
    { label: 'LinkedIn', placeholder: 'Profile URL' },
  ]
  return (
    <SectionShell title="Social Accounts" desc="Link your social profiles for community features.">
      {socials.map((s) => <Field key={s.label} label={s.label}><MockInput placeholder={s.placeholder} /></Field>)}
      <SaveButton />
    </SectionShell>
  )
}

function SectionSecurity() {
  return (
    <SectionShell title="Security" desc="Manage your password and two-factor authentication.">
      <Field label="Current Password"><MockInput placeholder="••••••••" /></Field>
      <Field label="New Password"><MockInput placeholder="••••••••" /></Field>
      <Field label="Confirm New Password"><MockInput placeholder="••••••••" /></Field>
      <SaveButton />
      <div style={{ marginTop: 'var(--sp-8)', padding: 'var(--sp-5)', background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--sp-2)' }}>Two-Factor Authentication</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-dim)', marginBottom: 'var(--sp-4)' }}>Add an extra layer of security to your account.</p>
        <button style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', borderRadius: '4px', padding: 'var(--sp-2) var(--sp-4)', cursor: 'pointer' }}>
          Enable 2FA
        </button>
      </div>
    </SectionShell>
  )
}

function SectionSubscription() {
  return (
    <SectionShell title="Subscription" desc="Your current plan and billing information.">
      <div style={{ background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', padding: 'var(--sp-6)', marginBottom: 'var(--sp-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sp-3)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Free Plan</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-positive)', border: '1px solid var(--color-positive)', borderRadius: '2px', padding: '2px 8px' }}>Active</span>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-dim)' }}>Full article access · Weekly newsletter · Community features</p>
      </div>
      <button style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', background: 'var(--text-primary)', color: 'var(--bg-void)', border: 'none', borderRadius: '20px', padding: 'var(--sp-3) var(--sp-6)', cursor: 'pointer', fontWeight: 500 }}>
        Upgrade to Pro →
      </button>
    </SectionShell>
  )
}

function SectionPreferences() {
  return (
    <SectionShell title="Preferences" desc="Customize your reading and display experience.">
      <Field label="Theme">
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          {['Dark', 'Light', 'System'].map((t) => (
            <button key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: 'var(--sp-2) var(--sp-3)', border: '1px solid var(--border)', borderRadius: '4px', background: t === 'Dark' ? 'var(--text-primary)' : 'transparent', color: t === 'Dark' ? 'var(--bg-void)' : 'var(--text-dim)', cursor: 'pointer' }}>{t}</button>
          ))}
        </div>
      </Field>
      <Field label="Default Feed">
        <select style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-primary)', background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', padding: 'var(--sp-2) var(--sp-4)', outline: 'none', cursor: 'pointer' }}>
          <option>All categories</option>
          <option>Protocols only</option>
          <option>Yield & Risk</option>
          <option>Watchlist only</option>
        </select>
      </Field>
      <Field label="Article density">
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          {['Compact', 'Normal', 'Spacious'].map((d) => (
            <button key={d} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: 'var(--sp-2) var(--sp-3)', border: '1px solid var(--border)', borderRadius: '4px', background: d === 'Normal' ? 'var(--text-primary)' : 'transparent', color: d === 'Normal' ? 'var(--bg-void)' : 'var(--text-dim)', cursor: 'pointer' }}>{d}</button>
          ))}
        </div>
      </Field>
      <SaveButton />
    </SectionShell>
  )
}

function SectionNotifications() {
  return (
    <SectionShell title="Notifications" desc="Choose what you hear about and how.">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)', marginBottom: 'var(--sp-3)' }}>Email</p>
      <Toggle label="Weekly newsletter digest" defaultOn />
      <Toggle label="Breaking news alerts" />
      <Toggle label="Protocol exploit alerts" defaultOn />
      <Toggle label="Watchlist price alerts" />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-dim)', margin: 'var(--sp-5) 0 var(--sp-3)' }}>In-app</p>
      <Toggle label="New article in followed category" defaultOn />
      <Toggle label="Portfolio significant moves" />
      <Toggle label="Governance proposals (watchlist)" />
      <SaveButton />
    </SectionShell>
  )
}

function SectionInvestmentProfile() {
  return (
    <SectionShell title="Investment Profile" desc="Help us personalize research relevance to your context.">
      <Field label="Investor type">
        <select style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-primary)', background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', padding: 'var(--sp-2) var(--sp-4)', outline: 'none', cursor: 'pointer' }}>
          <option>Researcher / Analyst</option>
          <option>Protocol Builder</option>
          <option>Retail Investor</option>
          <option>Institutional / Fund</option>
        </select>
      </Field>
      <Field label="Risk tolerance">
        <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
          {['Conservative', 'Moderate', 'Aggressive', 'Degen'].map((r) => (
            <button key={r} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: 'var(--sp-2) var(--sp-3)', border: '1px solid var(--border)', borderRadius: '4px', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer' }}>{r}</button>
          ))}
        </div>
      </Field>
      <Field label="Primary interest">
        <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
          {['Protocols', 'Yield', 'Liquidity', 'Risk', 'Infrastructure'].map((c) => (
            <button key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: 'var(--sp-2) var(--sp-3)', border: '1px solid var(--border)', borderRadius: '4px', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer' }}>{c}</button>
          ))}
        </div>
      </Field>
      <SaveButton />
    </SectionShell>
  )
}

function SectionWatchlist() {
  const tokens = ['ETH', 'ARB', 'OP', 'UNI', 'AAVE', 'CRV']
  return (
    <SectionShell title="Watchlist" desc="Tokens and protocols you're tracking.">
      <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap', marginBottom: 'var(--sp-6)' }}>
        {tokens.map((t) => (
          <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', padding: 'var(--sp-2) var(--sp-3)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-primary)' }}>
            {t} ×
          </span>
        ))}
      </div>
      <Field label="Add token or protocol"><MockInput placeholder="Search by name or symbol..." /></Field>
    </SectionShell>
  )
}

function SectionPortfolio() {
  return (
    <SectionShell title="Portfolio" desc="Track your DeFi holdings for personalized risk analysis.">
      <EmptyState icon="◈" text="No positions added yet · Portfolio tracking coming soon" />
    </SectionShell>
  )
}

function SectionSavedArticles() {
  return (
    <SectionShell title="Saved Articles" desc="Articles you've bookmarked for later.">
      <EmptyState icon="◫" text="No saved articles · Bookmark articles while reading to see them here" />
    </SectionShell>
  )
}

function SectionActivity() {
  const items = [
    { label: 'Read article', detail: 'Uniswap v4 Hooks — DEX routing analysis', time: '2h ago' },
    { label: 'Read article', detail: 'Aave GHO stability mechanism deep-dive', time: '5h ago' },
    { label: 'Saved article', detail: 'Curve Finance NG Pools analysis', time: '1d ago' },
    { label: 'Read article', detail: 'Arbitrum bridge flow quarterly report', time: '2d ago' },
  ]
  return (
    <SectionShell title="Activity History" desc="Your recent reading and interaction history.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: 'var(--bg-page)', padding: 'var(--sp-3) var(--sp-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-dim)', marginRight: 'var(--sp-3)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-primary)' }}>{item.detail}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', flexShrink: 0 }}>{item.time}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function SectionReputation() {
  const badges = [
    { icon: '◈', label: 'Early Adopter', desc: 'Joined in the first month' },
    { icon: '◉', label: 'DeFi Reader', desc: 'Read 50+ research articles' },
    { icon: '◌', label: 'Protocol Watcher', desc: 'Watchlist has 5+ protocols' },
  ]
  return (
    <SectionShell title="Reputation" desc="Your contributions and standing in the Defiliban community.">
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 'var(--sp-3)', marginBottom: 'var(--sp-8)' }}>
        {badges.map((b) => (
          <div key={b.label} style={{ background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', padding: 'var(--sp-4)', textAlign: 'center' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: 'var(--sp-2)' }}>{b.icon}</span>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--sp-1)' }}>{b.label}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>{b.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-4)' }}>
        {[{ label: 'Articles Read', value: '47' }, { label: 'Streak (days)', value: '12' }, { label: 'Bookmarks', value: '8' }].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 'var(--sp-1)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

const SECTION_COMPONENTS: Record<SectionId, (props: { user: MockUser }) => React.ReactElement> = {
  identity:          ({ user }) => <SectionIdentity user={user} />,
  social:            () => <SectionSocial />,
  security:          () => <SectionSecurity />,
  subscription:      () => <SectionSubscription />,
  preferences:       () => <SectionPreferences />,
  notifications:     () => <SectionNotifications />,
  'investment-profile': () => <SectionInvestmentProfile />,
  watchlist:         () => <SectionWatchlist />,
  portfolio:         () => <SectionPortfolio />,
  'saved-articles':  () => <SectionSavedArticles />,
  activity:          () => <SectionActivity />,
  reputation:        () => <SectionReputation />,
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<MockUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState<SectionId>('identity')

  useEffect(() => {
    setMounted(true)
    const raw = localStorage.getItem('defiliban-user')
    if (!raw) { router.push('/login?next=/account'); return }
    setUser(JSON.parse(raw))
  }, [router])

  function handleLogout() {
    localStorage.removeItem('defiliban-user')
    router.push('/')
  }

  if (!mounted || !user) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>Loading...</p>
      </div>
    )
  }

  const initials = user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const ActiveSection = SECTION_COMPONENTS[active]

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div
        style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--sp-8) var(--sp-4) var(--sp-16)', display: 'flex', gap: 'var(--sp-8)', alignItems: 'flex-start' }}
        className="flex-col lg:flex-row"
      >

        {/* ── Sidebar ── */}
        <div style={{ flexShrink: 0, width: '240px' }} className="hidden lg:block">

          {/* User card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-4)', marginBottom: 'var(--sp-4)', background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{initials}</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.displayName}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
            </div>
          </div>

          {/* Nav groups */}
          {NAV.map((group) => (
            <div key={group.label} style={{ marginBottom: 'var(--sp-5)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: 'var(--sp-2)', paddingLeft: 'var(--sp-3)' }}>
                {group.label}
              </p>
              {group.items.map((item) => {
                const isActive = active === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: 'var(--sp-2) var(--sp-3)',
                      background: isActive ? 'var(--bg-surface)' : 'transparent',
                      border: 'none', borderRadius: '4px', cursor: 'pointer',
                      fontFamily: 'var(--font-sans)', fontSize: '13px',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-dim)',
                      fontWeight: isActive ? 600 : 400,
                      textAlign: 'left', marginBottom: '2px',
                    }}
                  >
                    {item.label}
                    {isActive && <ChevronRight size={12} style={{ flexShrink: 0 }} />}
                  </button>
                )
              })}
            </div>
          ))}

          {/* Sign out */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', width: '100%',
              padding: 'var(--sp-2) var(--sp-3)', background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px',
              textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-negative)',
              borderRadius: '4px', marginTop: 'var(--sp-4)',
            }}
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile breadcrumb */}
          <div className="lg:hidden" style={{ marginBottom: 'var(--sp-5)', display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            {NAV.flatMap((g) => g.items).map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px',
                  padding: 'var(--sp-1) var(--sp-2)', border: '1px solid var(--border)', borderRadius: '4px',
                  background: active === item.id ? 'var(--text-primary)' : 'transparent',
                  color: active === item.id ? 'var(--bg-void)' : 'var(--text-dim)',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ background: 'var(--bg-surface2)', border: '1px solid var(--border)', borderRadius: '4px', padding: 'var(--sp-8)' }}>
            <ActiveSection user={user} />
          </div>
        </div>

      </div>
    </div>
  )
}
