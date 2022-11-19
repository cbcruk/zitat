import Head from 'next/head'
import { AppProps } from 'next/app'
import Analytics from '../components/Analytics'
import Layout from '../components/Layout'
import { useGtag } from '../hooks/useGtag'
import '../styles/theme.css'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  useGtag()

  return (
    <>
      <Head>
        <meta name="description" content="나 보려고 만든 페이지" />
        <meta
          property="og:image"
          content="https://zitat.vercel.app/og_image.jpg"
        />
      </Head>
      <Analytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
