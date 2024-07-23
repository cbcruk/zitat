import { headers } from 'next/headers'
import redis, { ZITAT_WEEKLY } from '../../../lib/redis'

export async function POST(request: Request) {
  const headersList = headers()
  const id = headersList.get('id')

  if (id === process.env.SCRIPT_ID) {
    await redis.set(ZITAT_WEEKLY, JSON.stringify(request.body))

    return new Response('성공적으로 업데이트되었습니다.', {
      status: 200,
    })
  } else {
    return new Response('잘못된 스크립트 ID입니다.', {
      status: 401,
    })
  }
}
