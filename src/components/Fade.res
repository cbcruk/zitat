@react.component
let make = (~\"in", ~timeout=3000, ~children) =>
  <ReactTransitionGroup.Transition \"in" timeout>
    {state => {
      let opacity = switch state {
      | #entering => 1
      | #entered => 1
      | #exiting => 0
      | #exited => 0
      }

      let style = ReactDOM.Style.make(
        ~transition=`opacity ${string_of_int(timeout)}ms ease-in-out`,
        ~opacity=string_of_int(opacity),
        (),
      )

      <div style={style}> children </div>
    }}
  </ReactTransitionGroup.Transition>
