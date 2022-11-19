import { useReducer } from 'react'
import { useSwipeable } from 'react-swipeable'

const PREV = 'PREV'
const NEXT = 'NEXT'

const initalState = { page: 0 }

type Action = typeof PREV | typeof NEXT

function usePage(total: number) {
  const lastIndex = total - 1
  const [{ page }, dispatch] = useReducer(
    (state: typeof initalState, action: Action) => {
      switch (action) {
        case PREV:
          return {
            page: Math.max(state.page - 1, 0),
          }
        case NEXT:
          return {
            page: Math.min(state.page + 1, lastIndex),
          }
        default:
          return state
      }
    },
    initalState
  )
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      dispatch(PREV)
    },
    onSwipedRight: () => {
      dispatch(NEXT)
    },
    trackMouse: true,
  })

  return {
    page,
    handlers,
    dispatch,
    isStart: page === 0,
    isEnd: page === lastIndex,
  }
}

export default usePage
