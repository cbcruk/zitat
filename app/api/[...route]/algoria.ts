import { Hono } from 'hono'
import { db } from '../../../lib/db/db'
import { zitat } from '../../../lib/db/schema'
import { algoriaIndex } from '../../../lib/algoria'
import { AlgoliaSearchResponseSchema } from '../../../schema/algolia'

export const algoria = new Hono()

algoria.post('/', async () => {
  const objects = await db.select().from(zitat)

  await algoriaIndex.replaceAllObjects(objects)

  return new Response('성공적으로 업데이트되었습니다.', {
    status: 200,
  })
})

algoria.get('/', async (c) => {
  const url = new URL(c.req.url)
  const q = url.searchParams.get('q')

  if (!q) {
    return new Response(JSON.stringify([]))
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

  const body = hits?.length > 0 ? result : []

  return new Response(JSON.stringify(body), {
    status: 200,
  })
})
