import { Transition, TransitionStatus } from 'react-transition-group'

const duration = 3000

const transitionStyles = (key: TransitionStatus) => {
  switch (key) {
    case 'entering':
    case 'entered':
      return {
        opacity: 1,
      }
    case 'exiting':
    case 'exited':
      return {
        opacity: 0,
      }
    default:
      return {
        opacity: 0,
      }
  }
}

type Props = {
  in: boolean
  timeout?: number
  children?: JSX.Element
}

function Fade({ in: inProp, timeout, children }: Props) {
  return (
    <Transition in={inProp} timeout={timeout || duration}>
      {(state) => {
        return (
          <div
            style={{
              transition: `opacity ${timeout || duration}ms ease-in-out`,
              ...transitionStyles(state),
            }}
          >
            {children}
          </div>
        )
      }}
    </Transition>
  )
}

export default Fade
