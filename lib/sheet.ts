import { TodayItemSchema } from '../schema/item'
import { getFormattedDate } from '../utils'

export async function weekly() {
  const response = await fetch(
    `https://script.google.com/macros/s/${process.env.SCRIPT_URL}/exec?type=weekly`,
    {
      next: {
        tags: ['weekly'],
        revalidate: 86400,
      },
    }
  )
  const data = (await response.json()) as unknown as TodayItemSchema[]

  if (!Array.isArray(data)) {
    return []
  }

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
