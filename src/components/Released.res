@module external styles: {..} = "./Released.module.css"

let dateFormat = "YYYY년 MM월 DD일"
let getFormattedDate = (~date, ~format) => Day.parseString(date)->Day.format(format)

@react.component
let make = (~created=?, ~released=?) => {
  let title = switch created {
  | Some(created) => getFormattedDate(~date=created, ~format=dateFormat)
  | None => ""
  }

  let releasedDate = switch released {
  | Some(released) => getFormattedDate(~date=released, ~format=dateFormat)
  | None => Day.parseJsDate(Js.Date.make())->Day.format(dateFormat)
  }

  <p className={styles["Released"]} title> {releasedDate->React.string} </p>
}
