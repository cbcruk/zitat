@module external styles: {..} = "./NavLink.module.css"

@react.component
let make = (~href, ~title="", ~isActive=?, ~children) => {
  let activeClassName = switch isActive {
  | Some(_) => "is-active"
  | None => ""
  }

  <Next.Link href>
    <a title className={`${styles["NavLink"]} ${activeClassName}`}> children </a>
  </Next.Link>
}
