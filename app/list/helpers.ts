import { getDateRanges } from '../../lib/db/db'

export async function getDefaultDateRanges() {
  const dateRanges = await getDateRanges()
  const first = dateRanges?.first_month
  const last = dateRanges?.last_month

  return [first, last]
}
