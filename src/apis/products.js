import { API } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getAllProducts = async () => {
  const res = await axios_instance.get(API.GET_ALL_PRODUCTS)
  return res.data
}

export const getProductQuery = async (query) => {
  const res = await axios_instance.get(API.GET_PRODUCT_QUERY + "?" + `${query.name}=${query.value}`)
  return res.data
}

export const getProduct = async (pId) => {
  const res = await axios_instance.get(`${API.GET_PRODUCT}?item=${pId}`)
  return res.data
}

export const getProductWithInitials = async (search) => {
  const res = await axios_instance.get(`${API.GET_PRODUCT}/initials?key=${search}`)
  return res.data
}

export const addProdManually = async (data) => {
  const res = await axios_instance.post(`${API.POST_PRODUCT}`, data)
  return res.data
}

export const udpateProduct = async (pId, data) => {
  const res = await axios_instance.patch(`${API.UPDATE_PRODUCT}?item=${pId}`, data)
  return res.data
}

export const deleteProduct = async (pId) => {
  const res = await axios_instance.delete(`${API.DELETE_PRODUCT}?item=${pId}`)
  return res.data
}

export const prodCheckout = async (data) => {
  const res = await axios_instance.post(`${API.CHECKOUT_PRODUCT}`, data)
  return res.data
}