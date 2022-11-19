import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  href: string
  icon: React.ReactNode
  label: string
}

export function NavigationBarLink({ href, icon, label }: Props) {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <>
      <style jsx>{`
        .NavigationBarLink {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          text-decoration: none;
          color: var(--md-sys-color-on-surface-variant);
        }

        .NavigationBarLink.is-active {
          color: var(--md-sys-color-on-surface);
        }

        .NavigationBarLink-icon {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 32px;
          border-radius: 20px;
          background-color: transparent;
        }

        .NavigationBarLink-icon :global(svg) {
          fill: var(--md-sys-color-on-surface-variant);
        }

        .NavigationBarLink-icon.is-active {
          background-color: var(--md-sys-color-primary);
        }

        .NavigationBarLink-icon.is-active :global(svg) {
          fill: var(--md-sys-color-on-primary);
        }

        .NavigationBarLink-label {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 500;
        }
      `}</style>
      <Link href={href}>
        <div
          className={clsx('NavigationBarLink', {
            'is-active': isActive,
          })}
        >
          <div
            className={clsx('NavigationBarLink-icon', {
              'is-active': isActive,
            })}
          >
            {icon}
          </div>
          <div className="NavigationBarLink-label">{label}</div>
        </div>
      </Link>
    </>
  )
}
