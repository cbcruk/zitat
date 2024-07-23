import { useEffect } from 'react'
import * as gtag from '../lib/gtag'
import { usePathname } from 'next/navigation'

export function useGtag() {
  const pathname = usePathname()

  useEffect(() => {
    gtag.pageview(pathname)
  }, [pathname])
}
