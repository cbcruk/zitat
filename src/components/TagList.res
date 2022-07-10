@module external styles: {..} = "./TagList.module.css"

@react.component
let make = (~items: array<string>) => {
  <div className="TagList">
    <details>
      <summary className={styles["TagList-title"]}> {"검색 기록"->React.string} </summary>
      <div className={styles["TagList-items"]}>
        {Belt.Array.mapWithIndex(items, (index, item) =>
          <span key={Belt.Int.toString(index)} className={styles["TagList-item"]}>
            {item->React.string}
          </span>
        )->React.array}
      </div>
    </details>
  </div>
}
