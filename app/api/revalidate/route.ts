import { revalidatePath } from 'next/cache'

export function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response('토큰값이 잘못되었습니다.', {
      status: 401,
    })
  }

  revalidatePath('/')
  revalidatePath('/list')

  return new Response('성공', {
    status: 200,
  })
}
