// @ts-check
import mem from 'mem'
import redis, { ZITAT_WEEKLY } from '../../lib/redis'

/**
 * @type {() => Promise<SearchItem[]>}
 */
const memoized = mem(
  async () => {
    const response = await fetch(
      `${process.env.SPREADSHEET_URL}/exec?type=weekly`
    )
    const data = await response.json()

    return data
  },
  {
    maxAge: 3600000,
  }
)

/**
 * @type {import('next').NextApiHandler}
 */
async function weekly(req, res) {
  if (req.method === 'GET') {
    res.json((await redis.get(ZITAT_WEEKLY)) || (await memoized()))
  }

  if (req.method === 'POST') {
    if (req.headers.id === process.env.SCRIPT_ID) {
      await redis.set(ZITAT_WEEKLY, JSON.stringify(req.body))
      res.status(200).end()
    } else {
      res.status(401).end()
    }
  }
}

export default weekly
