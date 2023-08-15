export const BillingListHeader = [
  { name: 'Item Name', value: "itemName", colSize: "25%" },
  { name: 'Pkg.', value: "pkg", colSize: "10%" },
  { name: 'Stock', value: "qnty", colSize: "10%" },
  { name: 'Company', value: "company", colSize: "20%" },
  // { name: 'Category', value:"category", colSize: "10%" },
  // { name: 'GST', value:"gst", colSize: "10%" },
  { name: 'Location', value: "location", colSize: "10%" },
]

export const QuotationListHeader = [
  { name: 'Item', value: "itemName", colSize: "20%", ph: "Item name" },
  { name: 'Batch', value: "batch", colSize: "15%", ph: "Batch" },
  { name: 'Pkg', value: "pkg", colSize: "7%", ph: "pkg" },
  { name: 'Exp', value: "expDate", colSize: "5%", ph: "Exp" },
  { name: 'Qnt.', value: "soldQnty", colSize: "5%", ph: "Qnt" },
  { name: 'MRP', value: "mrp", colSize: "5%", ph: "MRP" },
  { name: 'Rate', value: "rate", colSize: "5%", ph: "Rate" },
  { name: 'GST%', value: "gst", colSize: "5%", ph: "GST" },
  { name: 'Dis%', value: "disc", colSize: "5%", ph: "Dis" },
  { name: 'Total', value: "total", colSize: "10%", ph: "Total" },
]

export const BillingHistoryListHeader = [
  { name: 'Patient Name', value: "patientName", colSize: "25%" },
  { name: 'Invoice No', value: "invoiceNo", colSize: "10%" },
  { name: 'Mobile No.', value: "mobileNumber", colSize: "15%" },
  { name: 'Prescribed By', value: "prescribedBy", colSize: "15%" },
  { name: 'Total', value: "grandTotal", colSize: "10%" },
  { name: 'Balance', value: "amtDue", colSize: "10%" },
  { name: 'Billing Date', value: "billingDate", colSize: "10%" },
]

export const CNHistoryListHeader = [
  { name: 'Patient Name', value: "patientName", colSize: "20%" },
  { name: 'CN No', value: "cnNo", colSize: "10%" },
  { name: 'Mobile No.', value: "mobileNumber", colSize: "10%" },
  { name: 'Prescribed By', value: "prescribedBy", colSize: "15%" },
  { name: 'Total', value: "grandTotal", colSize: "8%" },
  { name: 'Amt. Refund', value: "amtRefund", colSize: "8%" },
  { name: 'Return Date', value: "billingDate", colSize: "10%" },
  { name: 'Status', value: "status", colSize: "8%" },
]
export const CNListInQuotation = [
  { name: 'Item', value: "itemName", colSize: "20%", ph: "Item name" },
  { name: 'Batch', value: "batch", colSize: "15%", ph: "Batch" },
  { name: 'Pkg', value: "pkg", colSize: "7%", ph: "Batch" },
  { name: 'Exp', value: "expDate", colSize: "5%", ph: "Exp" },
  { name: 'Qnt.', value: "returnedQnty", colSize: "5%", ph: "Qnt" },
  { name: 'MRP', value: "mrp", colSize: "5%", ph: "MRP" },
  { name: 'Rate', value: "rate", colSize: "5%", ph: "Rate" },
  { name: 'GST%', value: "gst", colSize: "5%", ph: "GST" },
  { name: 'Dis%', value: "disc", colSize: "5%", ph: "Dis" },
  { name: 'Total', value: "total", colSize: "10%", ph: "Total" },
]

export const BillingProductListHeader = [
  { name: 'Item Name', value: "itemName", colSize: "15%", ph: "", type: "text" },
  { name: 'Batch', value: "batch", colSize: "13%", ph: "batch", type: "text" },
  { name: 'Exp.', value: "expDate", colSize: "13%", ph: "exp date", type: "month" },
  { name: 'Pkg.', value: "pkg", colSize: "5%", ph: "", type: "text" },
  { name: 'Qnty.', value: "soldQnty", colSize: "5%", ph: "qnty", type: "number" },
  { name: 'MRP', value: "mrp", colSize: "7%", ph: "mrp", type: "text" },
  { name: 'Rate', value: "rate", colSize: "7%", ph: "rate", type: "text" },
  { name: 'GST%', value: "gst", colSize: "4%", ph: "gst", type: "text" },
  { name: 'Disc%', value: "disc", colSize: "3%", ph: "disc%", type: "text" },
  { name: 'Total', value: "total", colSize: "7%", ph: "total", type: "text" },
]

export const CNProductListHeader = [
  { name: 'Item Name', value: "itemName", colSize: "15%", ph: "", type: "text" },
  { name: 'Batch', value: "batch", colSize: "13%", ph: "batch", type: "text" },
  { name: 'Exp.', value: "expDate", colSize: "13%", ph: "exp date", type: "month" },
  { name: 'Pkg.', value: "pkg", colSize: "5%", ph: "", type: "text" },
  { name: 'Qnty.', value: "returnedQnty", colSize: "5%", ph: "qnty", type: "number" },
  { name: 'MRP', value: "mrp", colSize: "7%", ph: "mrp", type: "text" },
  { name: 'Rate', value: "rate", colSize: "7%", ph: "rate", type: "text" },
  { name: 'GST%', value: "gst", colSize: "4%", ph: "gst", type: "text" },
  { name: 'Disc%', value: "disc", colSize: "3%", ph: "disc%", type: "text" },
  { name: 'Total', value: "total", colSize: "7%", ph: "total", type: "text" },
]

export const BILLTYPES = [
  { label: "Select type", value: "" },
  { label: "Chalan", value: "CHALAN" },
  { label: "Credit", value: "CREDIT" }
]