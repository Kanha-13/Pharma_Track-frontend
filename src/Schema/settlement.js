export const SETTLEMENT = {
  ITEMNAME: "itemName",
  DATE: "date",
  PID: "pId",
  VID: "vId",//we can return to any vendor therefore it can defer from purchansed from vendor
  SID: "sId",
  RETURN_QNTY: "returnQnty",
  STATUS: "status",
  TYPE: "type",
  PURCHASED_FROM: "vendorName"
}

export const settlementdetail = {
  itemName: "", pId: "", vId: "", sId: "", date: "", returnQnty: "", type: "", status: "", purchasedFrom: ""
}

export const SettlementTypes = [
  { value: "", label: "Select Type" },
  { value: "EXPIRY", label: "Expiry" },
  { value: "RETURN", label: "Return" }
]

export const SettlementsListHeader = [
  { name: 'Item Name', value:"itemName", colSize: "25%" },
  { name: 'Batch', value:"batch", colSize: "10%" },
  { name: 'Returned to', value:"vendorName", colSize: "15%" },
  { name: 'Qnty.Ret', value:"returnQnty", colSize: "10%" },
  { name: 'MRP', value:"mrp", colSize: "10%" },
  { name: 'Type', value:"type", colSize: "10%" },
  { name: 'Date', value:"date", colSize: "10%" },
  { name: 'Status', value:"status", colSize: "10%" },
]