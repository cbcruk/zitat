import { TodayItemSchema } from '../schema/item'
import { getFormattedDate } from '../utils'
import { getResult } from './redis'

export async function weekly() {
  const rawData = await getResult()
  const data = JSON.parse(rawData || '')

  if (!Array.isArray(data)) {
    return []
  }

  const transformData = (data as TodayItemSchema[]).map((item) => {
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
