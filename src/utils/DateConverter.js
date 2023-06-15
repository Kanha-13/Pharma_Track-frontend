export const datetoJSformat = (date) => {
  return new Date(date).toLocaleDateString()
}

export const getMonthYear = (date) => {
  return `${new Date(date).getMonth() + 1} / ${new Date(date).getFullYear() % 1000}`
}
// export const datetoMongoDBformat=(date)=>{
//   return new Date(date).toLocaleDateString()
// }