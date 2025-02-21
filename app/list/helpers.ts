import { getDateRanges } from '../../lib/db/db'

export function getDefaultDateRanges() {
  const dateRanges = getDateRanges()!
  const first = dateRanges.first_month
  const last = dateRanges.last_month

  return [first, last]
}
