import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getInvoiceCount = async () => {
  const res = await axios_instance.get(API.GET_INVOICE_COUNT)
  return res.data
}

export const checkoutBill = async (data) => {
  const res = await axios_instance.post(API.CHECKOUT_PRODUCT, data)
  return res.data
}

export const getBillingHistory = async (mobileNumber = "", invoiceNo = "", patientName = "", prescribedBy = "", dateRange = {}) => {
  let searchQuery = "?"
  if (patientName)
    searchQuery += `patientName=${patientName}&`
  if (prescribedBy)
    searchQuery += `prescribedBy=${prescribedBy}&`
  if (mobileNumber)
    searchQuery += `mobileNumber=${mobileNumber}&`
  if (invoiceNo)
    searchQuery += `invoiceNo=${invoiceNo}&`
  if (dateRange.from && dateRange.to)
    searchQuery += `from=${dateRange.from}&to=${dateRange.to}`
  const res = await axios_instance.get(API.GET_BILLING_HISTORY + searchQuery)//using product id because fetching info of stock for a particular product
  return res.data
}

export const getBillingInfo = async (id) => {
  const res = await axios_instance.get(API.GET_BILLING_INFO + id)
  return res.data
}