import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconList, IconSearch } from './icons'
import { IconCalendarToday } from './icons/IconCalendarToday'

function NavigationBarLink({ href, icon, label }) {
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
        <a
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
        </a>
      </Link>
    </>
  )
}

export function NavigationBar() {
  return (
    <div className="NavigationBar">
      <style jsx>{`
        .NavigationBar {
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 10;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 80px;
          background-color: var(--md-sys-color-surface-variant);
        }

        .NavigationBar-item {
          flex: 1;
          display: flex;
          justify-content: center;
        }
      `}</style>
      <div className="NavigationBar-item">
        <NavigationBarLink href="/" icon={<IconCalendarToday />} label="홈" />
      </div>
      <div className="NavigationBar-item">
        <NavigationBarLink href="/list" icon={<IconList />} label="기록" />
      </div>
      <div className="NavigationBar-item">
        <NavigationBarLink href="/search" icon={<IconSearch />} label="검색" />
      </div>
    </div>
  )
}
