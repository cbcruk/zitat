import redis, { ZITAT_WEEKLY } from '../../../lib/redis'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Hono } from 'hono'

export const weekly = new Hono()

weekly.post('/', async (c) => {
  const id = c.req.header('id')
  const body = c.body

  if (id === process.env.SCRIPT_ID) {
    await redis.set(ZITAT_WEEKLY, JSON.stringify(body))

    revalidateTag('weekly')
    revalidatePath('/')

    return new Response('성공적으로 업데이트되었습니다.', {
      status: 200,
    })
  } else {
    return new Response('잘못된 스크립트 ID입니다.', {
      status: 401,
    })
  }
})
