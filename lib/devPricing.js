const BASE_RATES = {
  requirements: 150000,
  baseDevelopment: 300000,
  customDevelopment: 200000,
  uiux: 100000,
  testing: 80000,
  maintenance: 60000,
  documentation: 40000,
};

const UNIT_PRICES = {
  screen: 10000,
  feature: 50000,
  user: 500,
  api: 30000,
};

/**
 * システム開発料金を計算します。
 * @param {Object} params
 * @param {number} params.screenCount
 * @param {number} params.featureCount
 * @param {number} params.userCount
 * @param {number} params.apiIntegrationCount
 * @param {number} params.complexityCoefficient
 * @param {number} params.securityCoefficient
 * @param {number} params.uiComplexityCoefficient
 * @returns {number}
 */
function calculateDevPricing(params) {
  const baseSum = Object.values(BASE_RATES).reduce((a, b) => a + b, 0);
  const variableCost =
    params.screenCount * UNIT_PRICES.screen +
    params.featureCount * UNIT_PRICES.feature +
    params.userCount * UNIT_PRICES.user +
    params.apiIntegrationCount * UNIT_PRICES.api;

  const coefficient =
    params.complexityCoefficient *
    params.securityCoefficient *
    params.uiComplexityCoefficient;

  return Math.round(baseSum + variableCost * coefficient);
}

const defaultParams = {
  screenCount: 1,
  featureCount: 1,
  userCount: 1,
  apiIntegrationCount: 0,
  complexityCoefficient: 1,
  securityCoefficient: 1,
  uiComplexityCoefficient: 1,
};

module.exports = { calculateDevPricing, defaultParams };
