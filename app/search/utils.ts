import { sqlite } from '../../lib/db/db'
import { SelectQuoteSchema } from '../../lib/db/schema'

export async function getSearchResult(q: string) {
  if (!q) {
    return []
  }

  const rows = sqlite
    .prepare(
      `SELECT uuid, date, highlight(zitat_fts, 2, '<em>', '</em>') as quote, highlight(zitat_fts, 3, '<em>', '</em>') as author FROM zitat_fts WHERE zitat_fts MATCH '${q}*';`
    )
    .all() as SelectQuoteSchema[]

  return rows
}
