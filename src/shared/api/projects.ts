import type { Project } from "../model/projects.types.ts"

export const addProject = (project: Project): void => {
  const projectsData = localStorage.getItem("projects")
  if (projectsData) {
    const projects = JSON.parse(projectsData)
    projects.push(project)
    localStorage.setItem("projects", JSON.stringify(projects))
  } else {
    const projects: Project[] = [project]
    localStorage.setItem("projects", JSON.stringify(projects))
  }
}

export const getAllProjects = (): Project[] => {
  const projects = localStorage.getItem("projects")
  if (!projects) {
    return []
  }
  return JSON.parse(projects)
}
