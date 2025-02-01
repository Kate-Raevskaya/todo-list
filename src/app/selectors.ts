import type { RootState } from "./store"

export const getAllTasks = (state: RootState) => {
  return state.tasks
}

export const getFilteredTasks = (filter: string) => (state: RootState) => {
  return state.tasks.filter(
    task =>
      task.id.toString().toLowerCase().startsWith(filter) ||
      task.title.toLowerCase().startsWith(filter),
  )
}
