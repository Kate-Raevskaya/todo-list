import type { Project } from "../shared/model/projects.types.ts"

export type ProjectAction =
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: number }
  | { type: "INITIALIZE_PROJECTS"; payload: Project[] }
  | { type: "SET_CURRENT"; payload: number }

type State = {
  projects: Project[]
  currentProject: number | null
}

export const ADD_PROJECT = "ADD_PROJECT"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const INITIALIZE_PROJECTS = "INITIALIZE_PROJECTS"
export const SET_CURRENT = "SET_CURRENT"

export const addProject = (project: Project): ProjectAction => ({
  type: ADD_PROJECT,
  payload: project,
})

export const deleteProject = (id: number): ProjectAction => ({
  type: DELETE_PROJECT,
  payload: id,
})

export const initializeProjects = (projects: Project[]): ProjectAction => ({
  type: INITIALIZE_PROJECTS,
  payload: projects,
})

export const setCurrent = (projectId: number): ProjectAction => ({
  type: SET_CURRENT,
  payload: projectId,
})

const initialState: State = { projects: [], currentProject: null }

export const projectsReducer = (
  state: State = initialState,
  action: ProjectAction,
): State => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        projects: [...state.projects, action.payload],
        currentProject: state.currentProject,
      }
    case DELETE_PROJECT: {
      const newState = state.projects.filter(
        project => project.id !== action.payload,
      )
      return { projects: newState, currentProject: state.currentProject }
    }
    case INITIALIZE_PROJECTS:
      return { projects: action.payload, currentProject: state.currentProject }
    case SET_CURRENT:
      return { projects: state.projects, currentProject: action.payload }
    default:
      return state
  }
}
