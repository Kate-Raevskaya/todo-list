import { useState } from "react"
import { useParams } from "react-router"

import { Options } from "../Options/Options.tsx"
import { TodoTable } from "../TodoTable/TodoTable.tsx"

const TodoPage = () => {
  const { projectId = "" } = useParams()
  const id = +projectId
  const [filter, setFilter] = useState<string>("")

  return (
    <div>
      <Options onFilterChanged={setFilter} />
      <TodoTable projectId={id} filter={filter} />
    </div>
  )
}

export default TodoPage
