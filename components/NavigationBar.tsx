import { IconList, IconSearch } from './icons'
import IconCalendarToday from './icons/IconCalendarToday'
import { NavigationBarLink } from './NavigationBarLink'

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
