import { useEffect } from 'react'
import { TodayItem } from '../lib/types'

export const KEY = 'ZITAT_WEEKLY_ITEMS'

export function useSaveData(data: TodayItem[]) {
  useEffect(() => {
    if (data?.length > 0) {
      localStorage.setItem(KEY, JSON.stringify(data))
    }
  }, [data])
}
