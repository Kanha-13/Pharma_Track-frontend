import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getMedicineHistory = async (patientName) => {
  const res = await axios_instance.get(API.GET_MEDICINE_HISTORY + "?patientName=" + patientName)
  return res.data || []
}