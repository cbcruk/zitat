import { revalidatePath } from 'next/cache'
import { Hono } from 'hono'

export const revalidate = new Hono()

revalidate.get('/', async (c) => {
  const url = new URL(c.req.url)
  const secret = url.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response('토큰값이 잘못되었습니다.', {
      status: 401,
    })
  }

  revalidatePath('/', 'page')
  revalidatePath('/list', 'layout')

  return new Response('성공', {
    status: 200,
  })
})
