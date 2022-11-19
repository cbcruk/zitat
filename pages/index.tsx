import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { App } from '../components'
import { useSaveData } from '../hooks/useSaveData'
import { weekly } from '../lib/sheet'
import { TodayItem } from '../lib/types'

type Props = {
  data: TodayItem[]
}

const Home: NextPage<Props> = ({ data }) => {
  useSaveData(data)

  return (
    <>
      <Head>
        <title>zitat</title>
        <meta name="description" content="나 보려고 만든 페이지" />
      </Head>
      <App data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await weekly()

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

export default Home
