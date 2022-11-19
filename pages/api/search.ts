import algoliasearch from 'algoliasearch'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { AlgoliaSearchResponse } from '../../lib/types'

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_API_KEY || ''
)
const index = client.initIndex('zitat')

export async function handlePost() {
  const {
    data,
  }: {
    data: string[]
  } = await axios.get(
    `https://script.google.com/macros/s/${process.env.SCRIPT_ID}/exec`,
    {
      params: {
        type: 'all',
      },
    }
  )
  const items = data.map((d) => {
    return {
      desc: d[2],
      author: d[3],
    }
  })

  const response = await index.replaceAllObjects(items, {
    autoGenerateObjectIDIfNotExist: true,
  })

  return response
}

async function search(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const { q } = query

  if (method === 'GET') {
    if (typeof q === 'string') {
      const { hits }: AlgoliaSearchResponse = await index.search(q, {
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

      if (hits?.length > 0) {
        res.json(result)
      } else {
        res.json([])
      }
    }
  }
}

export default search
