import { Metadata } from 'next'
import Author from '../components/Author'
import Quote from '../components/Quote'
import { getRandomItems } from '../lib/db/db'
import { siteConfig } from '../lib/site.config'

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name}`,
    description: '매일 새로운 명언을 만나보세요.',
    url: siteConfig.url,
    type: 'website',
  },
}

async function Home() {
  const [item] = await getRandomItems(1)

  if (!item) {
    return null
  }

  return (
    <blockquote>
      <Quote data-is-long={Boolean(item.quote && item.quote.length > 100)}>
        {item.quote}
      </Quote>
      <Author author={item.author} />
    </blockquote>
  )
}

export const revalidate = 3600

export default Home
