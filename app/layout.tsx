import type { Metadata } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
import Analytics from '../components/Analytics'
import clsx from 'clsx'
import { GoogleTag } from '../components/GoogleTag'
import Header from '../components/Header'
import { NavigationBar } from '../components/NavigationBar'
import '../styles/theme.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'zitat',
  description: '나 보려고 만든 페이지',
  openGraph: {
    images: ['https://zitat.vercel.app/og_image.jpg'],
  },
  themeColor: '#6750a4',
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', url: '/logo192.png' },
  ],
  manifest: '/manifest.json',
}

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

const notoSans = Noto_Serif_KR({
  weight: ['400', '500', '900'],
  preload: false,
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      {process.env.NODE_ENV !== 'production' && <Analytics />}
      <body className={clsx([notoSans.className, 'material-theme'])}>
        <div className="flex flex-col min-h-screen pb-[80px] supports-[-webkit-touch-callout=none]:h-[-webkit-fill-available] supports-[-webkit-touch-callout=none]:min-h-[unset]">
          <Header />
          <div className="flex flex-col flex-1 relative z-[2] p-[1.618rem] supports-[-webkit-touch-callout=none]:pb-[calc(80px+1.618rem)]">
            {children}
          </div>
          <NavigationBar />
        </div>
        {process.env.NODE_ENV !== 'production' && <GoogleTag />}
      </body>
    </html>
  )
}
