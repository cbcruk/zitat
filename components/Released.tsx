import { ComponentProps } from 'react'
import { getFormattedDate } from '../utils'
import { SelectQuoteSchema } from '../lib/db/schema'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = ComponentProps<'div'> & {
  released: SelectQuoteSchema['date']
}

function Released({ released, children }: Props) {
  return (
    <div className="flex justify-between">
      <p
        className="flex items-center text-[var(--md-sys-color-tertiary)]"
        title={released}
      >
        {getFormattedDate(dayjs.utc().tz('Asia/Seoul').toDate())}
      </p>
      {children}
    </div>
  )
}

export default Released
