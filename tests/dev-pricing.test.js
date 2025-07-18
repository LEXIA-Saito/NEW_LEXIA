const assert = require('assert');
const { calculateDevPricing } = require('../lib/devPricing');

const params = {
  screenCount: 10,
  featureCount: 5,
  userCount: 100,
  apiIntegrationCount: 3,
  complexityCoefficient: 1.2,
  securityCoefficient: 1.1,
  uiComplexityCoefficient: 1.05,
};

const result = calculateDevPricing(params);
// Manual calculation for assertion
const baseSum = 150000 + 300000 + 200000 + 100000 + 80000 + 60000 + 40000;
const varCost =
  params.screenCount * 10000 +
  params.featureCount * 50000 +
  params.userCount * 500 +
  params.apiIntegrationCount * 30000;
const coeff =
  params.complexityCoefficient *
  params.securityCoefficient *
  params.uiComplexityCoefficient;
const expected = Math.round(baseSum + varCost * coeff);

assert.strictEqual(result, expected);
console.log('dev pricing tests passed');
