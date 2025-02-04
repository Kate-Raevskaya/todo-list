import { getNextId } from "../hepers/get-next-id.ts"
import type { Comment } from "../model/projects.types.ts"

export const addComment = (comment: Comment): number => {
  const commentsData = localStorage.getItem("comments")
  if (commentsData) {
    const comments = JSON.parse(commentsData)
    const nextId = getNextId(comments)
    comment.id = nextId
    comments.push(comment)
    localStorage.setItem("comments", JSON.stringify(comments))

    return nextId
  } else {
    const comments: Comment[] = [comment]
    comment.id = 0
    localStorage.setItem("comments", JSON.stringify(comments))

    return 0
  }
}

export const getCommentForTask = (taskId: number): Comment[] => {
  const commentsData = localStorage.getItem("comments")
  if (!commentsData) {
    return []
  }
  return JSON.parse(commentsData).filter(
    (comment: Comment) => taskId === comment.taskId,
  )
}

export const deleteTaskComment = (taskId: number): void => {
  const commentsData = localStorage.getItem("comments")
  if (commentsData) {
    const comments = JSON.parse(commentsData)
    localStorage.setItem(
      "comments",
      JSON.stringify(
        comments.filter((comment: Comment) => comment.taskId !== taskId),
      ),
    )
  }
}
