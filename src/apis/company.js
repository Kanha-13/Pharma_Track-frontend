import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const addCompanyDetial = async (data) => {
  const res = await axios_instance.post(API.ADD_COMPANY, data)
  return res.data
}

export const getCompanies = async () => {
  const res = await axios_instance.get(API.GET_COMPANYS)
  return res.data
}

export const getCompany = async (id) => {
  const res = await axios_instance.get(API.GET_COMPANY + id)
  return res.data
}

export const updateCompany = async (id, data) => {
  const res = await axios_instance.patch(API.UPDATE_COMPANY + id, data)
  return res.data
}

export const deleteCompany = async (id) => {
  const res = await axios_instance.delete(API.DELETE_COMPANY + id)
  return res.data
}