import { Hono } from 'hono'
import { db } from '../../../lib/db/db'
import { zitat } from '../../../lib/db/schema'
import { z } from 'zod'
import { randomUUID } from 'crypto'

const insertQuoteSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
})

export const quote = new Hono()

quote.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const { quote, author } = insertQuoteSchema.parse(body)
    const uuid = randomUUID()
    const date = new Date().toISOString().split('T')[0]

    await db.insert(zitat).values({
      uuid,
      date,
      quote,
      author,
    })

    return new Response(
      JSON.stringify({
        uuid,
        date,
        quote,
        author,
      }),
      {
        status: 200,
      }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid input', details: error.errors }, 400)
    }

    console.error('Error inserting quote:', error)

    return c.json({ error: 'Internal server error' }, 500)
  }
})
