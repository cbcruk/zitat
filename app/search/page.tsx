import { SearchForm } from './components/SearchForm'
import { SearchQuery } from './components/SearchQuery'
import { Suspense } from 'react'

export const metadata = {
  title: 'zitat - 검색',
}

type Props = {
  searchParams: {
    q: string
  }
}

async function Search({ searchParams }: Props) {
  const q = searchParams.q

  return (
    <div className="flex flex-col gap-[1.618rem]">
      <SearchForm />
      <Suspense
        key={q}
        fallback={typeof q === 'undefined' ? null : <p>로딩중...</p>}
      >
        <SearchQuery query={q} />
      </Suspense>
    </div>
  )
}

export default Search
