import { db } from '../../../lib/db/db'
import { zitat } from '../../../lib/db/schema'

export async function POST(request: Request) {
  const rows = (await request.json()) as string[][]

  await db.insert(zitat).values(
    rows.map((row) => {
      const [uuid, date, quote, author] = row

      return {
        uuid,
        date,
        quote,
        author,
      }
    })
  )

  return new Response('성공적으로 업데이트되었습니다.', {
    status: 200,
  })
}
