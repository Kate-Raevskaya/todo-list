import { combineReducers, compose, createStore } from "redux"

import { tasksReducer } from "./tasksSlice.ts"

const rootReducer = combineReducers({
  tasks: tasksReducer,
})

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose

export const store = createStore(rootReducer, composeEnhancers)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
