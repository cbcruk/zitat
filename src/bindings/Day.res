type dayjs

@module external parseString: string => dayjs = "dayjs"
@module external parseJsDate: Js.Date.t => dayjs = "dayjs"

@send external format: (dayjs, string) => string = "format"
