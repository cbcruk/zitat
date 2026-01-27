import type { SelectQuoteSchema } from './db/schema'
import { siteConfig } from './site.config'

const MAX_TITLE_QUOTE_LENGTH = 40
const MAX_DESCRIPTION_LENGTH = 120

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function generateQuoteMeta(quote: SelectQuoteSchema): {
  title: string
  description: string
} {
  const truncatedQuote = truncateText(quote.quote, MAX_TITLE_QUOTE_LENGTH)

  return {
    title: `${siteConfig.name} - "${truncatedQuote}" - ${quote.author}`,
    description: `${quote.author}의 명언: ${truncateText(quote.quote, MAX_DESCRIPTION_LENGTH)}`,
  }
}

export function generateCanonicalUrl(path: string): string {
  return `${siteConfig.url}${path}`
}

export function generateQuoteJsonLd(
  quote: SelectQuoteSchema,
  url: string,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: quote.quote,
    author: {
      '@type': 'Person',
      name: quote.author,
    },
    datePublished: quote.date,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}
