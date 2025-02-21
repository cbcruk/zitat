import IconCalendarToday from './icons/IconCalendarToday'
import IconList from './icons/IconList'
import IconSearch from './icons/IconSearch'
import {
  NavigationBarLink,
  NavigationBarLinkIcon,
  NavigationBarLinkLabel,
} from './NavigationBarLink'

export function NavigationBar() {
  return (
    <div className="fixed bottom-0 left-0 z-[10] flex justify-around items-center w-full h-[80px] bg-[var(--md-sys-color-surface-variant)]">
      <div className="flex-1 flex justify-center">
        <NavigationBarLink href="/">
          <NavigationBarLinkIcon>
            <IconCalendarToday />
          </NavigationBarLinkIcon>
          <NavigationBarLinkLabel>홈</NavigationBarLinkLabel>
        </NavigationBarLink>
      </div>
      <div className="flex-1 flex justify-center">
        <NavigationBarLink href="/list" urlPattern={{ pathname: '/list/:id?' }}>
          <NavigationBarLinkIcon>
            <IconList />
          </NavigationBarLinkIcon>
          <NavigationBarLinkLabel>기록</NavigationBarLinkLabel>
        </NavigationBarLink>
      </div>
      <div className="flex-1 flex justify-center">
        <NavigationBarLink href="/search">
          <NavigationBarLinkIcon>
            <IconSearch />
          </NavigationBarLinkIcon>
          <NavigationBarLinkLabel>검색</NavigationBarLinkLabel>
        </NavigationBarLink>
      </div>
    </div>
  )
}
