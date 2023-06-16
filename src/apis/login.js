import { LOGIN_API, LOGOUT } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const handleLoginSubmit = async (data) => {
  const res = await axios_instance.post(LOGIN_API, data)
  return res.data
}

export const handleLogout = async () => {
  const res = await axios_instance.post(LOGOUT)
  return res.data
}