declare var gtag: any

type Hit = {
  objectID: string
  _highlightResult: {
    desc: {
      value: string
    }
    author: {
      value: string
    }
  }
}

type AlgoliaSearchResponse = {
  hits?: Hit[]
}

type SearchItem = {
  author: string
  id: string
  quote: string
}

type TodayItem = {
  author: string
  created_at: string
  id: string
  quote: string
  released: string
}

type HttpStatus = 'idle' | 'pending' | 'success'

type SearchHistoryItems = string[]
