import type { Middleware } from "redux"

import { addComment, deleteTaskComment } from "../shared/api/comments.ts"
import { addProject } from "../shared/api/projects.ts"
import {
  addTask,
  deleteTask,
  getProjectTasks,
  moveTask,
  updateTask,
} from "../shared/api/tasks.ts"
import {
  ADD_COMMENT,
  DELETE_TASK_COMMENTS,
  deleteTaskComments,
} from "./commentsSlice.ts"
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
    switch (action.type) {
      case ADD_PROJECT:
        action.payload.id = addProject(action.payload)
        break
      case SET_CURRENT:
        store.dispatch(initializeTasks(getProjectTasks(action.payload)))
        break
      case ADD_TASK:
        action.payload.id = addTask(action.payload)
        break
      case DELETE_TASK:
        deleteTask(action.payload)
        store.dispatch(deleteTaskComments(action.payload))
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
        break
      }
      case ADD_COMMENT:
        action.payload.id = addComment(action.payload)
        break
      case DELETE_TASK_COMMENTS:
        deleteTaskComment(action.payload)
    }

    const returnValue = next(action)

    return returnValue
  }
