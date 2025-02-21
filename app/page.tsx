import Author from '../components/Author'
import { Fab } from '../components/Fab'
import Quote from '../components/Quote'
import Released from '../components/Released'
import { getRandomItem } from '../lib/db/db'

async function Home() {
  const item = await getRandomItem()

  if (!item) {
    return null
  }

  return (
    <>
      <Released released={item.date} />
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

export const revalidate = 3600

export default Home
