import clsx from 'clsx'
import { SearchItem, TodayItem } from '../lib/types'
import styles from './List.module.css'

type Props = {
  data: TodayItem[] | SearchItem[]
}

function QuoteList({ data }: Props) {
  return (
    <div className="divide-y">
      {data.map(({ id, quote, author }) => {
        return (
          <div
            key={id}
            className={clsx(
              'py-[10px] border-[var(--md-sys-color-outline)] break-keep whitespace-pre-line',
              styles.item
            )}
          >
            <p dangerouslySetInnerHTML={{ __html: quote }} />
            <p
              className="mt-[4px] text-[12px]"
              dangerouslySetInnerHTML={{ __html: author }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default QuoteList
