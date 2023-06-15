import { CHECKOUT_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT, POST_PRODUCT } from "../Constants/routes_backend"
import axios_instance from "./axios"

export const getAllProducts = async () => {
  const res = await axios_instance.get(GET_ALL_PRODUCTS)
  return res.data
}

export const getProduct = async (search) => {
  const res = await axios_instance.get(`${GET_PRODUCT}?item=${search}`)
  return res.data
}
export const getProductWithInitials = async (search) => {
  const res = await axios_instance.get(`${GET_PRODUCT}/initials?key=${search}`)
  return res.data
}


export const addProdManually = async (data) => {
  const res = await axios_instance.post(`${POST_PRODUCT}`, data)
  return res.data
}

export const prodCheckout = async (data) => {
  const res = await axios_instance.post(`${CHECKOUT_PRODUCT}`, data)
  return res.data
}