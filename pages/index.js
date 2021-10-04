import { App, Released, Quote, Author } from '../components'

function Home({ data }) {
  return (
    <App total={data.length ?? 0} isPending={data.isPending}>
      {({ page }) => {
        const item = data[page]

        if (!item) {
          return null
        }

        return (
          <>
            <Released created={item.created_at} released={item.released} />
            <Quote isLong={item.quote && item.quote.length > 100}>
              {item.quote}
            </Quote>
            <Author author={item.author} />
          </>
        )
      }}
    </App>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://zitat.vercel.app/api/weekly')
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}

Home.title = 'zitat'
Home.description = '나 보려고 만든 페이지'

export default Home
