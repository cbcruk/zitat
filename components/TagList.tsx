import Link from 'next/link'
import { SearchHistoryItems } from '../lib/types'

type Props = {
  items: SearchHistoryItems
}

function TagList({ items }: Props) {
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
          flex-wrap: wrap;
          gap: 10px;
          font-size: 12px;
        }

        .TagList-items :global(a) {
          text-decoration: none;
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
              <span className="TagList-item">{item}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagList
