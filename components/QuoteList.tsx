import clsx from 'clsx'
import styles from './QuoteList.module.css'
import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

function QuoteList({ children }: Props) {
  return <div className={clsx(['divide-y', styles.root])}>{children}</div>
}

export default QuoteList
