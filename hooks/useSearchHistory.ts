import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SearchHistoryItems } from '../lib/types'

export const KEY = 'ZITAT_SEARCH_Q'

export function useSearchHistory(hasData: boolean) {
  const initialState: SearchHistoryItems = []
  const [items, setItems] = useState(initialState)
  const router = useRouter()
  const q = router.query?.q || ''

  useEffect(() => {
    const items: SearchHistoryItems =
      JSON.parse(localStorage.getItem(KEY) || '[]') || []
    setItems(items)
  }, [])

  useEffect(() => {
    if (hasData) {
      const nextItems = (items: SearchHistoryItems) =>
        Array.from(new Set(items.concat(q))).filter(Boolean)
      setItems((items) => nextItems(items))
      localStorage.setItem(KEY, JSON.stringify(nextItems(items)))
    }
  }, [hasData, q])

  return {
    items,
  }
}
