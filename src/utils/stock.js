export const checkIfAllDataPresent = (data) => {
  if (!data.pId)
    return false
  if (!data.mrp)
    return false
  if (!data.expDate)
    return false
  if (!data.qnty)
    return false
  if (!data.batch)
    return false
  return true
}