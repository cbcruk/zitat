import clsx from 'clsx'
import Header from './Header'
import { NavigationBar } from './NavigationBar'

type Props = JSX.IntrinsicElements['div']

function Layout({ className, children }: Props) {
  return (
    <div className={clsx(['Layout', className])}>
      <style jsx>{`
        .Layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .Layout-inner {
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 2;
          padding: 1.618rem;
        }

        @supports (-webkit-touch-callout: none) {
          .Layout {
            height: -webkit-fill-available !important;
            min-height: unset;
          }

          .Layout-inner {
            padding-bottom: calc(80px + 1.618rem);
          }
        }
      `}</style>
      <Header />
      <div className="Layout-inner">{children}</div>
      <NavigationBar />
    </div>
  )
}

export default Layout
