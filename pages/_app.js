function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
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
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default App
