// @ts-check
/**
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.name
 * @param {string} params.label
 * @param {number} params.value
 */
export function reportWebVitals({ id, name, label, value }) {
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
