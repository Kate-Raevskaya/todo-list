import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { setCurrent } from "../../../../app/projectsSlice.ts"
import { useAppDispatch } from "../../../../shared/hooks/store-hooks.ts"
import { Options } from "../Options/Options.tsx"
import { TodoTable } from "../TodoTable/TodoTable.tsx"

const TodoPage = () => {
  const { projectId = "" } = useParams()
  const id = +projectId
  const [filter, setFilter] = useState<string>("")
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrent(id))
  }, [])

  return (
    <div>
      <Options onFilterChanged={setFilter} />
      <TodoTable projectId={id} filter={filter} />
    </div>
  )
}

export default TodoPage
