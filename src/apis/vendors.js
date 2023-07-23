import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getVendors = async () => {
  const res = await axios_instance.get(API.GET_VENDORS)
  return res.data
}

export const getVendor = async (id) => {
  const res = await axios_instance.get(API.GET_VENDOR + id)
  return res.data
}

export const addVendor = async (data) => {
  const res = await axios_instance.post(API.ADD_VENDOR, data)
  return res.data
}
export const udpateVendor = async (vId, data) => {
  const res = await axios_instance.patch(`${API.UPDATE_VENDOR}?vendor=${vId}`, data)
  return res.data
}
export const deleteVendor = async (id) => {
  const res = await axios_instance.delete(API.DELETE_VENDOR + id)
  return res.data
}