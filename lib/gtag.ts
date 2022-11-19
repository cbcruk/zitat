export const GA_TRACKING_ID = 'G-NVVEG6TXJK'

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

type Params = {
  action: string
  category: string
  label: string
  value: string
}

export const event = ({ action, category, label, value }: Params) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
