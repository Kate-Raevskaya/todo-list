import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux"

import { commentsReducer } from "./commentsSlice.ts"
import { projectsMiddleware } from "./middlewares.ts"
import { projectsReducer } from "./projectsSlice.ts"
import { tasksReducer } from "./tasksSlice.ts"

const middlewares = [projectsMiddleware]

const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
  comments: commentsReducer,
})

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares),
)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
