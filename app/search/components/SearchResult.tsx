import Link from 'next/link'
import { SelectQuoteSchema } from '../../../lib/db/schema'
import { List } from '../../../components/List'

type Props = {
  data: SelectQuoteSchema[]
}

export function SearchResult({ data }: Props) {
  return (
    <List>
      {data.map(({ uuid, quote, author }) => {
        return (
          <div
            key={uuid}
            className="py-[10px] first:pt-0 border-[var(--md-sys-color-outline)] break-keep whitespace-pre-line"
          >
            <Link href={`/list/${uuid}`}>
              <p
                className="line-clamp-3"
                dangerouslySetInnerHTML={{ __html: quote }}
              />
              <p
                className="mt-[4px] text-[12px]"
                dangerouslySetInnerHTML={{ __html: author }}
              />
            </Link>
          </div>
        )
      })}
    </List>
  )
}
