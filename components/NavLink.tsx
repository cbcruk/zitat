import Link from 'next/link'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link>

export function NavLink({ href, children, ...props }: Props) {
  return (
    <Link
      href={href}
      className="data-[is-active='true']:pointer-events-none"
      {...props}
    >
      {children}
    </Link>
  )
}
