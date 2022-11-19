import Head from 'next/head'
import QuoteList from '../components/List'
import { useWeeklyData } from '../hooks/useWeeklyData'

function List() {
  const { data } = useWeeklyData()

  return (
    <>
      <Head>
        <title>zitat - 기록</title>
      </Head>
      <QuoteList data={data} />
    </>
  )
}

export default List
