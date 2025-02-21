'use client'

import { Suspense, useEffect, useState } from 'react'
import { getFormattedDate } from '../utils'

function useHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}

export function ReleasedTime() {
  const hydrated = useHydration()
  const date = new Date()

  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={date.toISOString()}>{getFormattedDate(date)}</time>
    </Suspense>
  )
}
