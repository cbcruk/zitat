import { IconContentCopy } from './icons'

type Props = {
  handleClick: () => void
}

export function Fab({ handleClick }: Props) {
  return (
    <button onClick={handleClick} className="Fab">
      <style jsx>{`
        .Fab {
          position: fixed;
          right: 1.618rem;
          bottom: calc(80px + 1.618rem);
          width: 56px;
          height: 56px;
          border: 0;
          border-radius: 16px;
          box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
          filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3));
          background-color: var(--md-sys-color-secondary);
          cursor: pointer;
        }
      `}</style>
      <IconContentCopy />
    </button>
  )
}
