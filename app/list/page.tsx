import { QuoteItem } from '../../components/QuoteItem'
import QuoteList from '../../components/QuoteList'
import { weekly } from '../../lib/sheet'

export const metadata = {
  title: 'zitat - 기록',
}

async function List() {
  const data = await weekly()

  return (
    <QuoteList>
      {data.map(({ id, quote, author }) => {
        return (
          <QuoteItem key={id} id={id}>
            <QuoteItem.Body>{quote}</QuoteItem.Body>
            <QuoteItem.Author>{author}</QuoteItem.Author>
          </QuoteItem>
        )
      })}
    </QuoteList>
  )
}

export default List
