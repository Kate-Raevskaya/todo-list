import type { Status, Task } from "../shared/model/projects.types.ts"

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "INITIALIZE_TASKS"; payload: Task[] }
  | { type: "CLEAR_TASKS"; payload: Task[] }
  | { type: "MOVE_TASK"; payload: { status: Status; from: number; to: number } }

const ADD_TASK = "ADD_TASK"
const DELETE_TASK = "DELETE_TASK"
const EDIT_TASK = "EDIT_TASK"
const INITIALIZE_TASKS = "INITIALIZE_TASKS"
const CLEAR_TASKS = "CLEAR_TASKS"
const MOVE_TASK = "MOVE_TASK"

export const addTask = (task: Task): TaskAction => ({
  type: ADD_TASK,
  payload: task,
})
export const deleteTask = (id: number): TaskAction => ({
  type: DELETE_TASK,
  payload: id,
})
export const editTask = (task: Task): TaskAction => ({
  type: EDIT_TASK,
  payload: task,
})
export const initializeTasks = (tasks: Task[]): TaskAction => ({
  type: INITIALIZE_TASKS,
  payload: tasks,
})
export const clearTask = (tasks: Task[]): TaskAction => ({
  type: CLEAR_TASKS,
  payload: tasks,
})
export const moveTask = (
  status: Status,
  from: number,
  to: number,
): TaskAction => ({
  type: MOVE_TASK,
  payload: {
    status,
    from,
    to,
  },
})

const initialState: Task[] = []

export const tasksReducer = (
  state: Task[] = initialState,
  action: TaskAction,
): Task[] => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload]
    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload)
    case EDIT_TASK:
      return state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task,
      )
    case MOVE_TASK: {
      let newState = [...state]
      newState[action.payload.from].currentStatus = action.payload.status
      const temp = newState[action.payload.from]
      newState[action.payload.from] = newState[action.payload.to]
      newState[action.payload.to] = temp
      return newState
    }
    case INITIALIZE_TASKS:
      return action.payload
    case CLEAR_TASKS:
      return []
    default:
      return state
  }
}
