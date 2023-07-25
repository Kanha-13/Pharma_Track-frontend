export const getColor = (name, value) => {
  if (value)
    switch (name) {
      case "sales":
        return "#5e48e8"
      case "purchase":
        return "#00cefd"
      case "profit":
        return "#fcb684"
      default:
        return "#de0a3e"
    }
  else return "gray"
}
export const getBorder = (name, value) => {
  if (value)
    switch (name) {
      case "sales":
        return "#5e48e8"
      case "purchase":
        return "#00cefd"
      case "profit":
        return "#fcb684"
      default:
        return "#de0a3e"
    }
  else return "gray"
}

export const getBg = (name, value) => {
  if (value)
    switch (name) {
      case "sales":
        return "#ebe8fc"
      case "purchase":
        return "#dff9ff"
      case "profit":
        return "#fff9f5"
      default:
        return "#fddcdc"
    }
  else return "#f5f5f5"
}

export const sumAllObjectsFields = (trades = []) => {
  let totalSalesCount = 0, totalRevenue = 0, totalPurchaseCount = 0, totalInvestment = 0, totalProfit = 0, totalSalesCredit = 0, totalPurchaseCredit = 0, totalLoss = 0, creditCollection = 0, creditPaidOff = 0;
  let allopathicPurchase = 0, allopathicSale = 0, ayurvedicPurchase = 0, ayurvedicSale = 0, generalPurchase = 0, generalSale = 0, genericPurchase = 0, genericSale = 0, surgicalPurchase = 0, surgicalSale = 0;
  if (!trades.length) return

  trades.map((trade) => {
    if (!trade)
      return
    totalSalesCount += trade.salesCount
    totalRevenue += trade.revenue
    totalPurchaseCount += trade.purchaseCount
    totalInvestment += trade.investment
    totalProfit += trade.profit
    totalSalesCredit += trade.salesCredit
    totalPurchaseCredit += trade.purchaseCredit
    totalLoss += trade.totalLoss
    creditCollection += trade.creditCollection
    creditPaidOff += trade.creditPaidOff

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
    totalLoss,
    creditCollection,
    creditPaidOff,
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
    },
    date: trades[0]?.date ? trades[0].date : null
  })
}

export const generateTradeAnalysis = (object = {}) => {
  if (!Object.keys(object).length) return {
    tsc: 0,
    tp: 0,
    tpcr: 0,
    tscr: 0,
    asa: 0,
    apa: 0,
    cpo: 0,
    tr: 0,
    ti: 0,
    tl: 0,
    cc: 0,
  }
  return ({
    tsc: object.salesCount, tpc: object.purchaseCount,
    tp: object.profit.toFixed(2), ti: object.investment.toFixed(2), tr: object.revenue.toFixed(2),
    tscr: object.salesCredit.toFixed(2), tpcr: object.purchaseCredit.toFixed(2),
    asa: (object.revenue / object.salesCount).toFixed(2),
    apa: (object.investment / object.purchaseCount).toFixed(2),
    cpo: object.creditPaidOff.toFixed(2), cc: object.creditCollection.toFixed(2), tl: object.totalLoss.toFixed(2),

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

export const generateSatistics = (dataArray = [], type) => {
  let statistics = dataArray.map((data) => {
    let xLabel = ""
    if (type === "monthly")
      if (data.date)
        xLabel = new Date(data.date).toLocaleString('default', { month: 'short' })
      else
        xLabel = xLabel = new Date(2000, (data.month - 1), 1).toLocaleString('default', { month: 'short' })
    else//daily
      xLabel = new Date(data.date).getDate()
    return { xLabel: xLabel, sales: data.revenue, purchase: data.investment, profit: data.profit, loss: data.totalLoss }
  })

  return statistics;
}