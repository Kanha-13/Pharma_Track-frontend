import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getInvoiceCount =async () =>{
  const res = await axios_instance.get(API.GET_INVOICE_COUNT)
  return res.data
}

export const checkoutBill=async(data)=>{
  const res = await axios_instance.post(API.CHECKOUT_PRODUCT,data)
  return res.data
}