import { TodayItem } from '../lib/types'

type Props = Pick<TodayItem, 'author'>

function Author({ author }: Props) {
  if (!author) {
    return null
  }

  return <p className="pt-[1.618rem] mt-auto">-{author}</p>
}

export default Author
