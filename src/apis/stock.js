import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const addStockDetial = async (data) => {
  const res = await axios_instance.post(API.ADD_STOCK, data)
  return res.data
}

// export const getStockWithInitials = async (search) => {
//   const res = await axios_instance.get(`${API.GET_STOCK}/initials?key=${search}`)
//   return res.data
// }

export const getStockInfo = async (pId) => {
  const res = await axios_instance.get(`${API.GET_STOCK}/${pId}`)
  return res.data
}

export const deleteStock = async (stockId) => {
  const res = await axios_instance.delete(`${API.DELETE_STOCK}/${stockId}`)
  return res.data
}