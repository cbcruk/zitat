import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import QuoteList from '../components/List'
import TagList from '../components/TagList'
import { useSearchHistory } from '../hooks/useSearchHistory'

function Search() {
  const inputSearchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { q } = router.query
  const { data } = useSWR(['/api/search', q], () =>
    q ? fetch(`/api/search?q=${q}`).then((r) => r.json()) : null
  )
  const isLoading = q && !data
  const isEmpty = q && data?.length === 0
  const hasData = data?.length > 0
  const { items: searchItems } = useSearchHistory(hasData)

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.value = typeof q === 'string' ? q : ''
    }
  }, [q])

  return (
    <>
      <Head>
        <title>zitat - 검색</title>
      </Head>
      <div className="Search">
        <style jsx>{`
          .Search {
            display: flex;
            flex-direction: column;
            gap: 1.618rem;
          }

          .Search-input {
            display: block;
            width: 100%;
            height: 48px;
            padding: 1rem;
            border: 0;
            border-radius: 9999px;
            outline: 0;
            background-color: var(--md-sys-color-surface-variant);
            font-size: 1rem;
            font-family: inherit;
            color: inherit;
            -webkit-appearance: textfield;
          }

          .Search-input:-webkit-autofill,
          .Search-input:-webkit-autofill:focus {
            transition: background-color 600000s 0s, color 600000s 0s;
          }

          .Search-input::placeholder {
            color: inherit;
          }

          .Search-blank {
            animation-name: 'shake';
            animation-duration: 1000ms;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}</style>
        <form
          className="Search"
          onSubmit={async (e) => {
            e.preventDefault()

            const q: string = e.currentTarget.q.value

            router.push({
              query: {
                q,
              },
            })
          }}
        >
          <input
            ref={inputSearchRef}
            type="search"
            name="q"
            defaultValue={router.query?.q ?? ''}
            autoFocus={true}
            className="Search-input"
            placeholder="내용, 저자 검색"
            disabled={Boolean(isLoading)}
            title="검색어를 입력해주세요."
          />
        </form>
        {isLoading && <p>로딩중...</p>}
        {isEmpty && (
          <div className="Search-blank">
            검색 결과가 없습니다. 키워드를 다시 선택해보세요...🤯
          </div>
        )}
        {!q && <TagList items={searchItems} />}
        {data && <QuoteList data={data} />}
      </div>
    </>
  )
}

export default Search
