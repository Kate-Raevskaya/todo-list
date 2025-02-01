import type { Middleware } from "redux"

import { addProject } from "../shared/api/projects.ts"
import {
  addTask,
  deleteTask,
  getProjectTasks,
  moveTask,
  updateTask,
} from "../shared/api/tasks.ts"
import { ADD_PROJECT, SET_CURRENT } from "./projectsSlice.ts"
import type { RootState } from "./store.ts"
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  MOVE_TASK,
  initializeTasks,
} from "./tasksSlice.ts"

export const projectsMiddleware: Middleware<{}, RootState> =
  store => next => (action: any) => {
    const returnValue = next(action)

    switch (action.type) {
      case ADD_PROJECT:
        addProject(action.payload)
        break
      case SET_CURRENT:
        store.dispatch(initializeTasks(getProjectTasks(action.payload)))
        break
      case ADD_TASK:
        addTask(action.payload)
        break
      case DELETE_TASK:
        deleteTask(action.payload)
        break
      case EDIT_TASK:
        updateTask(action.payload)
        break
      case MOVE_TASK: {
        const tasks = store.getState().tasks
        const indexTo = action.payload.to
        const indexFrom = action.payload.from
        const statusTask = action.payload.status
        const idTo = tasks[indexTo].id
        const idFrom = tasks[indexFrom].id
        moveTask(idTo, idFrom, statusTask)
      }
    }

    return returnValue
  }
