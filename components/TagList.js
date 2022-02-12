// @ts-check

/**
 *
 * @param {object} props
 * @param {SearchHistoryItems} props.items
 * @returns
 */
function TagList({ items }) {
  return (
    <div className="TagList">
      <style jsx>{`
        .TagList-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
        }

        .TagList-items {
          display: flex;
          gap: 6px;
          margin-top: 10px;
          font-size: 12px;
        }

        .TagList-item {
          padding: 2px 4px;
          border: 1px solid #442c2e;
          border-radius: 10px;
          transition: all 0.3s ease-out;
        }

        .TagList-item:hover {
          border-color: var(--color-primary-dark);
        }

        .TagList-title {
          font-weight: bold;
        }
      `}</style>
      <details>
        <summary className="TagList-title">검색 기록</summary>
        <div className="TagList-items">
          {items.map((item, index) => (
            <span key={index} className="TagList-item">
              {item}
            </span>
          ))}
        </div>
      </details>
    </div>
  )
}

export default TagList
