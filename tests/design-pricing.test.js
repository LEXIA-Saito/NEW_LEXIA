const assert = require('assert');
const { calculateDesignPricing } = require('../lib/designPricing');

const params = { type: 'logo', proposalCount: 3, changeCount: 2 };
const result = calculateDesignPricing(params);

const info = { base: 30000, free: 2, add: 7000 };
const additional = params.proposalCount - info.free;
const subtotal = info.base + additional * info.add;
const expected = Math.round(subtotal * (1 + 0.1 * params.changeCount));

assert.strictEqual(result, expected);
console.log('design pricing tests passed');
