import { ComponentProps } from 'react'
import styles from './List.module.css'
import clsx from 'clsx'

type Props = ComponentProps<'div'>

export function List({ children }: Props) {
  return <div className={clsx(['divide-y', styles.root])}>{children}</div>
}
