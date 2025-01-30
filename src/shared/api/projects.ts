import { projects } from "../model/projects.ts"
import type { Project, Task } from "../model/projects.types.ts"

export const getAllProjects = () => {
  return projects
}

export const getProject = (id: number): Project => {
  const project = projects.find(p => p.id === id)
  if (!project) {
    throw new Error("projects not found")
  }
  return project
}

export const getTasks = (id: number): Task[] => {
  const project = getProject(id)
  return project.tasks
}
