'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { MOCK_ARTICLES, toPreview } from '@/lib/mock/articles'
import { ArticleGrid } from '@/components/articles/ArticleGrid'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    ).map(toPreview)
  }, [query])

  return (
    <div
      style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '20px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '24px',
        }}
      >
        Search
      </h1>

      {/* Search input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '12px 16px',
          marginBottom: '32px',
          maxWidth: '600px',
        }}
      >
        <Search size={16} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search protocols, yield, risk, infrastructure..."
          autoFocus
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            color: 'var(--text-primary)',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {query && (
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              marginBottom: '20px',
            }}
          >
            {results.length === 0
              ? `No results for "${query}"`
              : `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`}
          </p>
          <ArticleGrid articles={results} columns={3} />
        </div>
      )}

      {!query && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-dim)',
          }}
        >
          Start typing to search across all DeFi protocol articles.
        </p>
      )}
    </div>
  )
}
