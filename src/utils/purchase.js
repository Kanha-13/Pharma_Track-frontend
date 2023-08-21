export const checkIfMissingValues = (billInfo, products = []) => {
  let isMissing = false;
  if (!billInfo.vId || !billInfo.purDate || !billInfo.paymentType || !billInfo.billNo)
    return true
  products.map((product, index) => {
    if (!product.pId || !product.vId || !product.mrp || !product.batch || !product.qnty || !product.rate || !product.expDate)
      isMissing = true
  })
  if (isMissing)
    return true
}

export const checkInvalidFormatAndType = (bill, products) => {
  let err = ""
  const regex = /[a-zA-Z]/g;
  products.map((prod, index) => {
    if (prod.category === "TABLET" && prod.pkg.match(regex))
      err = "TABLET / CAPSULE package invalid of " + prod.itemName + "has category TABLET and pkg " + prod.pkg
  })

  return err
}

export const getNet = (name, product, value) => {
  let prod = { ...product, [name]: value }
  let rate = prod.rate
  let cd = prod.cashDisc
  let sc = prod.schemeDisc
  let qnty = parseInt(prod.qnty)
  let free = parseInt(prod.free)
  let gst = product.gst

  let total_value = qnty * rate
  let sc_discount = total_value - (total_value * sc / 100)
  let cd_discount = sc_discount - (sc_discount * cd / 100)

  let net_rate = cd_discount + (cd_discount * gst / 100)
  let taxedAmt = net_rate - cd_discount
  // let taxedAmt = (rate * gst / 100) * qnty
  // let netDiscountedRate_perunit = (rate - rate * sc / 100) - (rate - rate * sc / 100) * cd / 100
  // let total = ((netDiscountedRate_perunit * qnty) + taxedAmt)
  return {
    netvalue: parseFloat(cd_discount).toFixed(2),
    nettax: parseFloat(taxedAmt).toFixed(2),
    netamt: parseFloat(net_rate).toFixed(2),
    netrateperunit: parseFloat(net_rate / (qnty + free)).toFixed(2)
  }
}

export const getTotal = (list = [], index, amt, value, tax) => {
  let totalamt = 0;
  let totalvalue = 0;
  let totaltax = 0;
  for (let i = 0; i < list.length; i++) {
    if (i === index) {
      totaltax = parseFloat(totaltax) + parseFloat(tax)
      totalvalue = parseFloat(totalvalue) + parseFloat(value)
      totalamt = parseFloat(totalamt) + parseFloat(amt)
    }
    else if (list[i].netAmt) {
      totaltax = parseFloat(totaltax) + parseFloat(list[i].netTax)
      totalvalue = parseFloat(totalvalue) + parseFloat(list[i].netValue)
      totalamt = parseFloat(totalamt) + parseFloat(list[i].netAmt)
    }
  }
  return {
    totalvalue: parseFloat(totalvalue).toFixed(2),
    totaltax: parseFloat(totaltax).toFixed(2),
    totalamt: Math.round(totalamt)
  }
}

export const removeBlankRow = (productlist = []) => {
  return productlist.filter(prod => prod.pId !== "")
}