import { ComponentProps } from 'react'
import { getFormattedDate } from '../utils'
import { TodayItem } from '../lib/types'

type Props = ComponentProps<'div'> &
  Pick<TodayItem, 'created_at_text' | 'released_text'>

function Released({ created_at_text, released_text, children }: Props) {
  return (
    <div className="flex justify-between">
      <p
        className="flex items-center text-[var(--md-sys-color-tertiary)]"
        title={created_at_text}
      >
        {released_text || getFormattedDate(new Date())}
      </p>
      {children}
    </div>
  )
}

export default Released
