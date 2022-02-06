import { useEffect, useState } from 'react'
import { KEY } from './useSaveData'

export function useWeeklyData() {
  const [data, setData] = useState([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(KEY) || '')

    if (items) {
      setData(items)
    }
  }, [])

  return {
    data,
  }
}
