import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { SelectQuoteSchema, zitat, DateRangeSchema } from './schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'

export const sqlite = new Database('zitat.db')

export const db = drizzle(sqlite)

export function getListByQuery(q: string) {
  const result = db.all<SelectQuoteSchema>(
    sql`SELECT uuid, date, highlight(zitat_fts, 2, '<em>', '</em>') as quote, highlight(zitat_fts, 3, '<em>', '</em>') as author FROM zitat_fts WHERE zitat_fts MATCH '${q}*';`
  )

  return result
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

export function getDateRanges() {
  const result = db.all<DateRangeSchema>(
    sql`SELECT strftime('%Y-%m', MIN(date)) AS first_month, strftime('%Y-%m', MAX(date)) AS last_month FROM ${zitat}`
  )

  return result.at(0)
}

export function getUniqueMonths() {
  const result = db.all<{ month: string }>(
    sql`SELECT DISTINCT strftime('%Y-%m', date) AS month FROM ${zitat} ORDER BY date`
  )

  return result.map((row) => row.month)
}
