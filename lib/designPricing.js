const DESIGN_TYPES = {
  card: { baseCost: 5000, freeProposals: 3, additionalCost: 4000 },
  logo: { baseCost: 30000, freeProposals: 2, additionalCost: 7000 },
  promo: { baseCost: 13000, freeProposals: 1, additionalCost: 8000 },
}

/**
 * デザイン制作料金を計算します。
 * @param {Object} params
 * @param {'card' | 'logo' | 'promo'} params.type
 * @param {number} params.proposalCount 総提案数
 * @param {number} params.changeCount 変更回数
 * @returns {number}
 */
function calculateDesignPricing(params) {
  const info = DESIGN_TYPES[params.type]
  if (!info) throw new Error('invalid type')

  const additional = Math.max(params.proposalCount - info.freeProposals, 0)
  const subtotal = info.baseCost + additional * info.additionalCost
  return Math.round(subtotal * (1 + 0.1 * params.changeCount))
}

module.exports = { calculateDesignPricing, DESIGN_TYPES }
