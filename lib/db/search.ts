import Fuse, { FuseResult, IFuseOptions } from 'fuse.js'
import { SelectQuoteSchema, zitat } from './schema'
import { db } from './db'

type FuseOptions = IFuseOptions<SelectQuoteSchema>

const DEFAULT_OPTIONS: FuseOptions = {
  keys: [
    { name: 'quote', weight: 0.7 },
    { name: 'author', weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
}

class QuoteSearch {
  private fuse: Fuse<SelectQuoteSchema> | null = null
  private options: FuseOptions
  private isDev = process.env.NODE_ENV === 'development'

  constructor(options?: Partial<FuseOptions>) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  async initialize(): Promise<void> {
    if (this.fuse) {
      return
    }

    const quotes = this.isDev
      ? await db.select().from(zitat)
      : await import('./quotes-cache.json').then(
          (m) => m.default as SelectQuoteSchema[]
        )

    this.fuse = new Fuse(quotes, this.options)
  }

  async search(query: string, limit = 50): Promise<SelectQuoteSchema[]> {
    await this.initialize()

    const results = this.fuse!.search(query, { limit })

    return results.map((result: FuseResult<SelectQuoteSchema>) => {
      const item = { ...result.item }

      if (result.matches) {
        for (const match of result.matches) {
          if (match.key === 'quote' && match.indices) {
            item.quote = this.highlightMatches(item.quote, match.indices)
          }
          if (match.key === 'author' && match.indices) {
            item.author = this.highlightMatches(item.author, match.indices)
          }
        }
      }

      return item
    })
  }

  reset(): void {
    this.fuse = null
  }

  private highlightMatches(
    text: string,
    indices: readonly [number, number][]
  ): string {
    if (!indices || indices.length === 0) {
      return text
    }

    let result = ''
    let lastIndex = 0

    const sortedIndices = [...indices].sort((a, b) => a[0] - b[0])

    for (const [start, end] of sortedIndices) {
      result += text.slice(lastIndex, start)
      result += `<em>${text.slice(start, end + 1)}</em>`

      lastIndex = end + 1
    }

    result += text.slice(lastIndex)

    return result
  }
}

export const quoteSearch = new QuoteSearch()

export async function getListByQuery(q: string): Promise<SelectQuoteSchema[]> {
  return quoteSearch.search(q)
}
