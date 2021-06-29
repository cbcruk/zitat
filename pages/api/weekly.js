import mem from 'mem'
import redis, { ZITAT_WEEKLY } from '../../lib/redis'

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

async function weekly(req, res) {
  if (req.method === 'GET') {
    res.json((await redis.get(ZITAT_WEEKLY)) || (await memoized()))
  }

  if (req.method === 'POST') {
    if (req.headers.id === process.env.SCRIPT_ID) {
      redis.set(ZITAT_WEEKLY, req.body)
      res.status(200).end()
    } else {
      res.status(401).end()
    }
  }
}

export default weekly
