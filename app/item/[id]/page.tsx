import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db, getItemById } from '../../../lib/db/db'
import { zitat } from '../../../lib/db/schema'
import Author from '../../../components/Author'
import { Fab } from '../../../components/Fab'
import Quote from '../../../components/Quote'
import { JsonLd } from '../../../components/json-ld'
import {
  generateQuoteMeta,
  generateCanonicalUrl,
  generateQuoteJsonLd,
} from '../../../lib/seo.utils'
import { siteConfig } from '../../../lib/site.config'

type Params = {
  id: string
}

type Props = {
  params: Params
}

export async function generateStaticParams(): Promise<Params[]> {
  const rows = await db.select({ id: zitat.uuid }).from(zitat)

  return rows.map(({ id }) => ({
    id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [item] = await getItemById(params.id)

  if (!item) {
    return {
      title: 'zitat - 404',
      description: '요청하신 명언을 찾을 수 없습니다.',
    }
  }

  const { title, description } = generateQuoteMeta(item)
  const canonicalUrl = generateCanonicalUrl(`/item/${params.id}`)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Zitat',
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

async function Detail({ params }: Props): Promise<React.ReactElement> {
  const [item] = await getItemById(params.id)

  if (!item) {
    notFound()
  }

  const canonicalUrl = generateCanonicalUrl(`/item/${params.id}`)
  const jsonLd = generateQuoteJsonLd(item, canonicalUrl)

  return (
    <>
      <JsonLd data={jsonLd} />
      <blockquote>
        <Quote data-is-long={Boolean(item.quote && item.quote.length > 100)}>
          {item.quote}
        </Quote>
        <Author author={item.author} />
      </blockquote>
      <Fab text={`${item.quote}${item.author && `\n\n-${item.author}`}`} />
    </>
  )
}

export default Detail
