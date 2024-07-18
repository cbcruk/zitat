import Author from '../components/Author'
import { Fab } from '../components/Fab'
import Quote from '../components/Quote'
import Released from '../components/Released'
import { weekly } from '../lib/sheet'

async function Home() {
  const data = await weekly()
  const item = data.at(0)

  if (!item) {
    return null
  }

  return (
    <div className="break-keep">
      <Released
        created_at_text={item.created_at_text}
        released_text={item.released_text}
      />
      <Quote data-is-long={Boolean(item.quote && item.quote.length > 100)}>
        {item.quote}
      </Quote>
      <Author author={item.author} />
      <Fab text={`${item.quote}${item.author && `\n\n-${item.author}`}`} />
    </div>
  )
}

export default Home
