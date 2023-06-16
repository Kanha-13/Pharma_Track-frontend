import { ADD_VENDORS, GET_VENDORS } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getVendors = async () => {
  const res = await axios_instance.get(GET_VENDORS)
  return res.data
}

export const addVendor = async (data) => {
  const res = await axios_instance.post(ADD_VENDORS, data)
  return res.data
}