import { getFormattedDate } from '../utils'
import { getResult } from './redis'
import { TodayItem } from './types'

export async function weekly() {
  const rawData = await getResult()
  const data: TodayItem[] = JSON.parse(rawData || '')
  const transformData = data.map((item) => {
    return {
      ...item,
      created_at_text: getFormattedDate(item.created_at),
      released_text: getFormattedDate(
        item.released_date_string || item.released
      ),
    }
  })

  return transformData
}
