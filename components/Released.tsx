import { ComponentProps } from 'react'
import { getFormattedDate } from '../utils'
import { TodayItem } from '../lib/types'

type Props = ComponentProps<'div'> & {
  created: TodayItem['created_at_text']
  released: TodayItem['released_text']
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
