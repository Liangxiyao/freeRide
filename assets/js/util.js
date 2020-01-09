export const formatTime = (date, type) => {
  console.log(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (type == 1) {
    return [year, month, day].map(formatNumber).join('-')
  } else if (type == 2) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
  }else{
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const timestamp = date => { 
  var replaceDate = date.replace(/-/g,"/")
  return new Date(replaceDate).valueOf()
}

