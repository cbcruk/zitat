// @ts-check
import Header from './Header'

/**
 *
 * @param {object} props
 * @param {JSX.Element} props.children
 * @returns
 */
function Layout({ children }) {
  return (
    <div className="Layout">
      <style jsx>{`
        .Layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .Layout-inner {
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 2;
          padding: 1.618rem;
          background-color: #ffeae6;
        }

        @supports (-webkit-touch-callout: none) {
          .Layout {
            height: -webkit-fill-available !important;
            min-height: unset;
          }
        }
      `}</style>
      <Header />
      <div className="Layout-inner">{children}</div>
    </div>
  )
}

export default Layout
