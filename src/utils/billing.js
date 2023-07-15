export const calcRate = (mrp, gst) => {
  mrp = parseFloat(mrp)
  gst = parseFloat(gst)
  return parseFloat((mrp * 100) / (gst + 100)).toFixed(2)
}

export const calcTotal = (cart, soldQnty, disc) => {
  let { mrp, pkg, category } = cart
  let total;

  if (category === "TABLET")
    total = (mrp / pkg) * soldQnty
  else
    total = mrp * soldQnty
  let discount = total * disc / 100
  let netTotal = total - discount;
  return parseFloat(netTotal).toFixed(2)

  //   return parseFloat(((mrp / pkg) * soldQnty) - ((mrp / pkg) * soldQnty) * disc / 100).toFixed(2)
  // return parseFloat((mrp * soldQnty) - (mrp * soldQnty) * disc / 100).toFixed(2)
}

export const calcProfit = (cart) => {
  let profit = 0
  cart.map((item, index) => {
    let total = item.total //total of this particular product
    let purchaseRate = item.purchaseRate
    let soldQnty = item.soldQnty
    let category = item.category

    let pkg = item.pkg
    if (category === "TABLET")
      purchaseRate = purchaseRate / pkg
    if (purchaseRate)//because sometimes stock does not have purchaserate
      profit += total - (purchaseRate * soldQnty)
  })

  return (profit).toFixed(2)
}

export const calculateCategoryPercentage = (allo, ayur, gene, genric, surg) => {
  const totalRevenue = allo + ayur + gene + genric + surg

  let allopathicPercent = allo ? (allo / totalRevenue * 100).toFixed(2) : 0
  let ayurvedicPercent = ayur ? (ayur / totalRevenue * 100).toFixed(2) : 0
  let generalPercent = gene ? (gene / totalRevenue * 100).toFixed(2) : 0
  let genericPercent = genric ? (genric / totalRevenue * 100).toFixed(2) : 0
  let surgicalPercent = surg ? (surg / totalRevenue * 100).toFixed(2) : 0

  return {
    allopathicPercent,
    ayurvedicPercent,
    generalPercent,
    genericPercent,
    surgicalPercent,
  }
}

export const sumAllObjectsFields = (trades = []) => {
  let totalSalesCount = 0, totalRevenue = 0, totalPurchaseCount = 0, totalInvestment = 0, totalProfit = 0, totalSalesCredit = 0, totalPurchaseCredit = 0;
  let allopathicPurchase = 0, allopathicSale = 0, ayurvedicPurchase = 0, ayurvedicSale = 0, generalPurchase = 0, generalSale = 0, genericPurchase = 0, genericSale = 0, surgicalPurchase = 0, surgicalSale = 0;

  trades.map((trade) => {
    totalSalesCount += trade.salesCount
    totalRevenue += trade.revenue
    totalPurchaseCount += trade.purchaseCount
    totalInvestment += trade.investment
    totalProfit += trade.profit
    totalSalesCredit += trade.salesCredit
    totalPurchaseCredit += trade.purchaseCredit

    allopathicSale += trade.categoryWiseSale.allopathic
    ayurvedicSale += trade.categoryWiseSale.ayurvedic
    generalSale += trade.categoryWiseSale.general
    genericSale += trade.categoryWiseSale.generic
    surgicalSale += trade.categoryWiseSale.surgical

    allopathicPurchase += trade.categoryWisePurchase.allopathic
    ayurvedicPurchase += trade.categoryWisePurchase.ayurvedic
    generalPurchase += trade.categoryWisePurchase.general
    genericPurchase += trade.categoryWisePurchase.generic
    surgicalPurchase += trade.categoryWisePurchase.surgical
  })
  return ({
    salesCount: totalSalesCount,
    revenue: totalRevenue,
    purchaseCount: totalPurchaseCount,
    investment: totalInvestment,
    profit: totalProfit,
    salesCredit: totalSalesCredit,
    purchaseCredit: totalPurchaseCredit,
    categoryWiseSale: {
      allopathic: allopathicSale,
      ayurvedic: ayurvedicSale,
      general: generalSale,
      generic: genericSale,
      surgical: surgicalSale,
    },
    categoryWisePurchase: {
      allopathic: allopathicPurchase,
      ayurvedic: ayurvedicPurchase,
      general: generalPurchase,
      generic: genericPurchase,
      surgical: surgicalPurchase,
    }
  })
}

export const generateTradeAnalysis = (object) => {
  return ({
    tsc: object.salesCount, tpc: object.purchaseCount,
    tp: object.profit.toFixed(2), ti: object.investment.toFixed(2), tr: object.revenue.toFixed(2),
    tscr: object.salesCredit.toFixed(2), tpcr: object.purchaseCredit.toFixed(2),
    asa: (object.revenue / object.salesCount).toFixed(2),
    apa: (object.investment / object.purchaseCount).toFixed(2),

    categoryWiseSale: {
      allopathicSale: object.categoryWiseSale.allopathic,
      ayurvedicSale: object.categoryWiseSale.ayurvedic,
      generalSale: object.categoryWiseSale.general,
      genericSale: object.categoryWiseSale.generic,
      surgicalSale: object.categoryWiseSale.surgical,
    },
    categoryWisePurchase: {
      allopathicPurchase: object.categoryWisePurchase.allopathic,
      ayurvedicPurchase: object.categoryWisePurchase.ayurvedic,
      generalPurchase: object.categoryWisePurchase.general,
      genericPurchase: object.categoryWisePurchase.generic,
      surgicalPurchase: object.categoryWisePurchase.surgical,
    }
  })
}