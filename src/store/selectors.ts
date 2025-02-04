import type { RootState } from "./store.ts"

export const getAllTasks = (state: RootState) => {
  return state.tasks
}

export const getFilteredTasks = (state: RootState, filter: string) => {
  return state.tasks.filter(
    task =>
      task.id.toString().toLowerCase().startsWith(filter) ||
      task.title.toLowerCase().startsWith(filter),
  )
}

export const getAllProjects = (state: RootState) => {
  return state.projects.projects
}

export const getCurrentProject = (state: RootState) => {
  return state.projects.currentProject
}

export const getAllComments = (state: RootState, parentId: number | null) => {
  return state.comments.filter(comment => comment.parentCommentId === parentId)
}

export const getProjectById = (state: RootState, id: number) => {
  return state.projects.projects.find(project => project.id === id)
}
