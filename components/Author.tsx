import { TodayItemSchema } from '../schema/item'

type Props = Pick<TodayItemSchema, 'author'>

function Author({ author }: Props) {
  if (!author) {
    return null
  }

  return <p className="pt-[1.618rem] mt-auto">-{author}</p>
}

export default Author
