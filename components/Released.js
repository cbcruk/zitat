import { getFormattedDate } from 'utils'

/**
 *
 * @param {object} props
 * @param {string | Date} props.created
 * @param {string | Date} props.released
 */
function Released({ created, released }) {
  return (
    <p className="Released" title={created || ''}>
      <style jsx>{`
        .Released {
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
      {released || getFormattedDate(new Date())}
    </p>
  )
}

export default Released
