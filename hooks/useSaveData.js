// @ts-check
import { useEffect } from 'react'

export const KEY = 'ZITAT_WEEKLY_ITEMS'

/**
 *
 * @param {TodayItem[]} data
 */
export function useSaveData(data) {
  useEffect(() => {
    if (data?.length > 0) {
      localStorage.setItem(KEY, JSON.stringify(data))
    }
  }, [data])
}
