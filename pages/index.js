// @ts-check
import { weekly } from '$lib/sheet'
import { App, Released, Quote, Author } from '../components'
import { useSaveData } from '../hooks/useSaveData'

/**
 *
 * @param {object} props
 * @param {TodayItem[]} props.data
 * @returns
 */
function Home({ data }) {
  useSaveData(data)

  return (
    <App total={data.length ?? 0}>
      {
        /**
         *
         * @param {object} params
         * @param {number} params.page
         */
        ({ page }) => {
          const item = data[page]

          if (!item) {
            return null
          }

          return (
            <>
              <Released
                created={item.created_at_text}
                released={item.released_text}
              />
              <Quote isLong={item.quote && item.quote.length > 100}>
                {item.quote}
              </Quote>
              <Author author={item.author} />
            </>
          )
        }
      }
    </App>
  )
}

export async function getStaticProps() {
  const data = await weekly()

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

Home.title = 'zitat'
Home.description = '나 보려고 만든 페이지'

export default Home
