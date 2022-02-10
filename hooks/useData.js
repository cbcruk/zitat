// @ts-check
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'

/**
 * @typedef State
 * @property {HttpStatus} status
 * @property {SearchItem[]=} data
 *
 * @typedef Action
 * @property {HttpStatus} type
 * @property {SearchItem[]=} payload
 */

export const IDLE = 'idle'
export const PENDING = 'pending'
export const SUCCESS = 'success'

export function useData() {
  const router = useRouter()
  const q = router.query?.q
  const [state, dispatch] = useReducer(
    /**
     *
     * @param {State} state
     * @param {Action} action
     * @return {State}
     */
    (state, action) => {
      switch (action.type) {
        case PENDING:
          return {
            ...state,
            status: PENDING,
          }
        case SUCCESS:
          return {
            ...state,
            status: SUCCESS,
            data: action.payload,
          }
        default:
          return state
      }
    },
    {
      status: IDLE,
      data: null,
    }
  )

  useEffect(() => {
    if (q) {
      dispatch({
        type: PENDING,
      })

      fetch(`/api/search?q=${q}`)
        .then(
          /**
           *
           * @returns {Promise<SearchItem[]>}
           */
          (r) => r.json()
        )
        .then((data) => {
          dispatch({
            type: SUCCESS,
            payload: data,
          })
        })
    }
  }, [q])

  return {
    state,
    isNoResult: q && state.data?.length === 0,
  }
}
