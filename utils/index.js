// @ts-check
import dayjs from 'dayjs'

/**
 *
 * @param {string | Date} date
 * @returns
 */
export function getFormattedDate(date) {
  return dayjs(date).format('YYYY년 MM월 DD일')
}
