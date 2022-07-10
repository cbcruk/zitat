@val external process: 'a = "process"

module Gtag = {
  let id = "G-NVVEG6TXJK"
}

@react.component
let make = () =>
  switch process["env"]["NODE_ENV"] {
  | "development" => React.null
  | "production" => <>
      <Next.Script
        strategy={#afterInteractive} src={`https://www.googletagmanager.com/gtag/js?id=${Gtag.id}`}
      />
      <Next.Script
        id="gtag-init"
        strategy={#afterInteractive}
        dangerouslySetInnerHTML={{
          "__html": `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${Gtag.id}}');
            `,
        }}
      />
    </>
  | _ => React.null
  }
