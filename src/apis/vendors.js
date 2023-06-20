import {API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getVendors = async () => {
  const res = await axios_instance.get(API.GET_VENDORS)
  return res.data
}

export const addVendor = async (data) => {
  const res = await axios_instance.post(API.ADD_VENDORS, data)
  return res.data
}