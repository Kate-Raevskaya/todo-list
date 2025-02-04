export function dateNow(): string {
  let date = new Date()
  return `${date.toTimeString().slice(0, 8)}, ${date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  )}`
}

export const transformDate = (myDate: string) => {
  const date = new Date(myDate)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}
