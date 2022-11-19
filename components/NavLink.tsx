import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  href: string
  title?: string
  isActive: boolean
  children: React.ReactNode
}

export function NavLink({ href, isActive, children }: Props) {
  return (
    <Link href={href}>
      <span
        className={clsx({
          NavLink: true,
          'is-active': isActive,
        })}
      >
        <style jsx>{`
          .NavLink.is-active {
            pointer-events: none;
          }
        `}</style>
        {children}
      </span>
    </Link>
  )
}
