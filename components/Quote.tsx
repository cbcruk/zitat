import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'

type Props = {
  isLong?: boolean
  children: React.ReactNode
}

function Quote({ isLong, children }: Props) {
  return (
    <Balancer>
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
    </Balancer>
  )
}

export default Quote
