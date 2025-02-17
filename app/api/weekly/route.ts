import { headers } from 'next/headers'
import redis, { ZITAT_WEEKLY } from '../../../lib/redis'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const headersList = headers()
  const id = headersList.get('id')
  const body = await request.json()

  if (id === process.env.SCRIPT_ID) {
    await redis.set(ZITAT_WEEKLY, JSON.stringify(body))

    revalidatePath('/', 'page')
    revalidatePath('/list', 'layout')

    return new Response('성공적으로 업데이트되었습니다.', {
      status: 200,
    })
  } else {
    return new Response('잘못된 스크립트 ID입니다.', {
      status: 401,
    })
  }
}
