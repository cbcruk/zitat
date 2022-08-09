// @ts-check
import Head from 'next/head'
import Analytics from '../components/Analytics'
import Layout from '../components/Layout'
import { useGtag } from '../hooks/useGtag'
import '../styles/theme.css'
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
