// @ts-check
import { Transition } from 'react-transition-group'

const duration = 3000

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

/**
 *
 * @param {object} props
 * @param {boolean} props.in
 * @param {number=} props.timeout
 * @param {JSX.Element} props.children
 * @returns
 */
function Fade({ in: inProp, timeout, children }) {
  return (
    <Transition in={inProp} timeout={timeout || duration}>
      {(state) => {
        return (
          <div
            style={{
              transition: `opacity ${timeout || duration}ms ease-in-out`,
              opacity: 0,
              ...transitionStyles[state],
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
