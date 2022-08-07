// @ts-check
import { getFormattedDate } from 'utils'
import { getResult } from './redis'

export async function weekly() {
  const rawData = await getResult()
  /** @type {TodayItem[]} */
  const data = JSON.parse(rawData)
  const transformData = data.map((item) => {
    return {
      ...item,
      created_at_text: getFormattedDate(item.created_at),
      released_text: getFormattedDate(item.released),
    }
  })

  return transformData
}
