export const PurchaseProductListHeader = [
  { name: 'Item Name', value: "itemName", colSize: "14%", ph: "Item name", type: "text" },
  { name: 'Pkg.', value: "pkg", colSize: "5%", ph: "Pkg" },
  { name: 'Qnty.', value: "qnty", colSize: "4.5%", ph: "Qnty", type: "number" },
  { name: 'Free', value: "free", colSize: "3.5%", ph: "Free", type: "number" },
  { name: 'Batch', value: "batch", colSize: "10%", ph: "Batch" },
  { name: 'Exp. Date', value: "expDate", colSize: "8%", ph: "Exp Date", type: "month" },
  { name: 'MRP', value: "mrp", colSize: "5%", ph: "MRP" },
  { name: 'Rate', value: "rate", colSize: "5%", ph: "Rate" },
  { name: 'SC%', value: "schemeDisc", colSize: "3%", ph: "SC" },
  { name: 'CD%', value: "cashDisc", colSize: "3%", ph: "CD" },
  { name: 'Value', value: "netValue", colSize: "6%", ph: "Value" },
  { name: 'GST%', value: "gst", colSize: "3%", ph: "GST" },
  { name: 'Net Amt.', value: "netAmt", colSize: "6%", ph: "Net.Amt" },
]

export const PaymentTypesLits = [
  { label: "Select", value: "" },
  { label: "Chalan", value: "CHALAN" },
  { label: "Cash", value: "CASH" },
  { label: "Credit", value: "CREDIT" },
  { label: "UPI", value: "UPI" },
  { label: "NEFT", value: "NEFT" },
  { label: "RTGS", value: "RTGS" },
  { label: "Net Banking", value: "Net_Banking" }
]

export const PurchaseHistoryListHeader = [
  { name: 'Bill No', value: "billNo", colSize: "18%" },
  { name: 'Pur. Date', value: "purDate", colSize: "18%" },
  { name: 'Payment Type', value: "paymentType", colSize: "18%" },
  { name: 'Total Value', value: "totalValue", colSize: "18%" },
  { name: 'Total tax', value: "totalTax", colSize: "18%" },
  { name: 'Total Amt', value: "totalAmt", colSize: "18%" },
]

export const BillPaymentMode = [
  { label: "Select Mode", value: "" },
  { label: "UPI", value: "UPI" },
  { label: "Cash", value: "CASH" },
  { label: "NEFT", value: "NEFT" },
  { label: "RTGS", value: "RTGS" },
  { label: "Net Banking", value: "Net_Banking" }
]