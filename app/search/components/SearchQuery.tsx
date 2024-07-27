import { SearchEmpty } from './SearchEmpty'
import { getSearchResult } from '../utils'
import { SearchResult } from './SearchResult'

type Props = {
  query: string
}

export async function SearchQuery({ query }: Props) {
  const data = await getSearchResult(query)

  if (data.length === 0 && typeof query === 'string') {
    return <SearchEmpty />
  }

  return <SearchResult data={data} />
}
