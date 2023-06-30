export const PURCHASEPRODUCTINFO = {
  PRODUCTID: "pId",
  ITEMNAME: "itemName",
  MRP: "mrp",
  EXPDATE: "expDate",
  QNT: "qnty",
  BATCH: "batch",
  STIRPS: "strips",
  TABS: "tabs",
  PKG: "pkg",
  VID: "vId",
  FREE: "free",
  RATE: "rate",
  SC: "schemeDisc",
  CD: "cashDisc",
  TOTAL_VALUE: "totalValue",
  GST: "gst",
  N_AMT: "netAmount",

}
export const PURCHASEBILLINFO = {
  VENDORID: "vId",
  PURCHASEDATE: "purDate",
  PAYMENTTYPE: "paymentType",
  BILLNUMBER: "billNo",
  VENDORNAME: "vendorName",
  TOTALAMOUNT: "totalAmt"
}

export const purchaseproductdetail = {
  itemName: "", pId: "", free: "0", mrp: "", gst: "", expDate: "", qnty: "",
  batch: "", strips: "", netRate: "", tabs: "", pkg: "", category: "", rate: "", cashDisc: "0", schemeDisc: "0", totalValue: ""
}

export const purchasebilldetail = {
  vendorName: "", vId: "", purDate: "", billNo: "", totalAmt: "", paymentType: ""
}