import { ComponentProps } from 'react'
import { SelectQuoteSchema } from '../lib/db/schema'
import { ReleasedTime } from './ReleasedTime'

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
        <ReleasedTime />
      </p>
      {children}
    </div>
  )
}

export default Released
