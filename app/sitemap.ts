import { MetadataRoute } from 'next'
import { db } from '../lib/db/db'
import { getTableColumns } from 'drizzle-orm'
import { zitat } from '../lib/db/schema'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await db.select(getTableColumns(zitat)).from(zitat)

  return [
    {
      url: 'https://zitat.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://zitat.vercel.app/list',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://zitat.vercel.app/search',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...rows.map((row) => {
      return {
        url: `https://zitat.vercel.app/item/${row.uuid}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }
    }),
  ]
}
