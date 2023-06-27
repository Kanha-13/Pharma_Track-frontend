import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const addSettlement = async (data) => {
  const res = await axios_instance.post(API.ADD_SETTLEMENT, data)
  return res.data
}
export const getSettlements = async () => {
  const res = await axios_instance.get(API.GET_SETTLEMENTS)
  return res.data
}
export const updateSettlement = async (data) => {
  const res = await axios_instance.patch(API.UPDATE_SETTLEMENT + data._id, data)
  return res.data
}
export const deleteSettlement = async (settlementId) => {
  const res = await axios_instance.delete(API.DELETE_SETTLEMENT + settlementId)
  return res.data
}