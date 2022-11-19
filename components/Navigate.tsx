import { Paging } from '../lib/types'
import { IconNext, IconPrev } from './icons'

type Props = {
  handlePrev: () => void
  handleNext: () => void
  isStart: Paging['isStart']
  isEnd: Paging['isEnd']
}

export function Navigate({ handlePrev, handleNext, isStart, isEnd }: Props) {
  return (
    <div className="Navigate">
      <style jsx>{`
        .Navigate {
          display: flex;
          margin-top: auto;
          gap: 10px;
        }

        .Navigate-button {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          background-color: var(--md-sys-color-secondary);
          border: 0;
          border-radius: 16px;
          cursor: pointer;
        }

        .Navigate-button[disabled] {
          opacity: 0.5;
        }
      `}</style>
      <button
        className="Navigate-button"
        title="이전의"
        onClick={handlePrev}
        disabled={isEnd}
      >
        <IconPrev />
      </button>
      <button
        className="Navigate-button"
        title="다음으로"
        onClick={handleNext}
        disabled={isStart}
      >
        <IconNext />
      </button>
    </div>
  )
}
