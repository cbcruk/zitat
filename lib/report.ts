type Params = {
  id: string
  name: string
  label: string
  value: number
}

export function reportWebVitals({ id, name, label, value }: Params) {
  if (!window.gtag) {
    return
  }

  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  })
}
