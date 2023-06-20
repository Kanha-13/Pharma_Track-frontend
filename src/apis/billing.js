import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getInvoiceCount =async () =>{
  const res = await axios_instance.get(API.GET_INVOICE_COUNT)
  return res.data
}