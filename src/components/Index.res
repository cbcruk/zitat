type action = PREV | NEXT

@react.component
let make = (~total, ~children) => {
  let lastIndex = total - 1
  let (page, dispatch) = React.useReducer((page, action) => {
    switch action {
    | PREV => Js.Math.max_int(page - 1, 0)
    | NEXT => Js.Math.min_int(page + 1, lastIndex)
    | _ => 0
    }
  }, 0)

  <Fade \"in"={true}> <div> {Belt.Int.toString(page)->React.string} </div> children </Fade>
}
