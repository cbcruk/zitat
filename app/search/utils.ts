import algoliasearch from 'algoliasearch'
import { AlgoliaSearchResponseSchema } from '../../schema/algolia'

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_API_KEY || ''
)

const index = client.initIndex('zitat')

export async function getSearchResult(q: string) {
  if (!q) {
    return []
  }

  const { hits }: AlgoliaSearchResponseSchema = await index.search(q, {
    attributesToRetrieve: [],
  })
  const result = hits.map(({ objectID, _highlightResult }) => {
    const { author, desc } = _highlightResult

    return {
      id: objectID,
      author: author.value,
      quote: desc.value,
    }
  })

  return hits?.length > 0 ? result : []
}
