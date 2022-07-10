@module external styles: {..} = "./Layout.module.css"

@react.component
let make = (~children) => {
  <div className={styles["Layout"]}>
    <Header /> <div className="Layout-inner"> children </div>
  </div>
}
