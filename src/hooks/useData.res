// type action = Idle | Pending | Success | Errors

// type state = {status: action}

// let reducer = (_state, action) => {
//   switch action {
//   | Pending => {status: Pending}
//   | Success => {status: Success}
//   | Idle => {status: Idle}
//   | Errors => {status: Errors}
//   }
// }

// let useData = () => {
//   let router = Next.Router.useRouter()
//   let q = Js.Dict.get(router.query, "q")
//   let (_state, dispatch) = React.useReducer(
//     reducer,
//     {
//       status: Idle,
//     },
//   )

//   React.useEffect1(() => {
//     switch q {
//     | Some(_) => dispatch(Pending)
//     | None => None
//     }
//   }, [q])
// }

