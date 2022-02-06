import { useRouter } from 'next/router'
import QuoteList from '../components/List'
import TagList from '../components/TagList'
import { useData } from '../hooks/useData'
import { useSearchHistory } from '../hooks/useSearchHistory'

function Search() {
  const router = useRouter()
  const {
    state: { status, data },
    isNoResult,
  } = useData()
  const { items: searchItems } = useSearchHistory(status)
  const placeholder =
    status === 'pending' ? '검색중입니다...' : '내용, 저자 검색'

  return (
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
          padding: 1rem;
          border: 1px solid #fbb8ac;
          border-radius: 10px;
          outline: 0;
          background-color: #feeae6;
          font-size: 1rem;
          font-family: inherit;
          color: inherit;
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

          const q = e.target.q.value

          router.push({
            query: {
              q,
            },
          })
        }}
      >
        <input
          type="search"
          name="q"
          defaultValue={router.query.q || ''}
          autoFocus={true}
          className="Search-input"
          placeholder={placeholder}
          disabled={status === 'pending'}
          title="검색어를 입력해주세요."
        />
      </form>
      {isNoResult && (
        <div className="Search-blank">
          검색 결과가 없습니다. 키워드를 다시 선택해보세요...🤯
        </div>
      )}
      {!data && <TagList items={searchItems} />}
      <QuoteList data={data} />
    </div>
  )
}

Search.title = 'zitat - 검색'
Search.description = '나 보려고 만든 페이지'

export default Search
