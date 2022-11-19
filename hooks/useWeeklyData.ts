import { useEffect, useState } from 'react'
import { TodayItem } from '../lib/types'
import { KEY } from './useSaveData'

export function useWeeklyData() {
  const initialState: TodayItem[] = []
  const [data, setData] = useState<typeof initialState>(initialState)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(KEY) || '')

    if (typeof items !== 'string') {
      setData(items)
    }
  }, [])

  return {
    data,
  }
}
