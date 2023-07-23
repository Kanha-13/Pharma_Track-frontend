import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getExpiry = async (query) => {
  const res = await axios_instance.get(API.GET_EXPIRY + `?from=${query.from}&to=${query.to}`)
  return res.data
}