// @ts-check
import clsx from 'clsx'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import usePage from '../hooks/usePage'
import Fade from './Fade'

/**
 *
 * @param {object} props
 * @param {number} props.total
 * @param {({ page: number }) => JSX.Element} props.children
 * @returns
 */
function App({ total, children }) {
  const { page, isStart, isEnd, handlers } = usePage(total)

  return (
    <Fade in>
      <div className="App" {...handlers}>
        <SwitchTransition>
          <CSSTransition
            key={page}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="fade"
          >
            <div
              className={clsx('App-inner', {
                'is-start': isStart,
                'is-end': isEnd,
              })}
            >
              {children({ page })}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </Fade>
  )
}

export default App
