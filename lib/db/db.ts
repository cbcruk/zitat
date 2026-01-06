import { drizzle } from 'drizzle-orm/libsql'
import { SelectQuoteSchema, zitat, DateRangeSchema } from './schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { createClient } from '@libsql/client'

const client = createClient({
  url: 'file:zitat.db',
})

export const db = drizzle(client)

export function getListByDate(date: `${string}-${string}` | string) {
  const result = db.all<SelectQuoteSchema>(
    sql`SELECT * FROM ${zitat} WHERE strftime('%Y-%m', date) = ${date}`
  )

  return result
}

export async function getRandomItem() {
  const result = await db
    .select(getTableColumns(zitat))
    .from(zitat)
    .orderBy(sql`RANDOM()`)
    .limit(1)

  return result.at(0)
}

export function getItemById(id: SelectQuoteSchema['uuid']) {
  return db.select().from(zitat).where(eq(zitat.uuid, id))
}

export async function getDateRanges() {
  const result = await db.all<DateRangeSchema>(
    sql`SELECT strftime('%Y-%m', MIN(date)) AS first_month, strftime('%Y-%m', MAX(date)) AS last_month FROM ${zitat}`
  )

  return result.at(0)
}

export async function getUniqueMonths() {
  const result = await db.all<{ month: string }>(
    sql`SELECT DISTINCT strftime('%Y-%m', date) AS month FROM ${zitat} ORDER BY date`
  )

  return result.map((row) => row.month)
}
