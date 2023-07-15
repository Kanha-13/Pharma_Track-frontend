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

export const queryStocks = async (pId) => {
  const res = await axios_instance.get(API.GET_STOCKS_QUERY + "?pId=" + pId)//using product id because fetching info of stock for a particular product
  return res.data
}

export const updateStockDetial = async (data) => {
  const res = await axios_instance.patch(API.UPDATE_STOCK + data._id, data)
  return res.data
}

export const deleteStock = async (stockId) => {// it won't reduce stock, rather completely delete its entry from db
  const res = await axios_instance.delete(API.DELETE_STOCK + stockId)
  return res.data
}

export const getStocksValuation = async () => {
  const res = await axios_instance.get(API.GET_STOCKS_VALUATION)
  return res.data
}