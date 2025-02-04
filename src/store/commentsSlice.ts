import type { Comment } from "../shared/model/projects.types.ts"

type CommentAction =
  | { type: "ADD_COMMENT"; payload: Comment }
  | { type: "INITIALIZE_COMMENTS"; payload: Comment[] }
  | { type: "DELETE_TASK_COMMENTS"; payload: number }

export const ADD_COMMENT = "ADD_COMMENT"
export const INITIALIZE_COMMENTS = "INITIALIZE_COMMENTS"
export const DELETE_TASK_COMMENTS = "DELETE_TASK_COMMENTS"

export const addComment = (comment: Comment): CommentAction => ({
  type: ADD_COMMENT,
  payload: comment,
})

export const initializeComments = (comments: Comment[]): CommentAction => ({
  type: INITIALIZE_COMMENTS,
  payload: comments,
})

export const deleteTaskComments = (taskId: number): CommentAction => ({
  type: DELETE_TASK_COMMENTS,
  payload: taskId,
})

const initialState: Comment[] = []

export const commentsReducer = (
  state: Comment[] = initialState,
  action: CommentAction,
): Comment[] => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload]
    case INITIALIZE_COMMENTS:
      return action.payload
    case DELETE_TASK_COMMENTS:
      return state.filter(comment => comment.taskId! === action.payload)
    default:
      return state
  }
}
