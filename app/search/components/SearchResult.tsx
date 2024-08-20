import { SelectQuoteSchema } from '../../../lib/db/schema'
import { QuoteItem } from '../../../components/QuoteItem'
import QuoteList from '../../../components/QuoteList'

type Props = {
  data: SelectQuoteSchema[]
}

export function SearchResult({ data }: Props) {
  return (
    <QuoteList>
      {data.map(({ uuid, quote, author }) => {
        return (
          <QuoteItem key={uuid} id={uuid}>
            <QuoteItem.Body>{quote}</QuoteItem.Body>
            <QuoteItem.Author>{author}</QuoteItem.Author>
          </QuoteItem>
        )
      })}
    </QuoteList>
  )
}
