export const getNextId = <T extends { id: number }>(array: T[]): number => {
  if (array.length === 0) {
    return 0
  }
  return Math.max(...array.map(item => item.id)) + 1
}
