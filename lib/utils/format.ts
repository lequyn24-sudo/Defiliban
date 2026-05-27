export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return '$' + (price / 1_000_000).toFixed(2) + 'M'
  }
  if (price >= 1_000) {
    return (
      '$' +
      price.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    )
  }
  if (price >= 1) return '$' + price.toFixed(2)
  return '$' + price.toFixed(4)
}

export function formatLargeNumber(n: number): string {
  if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(2) + 'B'
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M'
  return '$' + n.toLocaleString('en-US')
}

export function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function readTimeLabel(minutes: number): string {
  return `${minutes} min read`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

export function generateArticleSlug(
  tier1: string,
  title: string,
  id: string
): string {
  return `${tier1}-${slugify(title)}-${id.slice(0, 6)}`
}
