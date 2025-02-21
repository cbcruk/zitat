import { ComponentProps } from 'react'
import { getFormattedDate } from '../utils'
import { TodayItemSchema } from '../schema/item'
import { SelectQuoteSchema } from '../lib/db/schema'

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
        {getFormattedDate(new Date())}
      </p>
      {children}
    </div>
  )
}

export default Released
