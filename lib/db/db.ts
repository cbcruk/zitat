import { drizzle } from 'drizzle-orm/libsql'
import { SelectQuoteSchema, zitat, DateRangeSchema } from './schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { createClient } from '@libsql/client'

const client = createClient({
  url: 'file:zitat.db',
})

export const db = drizzle(client)

export async function getListByQuery(q: string) {
  const result = await client.execute(
    `SELECT uuid, date, highlight(zitat_fts, 2, '<em>', '</em>') as quote, highlight(zitat_fts, 3, '<em>', '</em>') as author FROM zitat_fts WHERE zitat_fts MATCH '${q}*';`
  )

  return result.rows
}

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
