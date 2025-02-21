import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const zitat = sqliteTable('zitat', {
  uuid: text('uuid').primaryKey(),
  date: text('date').notNull(),
  quote: text('quote').notNull(),
  author: text('author').notNull(),
})

export const zitat_fts = sqliteTable('zitat_fts', {
  uuid: text('uuid').primaryKey(),
  date: text('date').notNull(),
  quote: text('quote').notNull(),
  author: text('author').notNull(),
})

export const selectQuoteSchema = createSelectSchema(zitat)

export type SelectQuoteSchema = z.infer<typeof selectQuoteSchema>

export const dateRangeSchema = z.object({
  first_month: z.string(),
  last_month: z.string(),
})

export type DateRangeSchema = z.infer<typeof dateRangeSchema>
