import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const handleLoginSubmit = async (data) => {
  const res = await axios_instance.post(API.LOGIN_API, data)
  return res.data
}


export const handleSignupSubmit = async (data) => {
  const res = await axios_instance.post(API.SIGNUP_API, data)
  return res.data
}

export const handleVerifyOTP = async (data) => {
  const res = await axios_instance.post(API.VERIFY_OTP, data)
  return res.data
}

export const handleResendOTP = async (data) => {
  const res = await axios_instance.post(API.RESEND_OTP, data)
  return res.data
}

export const handleForgetPassword = async (data) => {
  const res = await axios_instance.post(API.FORGET_PASSWORD, data)
  return res.data
}

export const handleResetPassVerifyOTP = async (data) => {
  const res = await axios_instance.post(API.RESET_PASSWORD_VERIFY_OTP, data)
  return res.data
}

export const handleSubmitNewPassword = async (data) => {
  const res = await axios_instance.post(API.SUBMIT_NEW_PASSWORD, data)
  return res.data
}

export const handleLogout = async () => {
  const res = await axios_instance.post(API.LOGOUT)
  return res.data
}