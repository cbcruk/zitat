@module external styles: {..} = "./Author.module.css"

@react.component
let make = (~author) => {
  switch author {
  | Some(author) => <p style={styles["Author"]}> {author->React.string} </p>
  | None => React.null
  }
}
