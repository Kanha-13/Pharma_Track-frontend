import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const addPurchaseDetial = async (data) => {
  const res = await axios_instance.post(API.ADD_PURCHASE, data)
  return res.data
}

// export const getStockWithInitials = async (search) => {
//   const res = await axios_instance.get(`${API.GET_STOCK}/initials?key=${search}`)
//   return res.data
// }

export const getPurchases = async (vId = "", billNo = "", dateRange = {}, paymentType) => {
  let searchQuery = "?"
  if (vId)
    searchQuery += `vId=${vId}&`
  if (billNo)
    searchQuery += `billNo=${billNo}&`
  if (dateRange.from && dateRange.to)
    searchQuery += `from=${dateRange.from}&to=${dateRange.to}&`
  if (paymentType)
    searchQuery += `paymentType=${paymentType}`
  const res = await axios_instance.get(API.GET_PURCHASES + searchQuery)//using product id because fetching info of stock for a particular product
  return res.data
}

export const getPurchase = async (purchaseId) => {
  const res = await axios_instance.get(API.GET_PURCHASE_DETAIL + purchaseId)//using product id because fetching info of stock for a particular product
  return res.data
}

export const purchaseBillPayment = async (data) => {
  const res = await axios_instance.post(API.BILL_PAYMENT_PURCHASE, data)
  return res.data
}