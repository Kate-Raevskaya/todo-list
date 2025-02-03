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
