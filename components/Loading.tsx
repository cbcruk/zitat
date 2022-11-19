import clsx from 'clsx'
import { getFormattedDate } from '../utils'
import Fade from './Fade'
import Quote from './Quote'
import Released from './Released'

type Props = {
  isPending: boolean
}

function Loading({ isPending }: Props) {
  const date = getFormattedDate(new Date())

  return (
    <Fade in={isPending} timeout={2000}>
      <div
        className={clsx('Loading', {
          'is-pending': isPending,
        })}
      >
        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .Loading {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            display: flex;
            flex-direction: column;
            height: 100vh;
            padding: 1.618rem;
            background: linear-gradient(270deg, #f5cac3, #f7ede2);
            background-size: 400% 400%;
            animation: gradient 30s ease infinite;
          }

          @supports (-webkit-touch-callout: none) {
            .Loading {
              height: -webkit-fill-available !important;
            }
          }
        `}</style>

        <Released created={date} released={date} />
        <Quote>데이터를 로딩 중입니다...</Quote>
      </div>
    </Fade>
  )
}

export default Loading
