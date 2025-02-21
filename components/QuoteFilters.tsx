import dayjs from 'dayjs'
import Link from 'next/link'

type QuoteFiltersProps = {
  ranges: [string | null, string, string | null]
}

export function QuoteFilters({ ranges }: QuoteFiltersProps) {
  const [prev, current, next] = ranges

  return (
    <div>
      <span>{dayjs(current).format('YYYY년 MM월')}</span>
      <nav>
        <Link
          prefetch
          href={`/list?date=${prev}`}
          data-disabled={prev === null}
          className="data-[disabled=true]:pointer-events-none"
        >
          이전달
        </Link>
        <Link
          prefetch
          href={`/list?date=${next}`}
          data-disabled={next === null}
          className="data-[disabled=true]:pointer-events-none"
        >
          다음달
        </Link>
      </nav>
    </div>
  )
}
