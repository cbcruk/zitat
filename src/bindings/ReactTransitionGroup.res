type state = [
  | #entering
  | #entered
  | #exiting
  | #exited
]

module Transition = {
  @module("react-transition-group/Transition") @react.component
  external make: (~\"in": bool, ~timeout: int, ~children: state => React.element) => React.element =
    "default"
}
