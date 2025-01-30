import { useParams } from "react-router"

import { Options } from "../Options/Options.tsx"
import { TodoTable } from "../TodoTable/TodoTable.tsx"

const TodoPage = () => {
  const { projectId = "" } = useParams()
  const id = +projectId

  return (
    <div>
      <Options />
      <TodoTable projectId={id} />
    </div>
  )
}

export default TodoPage
