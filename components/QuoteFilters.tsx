import dayjs from 'dayjs'
import Link from 'next/link'
import { IconChevronLeft } from './icons/IconChevronLeft'
import { IconChevronRight } from './icons/IconChevronRight'
import { IconFirstPage } from './icons/IconFirstPage'
import { IconLastPage } from './icons/IconLastPage'
import { ComponentProps } from 'react'

type QuoteFiltersProps = {
  ranges: [string, string | null, string, string | null, string]
}

function QuoteFiltersLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      prefetch
      className="opacity-90 hover:opacity-100 data-[disabled=true]:opacity-40 data-[disabled=true]:pointer-events-none transition-all"
      {...props}
    >
      {children}
    </Link>
  )
}

export function QuoteFilters({ ranges }: QuoteFiltersProps) {
  const [first, prev, current, next, last] = ranges

  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--md-sys-color-tertiary)]">
        {dayjs(current).format('YYYY년 MM월')}
      </span>
      <nav className="flex gap-2">
        <QuoteFiltersLink
          href={`/list?date=${first}`}
          data-disabled={prev === null}
          title="처음"
        >
          <IconFirstPage />
        </QuoteFiltersLink>
        <QuoteFiltersLink
          href={`/list?date=${prev}`}
          data-disabled={prev === null}
          title="이전달"
        >
          <IconChevronLeft />
        </QuoteFiltersLink>
        <QuoteFiltersLink
          href={`/list?date=${next}`}
          data-disabled={next === null}
          title="다음달"
        >
          <IconChevronRight />
        </QuoteFiltersLink>
        <QuoteFiltersLink
          href={`/list?date=${last}`}
          data-disabled={next === null}
          title="마지막"
        >
          <IconLastPage />
        </QuoteFiltersLink>
      </nav>
    </div>
  )
}
