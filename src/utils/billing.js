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

export const numbersInWords = (n = 0) => {
  if (n < 0)
    return false;
  if (n === 0) return 'Zero'
  let single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  let double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  let below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  function translate(n) {
    let word = ""
    if (n < 10) {
      word = single_digit[n] + ' '
    }
    else if (n < 20) {
      word = double_digit[n - 10] + ' '
    }
    else if (n < 100) {
      let rem = translate(n % 10)
      word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
    }
    else if (n < 1000) {
      word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
    }
    else if (n < 1000000) {
      word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000)
    }
    return word
  }
  let result = translate(n)
  return result.trim()
}

export const validatesalesbill = (billInfo = {}, carts = []) => {

  if (!Object.keys(carts[0]).length) return { success: false, error: "Cart empty!!" }
  if (!billInfo.patientName) return { success: false, error: "Patient Name Required!!" }
  if (!billInfo.amtPaid) return { success: false, error: "Amount paid Required!!" }

  return { success: true, error: false }
}