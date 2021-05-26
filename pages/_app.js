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
      <Component {...pageProps} />
    </>
  )
}

export default App
