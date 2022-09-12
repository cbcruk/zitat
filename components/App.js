// @ts-check
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import usePage from '../hooks/usePage'
import Author from './Author'
import Fade from './Fade'
import { Navigate } from './Navigate'
import Quote from './Quote'
import Released from './Released'

/**
 *
 * @param {object} props
 * @param {import('$lib/types').TodayItem[]} props.data
 */
function App({ data }) {
  const total = data.length ?? 0
  const { page, isStart, isEnd, handlers, dispatch } = usePage(total)

  return (
    <>
      <style jsx>{`
        .App {
          word-break: keep-all;
        }
      `}</style>
      <Fade in>
        <div className="App" {...handlers}>
          {(() => {
            const item = data[page]

            if (!item) {
              return null
            }

            return (
              <>
                <Released
                  created={item.created_at_text}
                  released={item.released_text}
                >
                  <Navigate
                    handlePrev={() => dispatch('NEXT')}
                    handleNext={() => dispatch('PREV')}
                    isStart={isStart}
                    isEnd={isEnd}
                  />
                </Released>
                <SwitchTransition>
                  <CSSTransition
                    key={page}
                    addEndListener={(node, done) =>
                      node.addEventListener('transitionend', done, false)
                    }
                    classNames="fade"
                  >
                    <div className="App-body">
                      <Quote isLong={item.quote && item.quote.length > 100}>
                        {item.quote}
                      </Quote>
                      <Author author={item.author} />
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              </>
            )
          })()}
        </div>
      </Fade>
    </>
  )
}

export default App
