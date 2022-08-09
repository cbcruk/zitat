// @ts-check
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const KEY = 'ZITAT_SEARCH_Q'

/**
 * @param {boolean} hasData
 */
export function useSearchHistory(hasData) {
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
    if (hasData) {
      /** @type {(items: SearchHistoryItems) => SearchHistoryItems} */
      const nextItems = (items) =>
        Array.from(new Set(items.concat(q))).filter(Boolean)
      setItems((items) => nextItems(items))
      localStorage.setItem(KEY, JSON.stringify(nextItems(items)))
    }
  }, [q, hasData])

  return {
    items,
  }
}
