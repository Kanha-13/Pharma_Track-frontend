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