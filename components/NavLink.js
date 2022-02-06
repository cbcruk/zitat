import clsx from 'clsx'
import Link from 'next/link'

export function NavLink({ href, isActive, children }) {
  return (
    <Link href={href}>
      <a
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
      </a>
    </Link>
  )
}
