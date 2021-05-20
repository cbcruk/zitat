import Head from 'next/head'
import useSWR from 'swr'
import { App, Released, Quote, Author, Loading } from '../components'

function Home() {
  const { data = { isPending: true } } = useSWR('/api/today', {
    revalidateOnFocus: false,
  })

  return (
    <>
      <Head>
        <title>zitat</title>
        <meta name="description" content="나 보려고 만든 페이지" />
      </Head>
      <Loading isPending={data.isPending} />
      <App isPending={data.isPending}>
        <Released created={data.created_at} released={data.released} />
        <Quote isLong={data.quote && data.quote.length > 100}>
          {data.quote}
        </Quote>
        <Author author={data.author} />
      </App>
    </>
  )
}

export default Home
