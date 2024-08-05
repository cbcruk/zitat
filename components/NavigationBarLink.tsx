'use client'

import clsx from 'clsx'
import Link from 'next/link'
import styles from './NavigationBarLink.module.css'
import { ComponentProps } from 'react'
import { URLPattern } from 'next/server'
import { usePathname } from 'next/navigation'

type Props = ComponentProps<typeof Link> & {
  urlPattern?: Pick<URLPattern, 'pathname'>
}

export function NavigationBarLink({ href, urlPattern, children }: Props) {
  const pathname = usePathname()
  const pattern = new URLPattern({
    pathname: urlPattern?.pathname ?? `${href}`,
  })
  const isActive = pattern.test(window.location.origin + pathname)

  return (
    <Link
      href={href}
      className={clsx('no-underline', styles.root)}
      data-is-active={isActive}
    >
      <div
        className={clsx(
          'flex flex-col items-center relative no-underline text-[var(--md-sys-color-on-surface-variant)]',
          styles.link
        )}
      >
        {children}
      </div>
    </Link>
  )
}

export function NavigationBarLinkIcon({ children }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'relative flex justify-center items-center w-[64px] h-[32px] rounded-[20px] bg-transparent',
        styles.icon
      )}
    >
      {children}
    </div>
  )
}

export function NavigationBarLinkLabel({ children }: ComponentProps<'div'>) {
  return <div className="mt-[8px] text-[12px] font-[500]">{children}</div>
}
