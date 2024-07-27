import { algoriaIndex } from '../../../lib/algoria'
import { AlgoliaSearchResponseSchema } from '../../../schema/algolia'
import { db } from '../../db/db'
import { zitat } from '../../db/schema'

export async function POST() {
  const objects = await db.select().from(zitat)

  await algoriaIndex.replaceAllObjects(objects)

  return new Response('성공적으로 업데이트되었습니다.', {
    status: 200,
  })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  if (!q) {
    return []
  }

  const { hits }: AlgoliaSearchResponseSchema = await algoriaIndex.search(q, {
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
