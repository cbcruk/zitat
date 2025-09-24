import { getListByQuery } from '../../lib/db/db'
import { SelectQuoteSchema } from '../../lib/db/schema'

export async function getSearchResult(q: string) {
  if (!q) {
    return []
  }

  const rows = await getListByQuery(q)

  return rows as unknown as SelectQuoteSchema[]
}
