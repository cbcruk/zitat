import clsx from 'clsx'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import usePage from '../hooks/usePage'
import Fade from './Fade'

function App({ total, isPending, children }) {
  const { page, isStart, isEnd, handlers } = usePage(total)

  return (
    <Fade in={!isPending}>
      <div className="App" {...handlers}>
        <style jsx>{`
          .App {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .App-inner {
            display: flex;
            flex-direction: column;
            flex: 1;
            position: relative;
            z-index: 2;
            padding: 1.618rem;
            background-color: #f5cac3;
            box-shadow: inset 10px 0px 10px 0px rgb(0 0 0 / 25%);
          }

          .App-inner.is-end {
            box-shadow: inset -10px 0px 10px 0px rgb(0 0 0 / 25%);
          }

          @supports (-webkit-touch-callout: none) {
            .App {
              height: -webkit-fill-available !important;
              min-height: unset;
            }
          }
        `}</style>
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
