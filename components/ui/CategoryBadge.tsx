import { getCategoryMeta } from '@/lib/constants/categories'

interface Props {
  category: string
  isBreaking?: boolean
  isSponsor?: boolean
  size?: 'sm' | 'md'
}

export function CategoryBadge({
  category,
  isBreaking,
  isSponsor,
  size = 'sm',
}: Props) {
  const tier1 = category.split('/')[0]
  const meta = getCategoryMeta(tier1)
  const badgeClass = isBreaking
    ? 'badge-breaking'
    : isSponsor
    ? 'badge-sponsored'
    : meta?.badgeClass ?? 'badge-protocols'

  const subSlug = category.includes('/') ? category.split('/')[1] : null
  const label = isBreaking
    ? 'Breaking'
    : isSponsor
    ? 'Sponsored'
    : subSlug
    ? subSlug.replace(/-/g, ' ').toUpperCase()
    : meta?.label ?? category.toUpperCase()

  const fontSize = size === 'md' ? '10px' : '9px'

  return (
    <span
      className={badgeClass}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        padding: size === 'md' ? '3px 8px' : '2px 6px',
        borderRadius: '2px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
