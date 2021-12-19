import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import Analytics from '../components/Analytics'
import * as gtag from '../lib/gatg'

export function reportWebVitals({ id, name, label, value }) {
  if (!window.gtag) {
    return
  }

  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  })
}

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => gtag.pageview(url)

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'Noto Serif KR';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('/fonts/noto-serif-kr-v13-latin_korean-regular.woff2')
            format('woff2');
        }

        body {
          background-color: #f5cac3;
          font-family: 'Noto Serif KR', serif;
          line-height: 1.5;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .fade-enter {
          opacity: 0;
        }

        .fade-enter-active {
          opacity: 1;
        }

        .fade-exit {
          opacity: 1;
        }

        .fade-exit-active {
          opacity: 0;
        }

        .fade-enter-active,
        .fade-exit-active {
          transition: opacity 1000ms ease-in, transform 500ms ease-in;
        }
      `}</style>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content={Component.description} />
        <meta
          property="og:image"
          content="https://zitat.vercel.app/og_image.jpg"
        />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  )
}

export default App
