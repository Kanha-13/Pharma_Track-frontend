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
export const getCNHistory = async (mobileNumber = "", invoiceNo = "", patientName = "", prescribedBy = "", dateRange = {}) => {
  let searchQuery = "?"
  if (patientName)
    searchQuery += `patientName=${patientName}&`
  if (prescribedBy)
    searchQuery += `prescribedBy=${prescribedBy}&`
  if (mobileNumber)
    searchQuery += `mobileNumber=${mobileNumber}&`
  if (invoiceNo)
    searchQuery += `cnNo=${invoiceNo}&`
  if (dateRange.from && dateRange.to)
    searchQuery += `from=${dateRange.from}&to=${dateRange.to}`
  const res = await axios_instance.get(API.GET_CN_HISTORY + searchQuery)//using product id because fetching info of stock for a particular product
  return res.data
}

export const getBillingInfo = async (id) => {
  const res = await axios_instance.get(API.GET_BILLING_INFO + id)
  return res.data
}

export const getCNInfo = async (id) => {
  const res = await axios_instance.get(API.GET_CN_INFO + id)
  return res.data
}

export const updateBillingInfo = async (id, data) => {
  const res = await axios_instance.patch(API.UPDATE_BILLING_INFO + id, data)
  return res.data
}

export const cancelSaleBill = async (id, newData) => {
  const res = await axios_instance.put(API.CANCEL_BILLING + id, newData)
  return res.data
}

export const addCN = async (data) => {
  const res = await axios_instance.post(API.ADD_BILLING_CN, data)
  return res.data
}

export const deleteCN = async (id) => {
  const res = await axios_instance.delete(API.DELETE_BILLING_CN + id)
  return res.data
}