import { getNextId } from "../hepers/get-next-id.ts"
import type { Project } from "../model/projects.types.ts"

export const addProject = (project: Project): number => {
  const projectsData = localStorage.getItem("projects")
  if (projectsData) {
    const projects = JSON.parse(projectsData)
    const nextId = getNextId(projects)
    project.id = nextId
    projects.push(project)
    localStorage.setItem("projects", JSON.stringify(projects))
    return nextId
  } else {
    const projects: Project[] = [project]
    project.id = 0
    localStorage.setItem("projects", JSON.stringify(projects))
    return 0
  }
}

export const getAllProjects = (): Project[] => {
  const projects = localStorage.getItem("projects")
  if (!projects) {
    return []
  }
  return JSON.parse(projects)
}
