export const validateAddRequest = (data) => {
  for (const key in data)
    if (data.hasOwnProperty(key))
      if (!data[key])
        return false;
  return true;
}

export const validateUpdateRequest = (data) => {
  delete data.__v
  if (!data._id)
    return false
  for (const key in data)
    if (data.hasOwnProperty(key))
      if (!data[key])
        return false;
  return true;
}

