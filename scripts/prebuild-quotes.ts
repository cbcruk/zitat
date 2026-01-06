import { createClient } from '@libsql/client'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

interface QuoteRecord {
  uuid: string
  date: string
  quote: string
  author: string
  keywords: string | null
}

async function prebuildQuotes(): Promise<void> {
  const client = createClient({
    url: 'file:zitat.db',
  })

  const result = await client.execute(
    'SELECT uuid, date, quote, author, keywords FROM zitat'
  )

  const quotes: QuoteRecord[] = result.rows.map((row) => ({
    uuid: row[0] as string,
    date: row[1] as string,
    quote: row[2] as string,
    author: row[3] as string,
    keywords: row[4] as string | null,
  }))

  const outputPath = resolve(process.cwd(), 'lib/db/quotes-cache.json')

  writeFileSync(outputPath, JSON.stringify(quotes), 'utf-8')

  console.log(
    `Prebuild complete: ${quotes.length} quotes exported to ${outputPath}`
  )
}

prebuildQuotes().catch(console.error)
