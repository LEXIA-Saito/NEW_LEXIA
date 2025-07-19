const pricing = require('../pricing.json')

/**
 * Webサイト制作料金を計算します。
 * @param {Object} params
 * @param {{ sub: number }} params.pages 下層ページ数
 * @param {{ pages: number }} params.cms CMS化するページ数
 * @param {{ items: number }} params.ec 商品点数
 * @param {{ extra: number }} params.func 追加機能数
 * @param {{ extra: number }} params.kw 追加キーワード数
 * @returns {{ subtotal: number, qa: number, totalTaxEx: number, totalTaxIn: number }}
 */
function calculateWebPricing(params) {
  const subPages = params.pages.sub || 0

  const directionAdd = Math.floor(subPages / 5) * pricing.direction.per5p
  const direction = pricing.direction.base + directionAdd

  const design = pricing.design.top + pricing.design.sub * subPages
  const coding = pricing.coding.top + pricing.coding.sub * subPages

  const cmsPageCount = params.cms.pages || 0
  const cms = cmsPageCount > 0
    ? pricing.cms.base + Math.max(0, cmsPageCount - 10) * pricing.cms.extraPerPage
    : 0

  const ecItems = params.ec.items || 0
  const ec = ecItems > 0
    ? pricing.ec.base + Math.max(0, Math.ceil((ecItems - 50) / 10)) * pricing.ec.per10items
    : 0

  const funcExtra = params.func.extra || 0
  const system = funcExtra > 0
    ? pricing.system.base + funcExtra * pricing.system.perFunction
    : 0

  const kwExtra = params.kw.extra || 0
  const seo = kwExtra > 0
    ? pricing.seo.base + kwExtra * pricing.seo.perKeyword
    : 0

  const subtotal =
    direction +
    design +
    coding +
    cms +
    ec +
    system +
    seo

  const qa = Math.floor(subtotal * pricing.qaPercent)
  const totalTaxEx = subtotal + qa
  const totalTaxIn = Math.floor(totalTaxEx * (1 + pricing.tax))

  return { subtotal, qa, totalTaxEx, totalTaxIn }
}

module.exports = { calculateWebPricing }
