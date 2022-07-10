// @ts-check

/**
 *
 * @param {object} props
 * @param {(TodayItem[]|SearchItem[])=} props.data
 * @returns
 */
function QuoteList({ data }) {
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
          border-top: 1px solid var(--color-primary-dark);
        }

        .Item:first-child {
          border-top: 0;
        }

        .Item :global(em) {
          padding: 1px;
          background-color: var(--color-primary-dark);
          border-radius: 5px;
          font-style: normal;
          text-shadow: 0 0;
        }

        .Item-quote {
          font-weight: bold;
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
