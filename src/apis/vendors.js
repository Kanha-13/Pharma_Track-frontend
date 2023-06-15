import { GET_VENDORS } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getVendors =async()=>{
  const res = await axios_instance.get(GET_VENDORS)
  return res.data
}