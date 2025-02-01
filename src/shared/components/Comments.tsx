import { useState } from "react"
import { shallowEqual } from "react-redux"

import { addComment } from "../../app/commentsSlice.ts"
import { getAllComments } from "../../app/selectors.ts"
import { useAppDispatch, useAppSelector } from "../hooks/store-hooks.ts"
import cls from "./Comments.module.sass"

type Props = {
  taskId: number
  parentId: number | null
}

export const Comments = ({ taskId, parentId }: Props) => {
  const [commentText, setCommentText] = useState<string>("")
  const dispatch = useAppDispatch()
  const comments = useAppSelector(
    state => getAllComments(state, parentId),
    shallowEqual,
  )

  const handleCommentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(e.target.value)
  }

  const addNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newComment = {
      id: -1,
      taskId: taskId,
      parentCommentId: parentId,
      text: commentText,
      date: new Date().toISOString().split("T")[0],
      author: "Аноним",
    }
    dispatch(addComment(newComment))
    setCommentText("")
  }

  return (
    <div className={cls.container}>
      <div>
        {comments.length > 0
          ? comments.map(comment => (
              <div key={comment.id}>
                <div className={cls.comment}>
                  <p>
                    <span>{comment.author}</span> ({comment.date}):
                  </p>
                  <p>{comment.text}</p>
                </div>
                <div className={cls.replies}>
                  <Comments taskId={taskId} parentId={comment.id} />
                </div>
              </div>
            ))
          : !parentId && <p>Нет комментариев</p>}
      </div>
      <form onSubmit={addNewComment}>
        {/*todo добавить кнопку ответить если это коммент к комменту*/}
        <textarea
          name="text"
          placeholder="add comment"
          value={commentText}
          onChange={handleCommentTextChange}
        />
        <button type="submit">Опубликовать</button>
      </form>
    </div>
  )
}
