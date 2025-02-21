import { QuoteFilters } from '../../components/QuoteFilters'
import { QuoteItem } from '../../components/QuoteItem'
import QuoteList from '../../components/QuoteList'
import { getListByDate, getUniqueMonths } from '../../lib/db/db'
import { ListProps } from './types'

export const metadata = {
  title: 'zitat - 기록',
}

async function List({ searchParams }: ListProps) {
  const months = getUniqueMonths()
  const first = months.at(0)!
  const last = months.at(-1)!
  const defaultDate = searchParams.date ?? last
  const currentIndex = months.findIndex((month) => month === defaultDate)
  const data = getListByDate(defaultDate)

  return (
    <div className="flex flex-col gap-2">
      <QuoteFilters
        ranges={[
          first,
          months[currentIndex - 1] ?? null,
          months[currentIndex],
          months[currentIndex + 1] ?? null,
          last,
        ]}
      />
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
    </div>
  )
}

export default List
