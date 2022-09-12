import { getFormattedDate } from 'utils'

/**
 *
 * @param {object} props
 * @param {string | Date} props.created
 * @param {string | Date} props.released
 * @param {JSX.Element} props.children
 */
function Released({ created, released, children }) {
  return (
    <div className="Released">
      <style jsx>{`
        .Released {
          display: flex;
          justify-content: space-between;
        }

        .Released-date {
          display: flex;
          align-items: center;
          color: var(--md-sys-color-tertiary);
        }

        .Released-button {
          border: 0;
          background-color: transparent;
          color: inherit;
          cursor: pointer;
        }
      `}</style>
      <p className="Released-date" title={created || ''}>
        {released || getFormattedDate(new Date())}
      </p>
      {children}
    </div>
  )
}

export default Released
