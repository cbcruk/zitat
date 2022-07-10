// @ts-check
import QuoteList from '../components/List'
import { useWeeklyData } from '../hooks/useWeeklyData'

function List() {
  const { data } = useWeeklyData()

  return <QuoteList data={data} />
}

List.title = 'zitat - 기록'
List.description = '나 보려고 만든 페이지'

export default List
