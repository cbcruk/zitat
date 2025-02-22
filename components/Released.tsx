import { ComponentProps } from 'react'
import { SelectQuoteSchema } from '../lib/db/schema'
import { getFormattedDate } from '../utils'

type Props = ComponentProps<'div'> & {
  released: SelectQuoteSchema['date']
}

function Released({ released, children }: Props) {
  return (
    <div className="flex justify-between">
      <p className="flex items-center text-[var(--md-sys-color-tertiary)]">
        <time dateTime={new Date(released).toISOString()}>
          {getFormattedDate(released)}
        </time>
      </p>
      {children}
    </div>
  )
}

export default Released
