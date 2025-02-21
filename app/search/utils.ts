import { getListByQuery } from '../../lib/db/db'

export async function getSearchResult(q: string) {
  if (!q) {
    return []
  }

  const rows = getListByQuery(q)

  return rows
}
