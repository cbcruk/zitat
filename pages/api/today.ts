import mem from 'mem'
import { NextApiRequest, NextApiResponse } from 'next'
import { TodayItem } from '../../lib/types'

const memoized = mem(
  async () => {
    const response = await fetch(
      `${process.env.SPREADSHEET_URL}/exec?type=today`
    )
    const data: TodayItem[] = await response.json()

    return data
  },
  {
    maxAge: 3600000,
  }
)

async function today(_req: NextApiRequest, res: NextApiResponse) {
  const data = await memoized()

  res.json(data)
}

export default today
