import { z } from 'zod'

const todayItemSchema = z.object({
  author: z.string(),
  created_at: z.string(),
  created_at_text: z.string().optional(),
  id: z.string(),
  quote: z.string(),
  released: z.string(),
  released_text: z.string().optional(),
  released_date_string: z.string(),
})

export type TodayItemSchema = z.infer<typeof todayItemSchema>
