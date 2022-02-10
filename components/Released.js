// @ts-check
import dayjs from 'dayjs'

/**
 *
 * @param {string | Date} date
 * @returns
 */
function getFormattedDate(date) {
  return dayjs(date).format('YYYY년 MM월 DD일')
}

/**
 *
 * @param {object} props
 * @param {string | Date} props.created
 * @param {string | Date} props.released
 */
function Released({ created, released }) {
  return (
    <p className="Released" title={created ? getFormattedDate(created) : ''}>
      <style jsx>{`
        .Released {
          display: flex;
          align-items: center;
          color: #f28482;
        }

        .Released-button {
          border: 0;
          background-color: transparent;
          color: inherit;
          cursor: pointer;
        }
      `}</style>
      {getFormattedDate(released || new Date())}
    </p>
  )
}

export default Released
