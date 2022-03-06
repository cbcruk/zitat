// @ts-check
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  /**
   *
   * @param {import('next/document').DocumentContext} ctx
   * @returns
   */
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="theme-color" content="#f5cac3" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="preload"
            href="/fonts/noto-serif-kr-v13-latin_korean-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
