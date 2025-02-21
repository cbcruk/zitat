import { db, getItemById } from '../../../lib/db/db'
import { zitat } from '../../../lib/db/schema'
import Author from '../../../components/Author'
import { Fab } from '../../../components/Fab'
import Quote from '../../../components/Quote'

type Params = {
  id: string
}

type Props = {
  params: Params
}

export async function generateStaticParams() {
  const rows = await db.select({ id: zitat.uuid }).from(zitat)

  return rows.map(({ id }) => ({
    id,
  }))
}

async function Detail({ params }: Props) {
  const [item] = await getItemById(params.id)

  if (!item) {
    return null
  }

  return (
    <>
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
