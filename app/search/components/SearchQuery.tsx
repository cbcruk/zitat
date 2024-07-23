import QuoteList from '../../../components/List'
import { SearchEmpty } from './SearchEmpty'
import { getSearchResult } from '../utils'

type Props = {
  query: string
}

export async function SearchQuery({ query }: Props) {
  const data = await getSearchResult(query)

  if (data.length === 0 && typeof query === 'string') {
    return <SearchEmpty />
  }

  return <QuoteList data={data} />
}
