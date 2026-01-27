import { MetadataRoute } from 'next'
import { db } from '../lib/db/db'
import { getTableColumns } from 'drizzle-orm'
import { zitat } from '../lib/db/schema'
import { siteConfig } from '../lib/site.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await db.select(getTableColumns(zitat)).from(zitat)

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/list`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...rows.map((row) => {
      return {
        url: `${siteConfig.url}/item/${row.uuid}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }
    }),
  ]
}
