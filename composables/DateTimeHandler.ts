export const getDate = (dateTime: string) => {
  return dateTime.split('T')[0]
}

export const getTime = (dateTime: string) => {
  return dateTime.split('T')[1].replaceAll(/:(?:.(?!:))*$/g, '')
}

export const getDateTime = (dateTime: string) => {
  return getDate(dateTime) + ' ' + getTime(dateTime)
}

export const getDuration = (dateStart: string, dateEnd: string) => {
  return (
    (Date.UTC(
      Number.parseInt(getFullYear(dateEnd)),
      Number.parseInt(getMonth(dateEnd)),
      Number.parseInt(getDay(dateEnd)),
      Number.parseInt(getHour(dateEnd)),
      Number.parseInt(getMinute(dateEnd)),
    ) -
      Date.UTC(
        Number.parseInt(getFullYear(dateStart)),
        Number.parseInt(getMonth(dateStart)),
        Number.parseInt(getDay(dateStart)),
        Number.parseInt(getHour(dateStart)),
        Number.parseInt(getMinute(dateStart)),
      )) /
    (1000 * 60 * 60)
  ).toString()
}

export const getYear = (dateTime: string) => {
  return dateTime.split('-')[0].slice(2)
}

export const getFullYear = (dateTime: string) => {
  return dateTime.split('-')[0]
}

export const getMonth = (dateTime: string) => {
  return dateTime.split('-')[1]
}

export const getDay = (dateTime: string) => {
  return dateTime.split('-')[2].split('T')[0]
}

export const getHour = (dateTime: string) => {
  return dateTime.split('T')[1].split(':')[0]
}

export const getMinute = (dateTime: string) => {
  return dateTime.split(':')[1]
}
