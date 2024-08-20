import Link from 'next/link'
import { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
  id: string
}

function QuoteItemBody({ children }: ComponentProps<'p'>) {
  return (
    <p
      className="line-clamp-3"
      dangerouslySetInnerHTML={{ __html: children as TrustedHTML }}
    />
  )
}

function QuoteItemAuthor({ children }: ComponentProps<'p'>) {
  return (
    <p
      className="mt-[4px] text-[12px]"
      dangerouslySetInnerHTML={{ __html: children as TrustedHTML }}
    />
  )
}

export function QuoteItem({ id, children }: Props) {
  return (
    <div className="py-[10px] first:pt-0 border-[var(--md-sys-color-outline)] break-keep whitespace-pre-line">
      <Link href={`/list/${id}`}>{children}</Link>
    </div>
  )
}

QuoteItem.Body = QuoteItemBody
QuoteItem.Author = QuoteItemAuthor
