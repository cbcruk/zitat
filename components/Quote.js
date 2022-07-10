// @ts-check
import clsx from 'clsx'

/**
 *
 * @param {object} props
 * @param {boolean=} props.isLong
 * @param {JSX.Element | string} props.children
 */
function Quote({ isLong, children }) {
  return (
    <p
      className={clsx('Quote', {
        'is-long': isLong,
      })}
    >
      <style jsx>{`
        .Quote {
          margin-top: 0.702rem;
          margin-bottom: 0.702rem;
          white-space: pre-line;
          word-break: keep-all;
          font-size: 2.618rem;
        }

        .Quote.is-long {
          font-size: 1.618rem;
        }
      `}</style>
      {children}
    </p>
  )
}

export default Quote
