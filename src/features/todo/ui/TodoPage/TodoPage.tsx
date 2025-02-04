import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router"

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import { setCurrent } from "../../../../store/projectsSlice.ts"
import { getProjectById } from "../../../../store/selectors.ts"
import { Options } from "../Options/Options.tsx"
import { TodoTable } from "../TodoTable/TodoTable.tsx"
import cls from "./TodoPage.module.sass"

const TodoPage = () => {
  const { projectId = "" } = useParams()
  const id = +projectId
  const [filter, setFilter] = useState<string>("")
  const dispatch = useAppDispatch()
  const project = useAppSelector(state => getProjectById(state, id))

  useEffect(() => {
    dispatch(setCurrent(id))
  }, [])

  if (!project) {
    return <Navigate to={"/"} />
  }

  return (
    <div className={cls.container}>
      <Options project={project} onFilterChanged={setFilter} />
      <TodoTable filter={filter} />
    </div>
  )
}

export default TodoPage
