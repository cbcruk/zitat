// @ts-check
import Head from 'next/head'
import Analytics from '../src/components/Analytics'
import Layout from '../src/components/Layout'
import { useGtag } from '../src/hooks/useGtag'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  useGtag()

  return (
    <>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content={Component.description} />
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
