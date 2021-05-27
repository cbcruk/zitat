import Head from 'next/head'
import useSWR from 'swr'
import { App, Released, Quote, Author, Loading } from '../components'

function Home() {
  const { data = { isPending: true } } = useSWR('/api/weekly', {
    revalidateOnFocus: false,
  })

  return (
    <>
      <Head>
        <title>zitat</title>
        <meta name="description" content="나 보려고 만든 페이지" />
        <meta
          property="og:image"
          content="https://zitat.vercel.app/og_image.jpg"
        />
      </Head>
      <Loading isPending={data.isPending} />
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
    </>
  )
}

export default Home
