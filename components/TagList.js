// @ts-check

import Link from 'next/link'

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
          font-weight: 500;
        }

        .TagList-items {
          display: flex;
          gap: 10px;
          font-size: 12px;
        }

        .TagList-item {
          display: inline-flex;
          align-items: center;
          height: 32px;
          padding: 6px 12px;
          border-radius: 10px;
          border: 1px solid var(--md-sys-color-outline);
          color: var(--md-sys-color-on-surface-variant);
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          text-decoration: none;
          transition: all 0.3s ease-out;
        }

        .TagList-item:hover {
          background-color: rgba(73, 69, 79, 0.08);
        }

        .TagList-title {
          display: none;
          font-weight: 500;
        }
      `}</style>
      <div className="TagList-details">
        <div className="TagList-title">검색 기록</div>
        <div className="TagList-items">
          {items.map((item, index) => (
            <Link
              key={index}
              href={{
                query: {
                  q: item,
                },
              }}
            >
              <a className="TagList-item">{item}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagList
