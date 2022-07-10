type item = {id: string, quote: string, author: string}

@react.component
let make = (~data: array<item>) => {
  <div className="List">
    {Belt.Array.map(data, item => {
      <div key={item.id} className="List-item Item">
        <div className="Item-quote" dangerouslySetInnerHTML={{"__html": item.quote}} />
        <div className="Item-author" dangerouslySetInnerHTML={{"__html": item.author}} />
      </div>
    })->React.array}
  </div>
}
