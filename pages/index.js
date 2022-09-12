// @ts-check
import { weekly } from '$lib/sheet'
import { App } from '../components'
import { useSaveData } from '../hooks/useSaveData'

/**
 *
 * @param {object} props
 * @param {import('$lib/types').TodayItem[]} props.data
 */
function Home({ data }) {
  useSaveData(data)

  return <App data={data} />
}

export async function getStaticProps() {
  const data = await weekly()

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

Home.title = 'zitat'
Home.description = '나 보려고 만든 페이지'

export default Home
