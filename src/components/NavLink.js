// @ts-check
import clsx from 'clsx'
import Link from 'next/link'

/**
 *
 * @param {object} props
 * @param {string} props.href
 * @param {string=} props.title
 * @param {boolean=} props.isActive
 * @param {JSX.Element} props.children
 */
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
