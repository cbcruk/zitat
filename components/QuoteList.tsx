import { TodayItemSchema } from '../schema/item'
import Link from 'next/link'
import { List } from './List'

type Props = {
  data: TodayItemSchema[]
}

function QuoteList({ data }: Props) {
  return (
    <List>
      {data.map(({ id, quote, author }) => {
        return (
          <div
            key={id}
            className="py-[10px] first:pt-0 border-[var(--md-sys-color-outline)] break-keep whitespace-pre-line"
          >
            <Link href={`/list/${id}`}>
              <p dangerouslySetInnerHTML={{ __html: quote }} />
              <p
                className="mt-[4px] text-[12px]"
                dangerouslySetInnerHTML={{ __html: author }}
              />
            </Link>
          </div>
        )
      })}
    </List>
  )
}

export default QuoteList
