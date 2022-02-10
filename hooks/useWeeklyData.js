// @ts-check
import { useEffect, useState } from 'react'
import { KEY } from './useSaveData'

export function useWeeklyData() {
  /** @type {TodayItem[]} */
  const initialState = []
  const [data, setData] = useState(initialState)

  useEffect(() => {
    /** @type {TodayItem[] | string} */
    const items = JSON.parse(localStorage.getItem(KEY) || '')

    if (typeof items !== 'string') {
      setData(items)
    }
  }, [])

  return {
    data,
  }
}
