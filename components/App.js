import Fade from './Fade'

function App({ isPending, children }) {
  return (
    <Fade in={!isPending}>
      <div className="App">
        <style jsx>{`
          .App {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .App-inner {
            display: flex;
            flex-direction: column;
            flex: 1;
            position: relative;
            z-index: 2;
            padding: 1.618rem;
            background-color: #f5cac3;
          }

          @supports (-webkit-touch-callout: none) {
            .App {
              height: -webkit-fill-available !important;
              min-height: unset;
            }
          }
        `}</style>
        <div className="App-inner">{children}</div>
      </div>
    </Fade>
  )
}

export default App
