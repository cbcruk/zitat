// @ts-check
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SUCCESS } from './useData'

export const KEY = 'ZITAT_SEARCH_Q'

/**
 * @param {HttpStatus} status
 */
export function useSearchHistory(status) {
  /** @type {SearchHistoryItems} */
  const initialState = []
  const [items, setItems] = useState(initialState)
  const router = useRouter()
  const q = router.query?.q

  useEffect(() => {
    /** @type {SearchHistoryItems} */
    const items = JSON.parse(localStorage.getItem(KEY)) || []
    setItems(items)
  }, [])

  useEffect(() => {
    if (status === SUCCESS) {
      /** @type {(items: SearchHistoryItems) => SearchHistoryItems} */
      const nextItems = (items) => items.concat(q)
      setItems((items) => nextItems(items))
      localStorage.setItem(KEY, JSON.stringify(nextItems(items)))
    }
  }, [q, status])

  return {
    items,
  }
}
