import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getTradeReport = async (duration, custom) => {
  let res;
  if (custom.from)
    res = await axios_instance.get(API.GET_TRADE_REPORT + "?duration=" + duration + `&from=${custom.from}&to=${custom.to}`)
  else
    res = await axios_instance.get(API.GET_TRADE_REPORT + "?duration=" + duration)
  return res.data || []
}