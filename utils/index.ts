import dayjs from 'dayjs'

export function getFormattedDate(date: string | Date) {
  return dayjs(date).format('YYYY년 MM월 DD일')
}
