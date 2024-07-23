import styles from './SearchEmpty.module.css'

export function SearchEmpty() {
  return (
    <div className={styles.root}>
      검색 결과가 없습니다. 키워드를 다시 선택해보세요...🤯
    </div>
  )
}
