const assert = require('assert')
const { calculateWebPricing } = require('../lib/webPricing')

const cases = [
  {
    params: {
      pages: { sub: 5 },
      cms: { pages: 10 },
      ec: { items: 0 },
      func: { extra: 0 },
      kw: { extra: 0 },
    },
    expected: 639580,
  },
  {
    params: {
      pages: { sub: 10 },
      cms: { pages: 10 },
      ec: { items: 50 },
      func: { extra: 2 },
      kw: { extra: 3 },
    },
    expected: 1318710,
  },
  {
    params: {
      pages: { sub: 0 },
      cms: { pages: 0 },
      ec: { items: 0 },
      func: { extra: 0 },
      kw: { extra: 0 },
    },
    expected: 282500,
  },
]

for (const { params, expected } of cases) {
  const result = calculateWebPricing(params)
  assert.strictEqual(result.totalTaxEx, expected)
}

console.log('web pricing tests passed')
