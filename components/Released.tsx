import { ComponentProps } from 'react'
import { getFormattedDate } from '../utils'
import { TodayItemSchema } from '../schema/item'

type Props = ComponentProps<'div'> & {
  created: TodayItemSchema['created_at_text']
  released: TodayItemSchema['released_text']
}

function Released({ created, released, children }: Props) {
  return (
    <div className="flex justify-between">
      <p
        className="flex items-center text-[var(--md-sys-color-tertiary)]"
        title={created}
      >
        {released || getFormattedDate(new Date())}
      </p>
      {children}
    </div>
  )
}

export default Released
