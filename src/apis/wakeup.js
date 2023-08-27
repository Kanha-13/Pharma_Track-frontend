import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const wakeupserver = async () => {
  const res = await axios_instance.get(API.WAKE_UP_SERVER)
  return res.data
}