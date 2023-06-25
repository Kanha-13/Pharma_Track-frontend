export const datetoJSformat = (date) => {
  return new Date(date).toLocaleDateString()
}

export const getmmyy = (date) => {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getFullYear() % 1000}`
}
// export const datetoMongoDBformat=(date)=>{
//   return new Date(date).toLocaleDateString()
// }

export const toddmmyy = (date) => {
  if (date)
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear() % 1000}`
  else
    return `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear() % 1000}`
}



export const to_dd_monthname_yy = (date) => {
  if (date)
    return `${new Date(date).getDate()} ${getMonthName(new Date(date).getMonth() + 1)} ${new Date(date).getFullYear() % 1000}`
  else
    return `${new Date().getDate()} ${getMonthName(new Date().getMonth() + 1)} ${new Date().getFullYear()}`
}















const getMonthName = (month) => {
  switch (month) {
    case 1:

      return "Jan";
    case 2:

      return "Feb";
    case 3:

      return "Mar";
    case 4:

      return "Apr";
    case 5:

      return "May";
    case 6:

      return "Jun";
    case 7:

      return "Jul";
    case 8:

      return "Aug";
    case 9:

      return "Sep";
    case 10:

      return "Oct";
    case 11:

      return "Nov";
    default:
      return "Dec";
  }
}