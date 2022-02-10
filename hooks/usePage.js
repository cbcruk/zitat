// @ts-check
import { useReducer } from 'react'
import { useSwipeable } from 'react-swipeable'

/**
 * @typedef {PREV | NEXT} Page
 */

const PREV = 'PREV'
const NEXT = 'NEXT'

/**
 *
 * @param {number} total
 * @returns
 */
function usePage(total) {
  const lastIndex = total - 1
  const [page, dispatch] = useReducer(
    /**
     *
     * @param {number} page
     * @param {Page} action
     */
    (page, action) => {
      switch (action) {
        case PREV:
          return Math.max(page - 1, 0)
        case NEXT:
          return Math.min(page + 1, lastIndex)
        default:
          return 0
      }
    },
    0
  )
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      dispatch(PREV)
    },
    onSwipedRight: () => {
      dispatch(NEXT)
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return {
    page,
    handlers,
    isStart: page === 0,
    isEnd: page === lastIndex,
  }
}

export default usePage
