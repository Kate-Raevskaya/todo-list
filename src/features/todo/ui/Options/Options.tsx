import { NavLink } from "react-router"

export const Options = () => {
  return (
    <div>
      <NavLink to={"/"}>Back to all projects</NavLink>
      <input type="text" placeholder="Search..." />
      <button>Create new task</button>
    </div>
  )
}
