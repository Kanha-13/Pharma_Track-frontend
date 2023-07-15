import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getTradeReport = async (query) => {
  let res;
  if (query.period)
    res = await axios_instance.get(API.GET_TRADE_REPORT + "?duration=" + query.period)
  else
    res = await axios_instance.get(API.GET_TRADE_REPORT + `?fromMonth=${query.fromMonth}&toMonth=${query.toMonth}&fromYear=${query.fromYear}&toYear=${query.toYear}`)
  return res.data || []
}