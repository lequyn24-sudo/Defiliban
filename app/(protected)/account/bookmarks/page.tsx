'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MOCK_ARTICLES, toPreview } from '@/lib/mock/articles'
import { ArticleGrid } from '@/components/articles/ArticleGrid'
import type { ArticlePreview } from '@/lib/types'

export default function BookmarksPage() {
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<ArticlePreview[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = localStorage.getItem('defiliban-user')
    if (!user) {
      router.push('/login?next=/account/bookmarks')
      return
    }
    const saved: string[] = JSON.parse(
      localStorage.getItem('defiliban-bookmarks') ?? '[]'
    )
    const articles = MOCK_ARTICLES.filter((a) => saved.includes(a.slug)).map(toPreview)
    setBookmarks(articles)
  }, [router])

  if (!mounted) return null

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
      <Link
        href="/account"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
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
          marginBottom: '24px',
        }}
      >
        Bookmarks
      </h1>

      {bookmarks.length === 0 ? (
        <div
          style={{
            padding: '48px',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--text-dim)',
              marginBottom: '16px',
            }}
          >
            No bookmarks yet. Save articles to access them here.
          </p>
          <Link
            href="/"
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
            }}
          >
            Browse Articles →
          </Link>
        </div>
      ) : (
        <ArticleGrid articles={bookmarks} columns={3} />
      )}
    </div>
  )
}
