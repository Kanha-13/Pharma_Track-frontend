import { FORGET_PASSWORD, LOGIN_API, LOGOUT, RESEND_OTP, RESET_PASSWORD_VERIFY_OTP, SIGNUP_API, SUBMIT_NEW_PASSWORD, VERIFY_OTP } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const handleLoginSubmit = async (data) => {
  const res = await axios_instance.post(LOGIN_API, data)
  return res.data
}


export const handleSignupSubmit = async (data) => {
  const res = await axios_instance.post(SIGNUP_API, data)
  return res.data
}

export const handleVerifyOTP = async (data) => {
  const res = await axios_instance.post(VERIFY_OTP, data)
  return res.data
}

export const handleResendOTP = async (data) => {
  const res = await axios_instance.post(RESEND_OTP, data)
  return res.data
}

export const handleForgetPassword = async (data) => {
  const res = await axios_instance.post(FORGET_PASSWORD, data)
  return res.data
}

export const handleResetPassVerifyOTP = async (data) => {
  const res = await axios_instance.post(RESET_PASSWORD_VERIFY_OTP, data)
  return res.data
}

export const handleSubmitNewPassword = async (data) => {
  const res = await axios_instance.post(SUBMIT_NEW_PASSWORD, data)
  return res.data
}

export const handleLogout = async () => {
  const res = await axios_instance.post(LOGOUT)
  return res.data
}