import type { Comment } from "../shared/model/projects.types.ts"

type CommentAction =
  | { type: "ADD_COMMENT"; payload: Comment }
  | { type: "DELETE_COMMENT"; payload: number }
  | { type: "INITIALIZE_COMMENTS"; payload: Comment[] }

const ADD_COMMENT = "ADD_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const INITIALIZE_COMMENTS = "INITIALIZE_COMMENTS"

export const addComment = (comment: Comment): CommentAction => ({
  type: ADD_COMMENT,
  payload: comment,
})

export const deleteComment = (id: number): CommentAction => ({
  type: DELETE_COMMENT,
  payload: id,
})

export const initializeComments = (comments: Comment[]): CommentAction => ({
  type: INITIALIZE_COMMENTS,
  payload: comments,
})

const initialState: Comment[] = []

export const commentsReducer = (
  state: Comment[] = initialState,
  action: CommentAction,
): Comment[] => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload]
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.payload)
    case INITIALIZE_COMMENTS:
      return action.payload
    default:
      return state
  }
}
