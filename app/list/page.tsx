import QuoteList from '../../components/List'
import { weekly } from '../../lib/sheet'

export const metadata = {
  title: 'zitat - 기록',
}

async function List() {
  const data = await weekly()

  return <QuoteList data={data} />
}

export default List
