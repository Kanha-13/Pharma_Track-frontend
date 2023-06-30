import { ProductCategories } from "../Constants/productCategories";

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

export const calculateNetRate = (products = []) => {
  return products.map((product, index) => {
    let rate = parseInt(product.rate)
    let gst = parseInt(product.gst)
    let pkg = parseInt(product.pkg)
    let free = parseInt(product.free) || 0

    if (product.category === "TABLET") {
      let strips = parseInt(product.strips)
      let tabs = parseInt(product.tabs)
      let paid_strips = (strips + (tabs / pkg))
      let total_strips = paid_strips + free

      let paid_per_strip = ((rate * gst) / 100) + rate || rate || 0
      product.netRate = parseFloat((paid_per_strip * paid_strips) / total_strips).toFixed(2)  //this netRate is per strips not per tabs
    }
    else {
      let qnty = parseInt(product.qnty)
      let paid_per_unit = ((rate * gst) / 100) + rate || rate || 0
      product.netRate = parseFloat((paid_per_unit * qnty) / (qnty + free)).toFixed(2)
    }
    return product;
  })
}