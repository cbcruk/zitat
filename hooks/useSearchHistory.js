import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SUCCESS } from './useData'

export const KEY = 'ZITAT_SEARCH_Q'

export function useSearchHistory(status) {
  const [items, setItems] = useState([])
  const router = useRouter()
  const q = router.query?.q

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(KEY)) || []
    setItems(items)
  }, [])

  useEffect(() => {
    if (status === SUCCESS) {
      const nextItems = (items) => items.concat(q)
      setItems((items) => nextItems(items))
      localStorage.setItem(KEY, JSON.stringify(nextItems(items)))
    }
  }, [q, status])

  return {
    items,
  }
}
