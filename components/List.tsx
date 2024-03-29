import { SearchItem, TodayItem } from '../lib/types'

type Props = {
  data?: TodayItem[] | SearchItem[]
}

function QuoteList({ data }: Props) {
  if (!data) {
    return null
  }

  return (
    <div className="List">
      <style jsx>{`
        .List-item {
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .Item {
          border-top: 1px solid var(--md-sys-color-outline);
          word-break: keep-all;
          white-space: pre-line;
        }

        .Item:first-child {
          border-top: 0;
        }

        .Item :global(em) {
          padding: 1px;
          background-color: var(--md-sys-color-primary);
          border-radius: 5px;
          font-style: normal;
          font-weight: 500;
          text-shadow: 0 0;
          color: var(--md-sys-color-on-primary);
        }

        .Item-author {
          margin-top: 4px;
          font-size: 12px;
        }
      `}</style>
      {data.map(({ id, quote, author }) => {
        return (
          <div key={id} className="List-item Item">
            <div
              className="Item-quote"
              dangerouslySetInnerHTML={{ __html: quote }}
            />
            <div
              className="Item-author"
              dangerouslySetInnerHTML={{ __html: author }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default QuoteList
