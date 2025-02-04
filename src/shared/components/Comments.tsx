import { useState } from "react"
import { shallowEqual } from "react-redux"

import { addComment } from "../../store/commentsSlice.ts"
import { getAllComments } from "../../store/selectors.ts"
import { dateNow } from "../hepers/date-transform.ts"
import { useAppDispatch, useAppSelector } from "../hooks/store-hooks.ts"
import cls from "./Comments.module.sass"

type Props = {
  taskId: number
  parentId: number | null
}

export const Comments = ({ taskId, parentId }: Props) => {
  const [commentText, setCommentText] = useState<string>("")
  const [innerCommentText, setInnerCommentText] = useState<string>("")
  const [isTextarea, setIsTextarea] = useState<boolean>(false)
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

  const handleInnerCommentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInnerCommentText(e.target.value)
  }

  const addNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newComment = {
      id: -1,
      taskId: taskId,
      parentCommentId: parentId,
      text: commentText || innerCommentText,
      date: dateNow(),
      author: "Аноним",
    }
    dispatch(addComment(newComment))
    setCommentText("")
    setInnerCommentText("")
    setIsTextarea(false)
  }

  const repliesToComment = () => {
    setIsTextarea(!isTextarea)
  }

  return (
    <div className={cls.container}>
      <div>
        {parentId !== null && (
          <p onClick={repliesToComment} className={cls.repliesButton}>
            {isTextarea ? `Отменить ответ` : `Ответить `}
          </p>
        )}
        {isTextarea && (
          <form onSubmit={addNewComment}>
            <textarea
              name="text"
              placeholder="Добавьте комментарий..."
              required={true}
              value={innerCommentText}
              onChange={handleInnerCommentTextChange}
            />
            <button className={cls.pubButton} type="submit">
              Ответить
            </button>
          </form>
        )}
        {comments.length > 0
          ? comments.map(comment => (
              <div key={comment.id}>
                <div className={cls.commentDesc}>
                  <p className={cls.author}>
                    {comment.author}
                    <span className={cls.commentDate}>({comment.date})</span>:
                  </p>
                </div>
                <p className={cls.commentText}>{comment.text}</p>
                <div className={cls.replies}>
                  <Comments taskId={taskId} parentId={comment.id} />
                </div>
              </div>
            ))
          : parentId === null && (
              <p className={cls.emptyComments}>Нет комментариев</p>
            )}
      </div>

      {parentId === null && (
        <form onSubmit={addNewComment}>
          <textarea
            name="text"
            placeholder="Добавьте комментарий..."
            value={commentText}
            required={true}
            onChange={handleCommentTextChange}
          />
          <button className={cls.pubButton} type="submit">
            Опубликовать
          </button>
        </form>
      )}
    </div>
  )
}
