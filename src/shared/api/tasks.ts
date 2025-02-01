import type { Status, Task } from "../model/projects.types.ts"

export const getProjectTasks = (projectId: number): Task[] => {
  const tasksData = localStorage.getItem("tasks")
  if (!tasksData) {
    return []
  }
  return JSON.parse(tasksData).filter(
    (task: Task) => projectId === task.projectId,
  )
}

export const addTask = (task: Task) => {
  const tasksData = localStorage.getItem("tasks")
  if (tasksData) {
    const tasks = JSON.parse(tasksData)
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } else {
    const tasks: Task[] = [task]
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

export const deleteTask = (id: number): void => {
  const tasksData = localStorage.getItem("tasks")
  if (tasksData) {
    const tasks = JSON.parse(tasksData)
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task: Task) => task.id !== id)),
    )
  }
}
export const updateTask = (task: Task): void => {
  const tasksData = localStorage.getItem("tasks")
  if (tasksData) {
    const tasks = JSON.parse(tasksData)
    const index = tasks.findIndex((t: Task) => t.id === task.id)
    tasks[index] = task
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

export const moveTask = (
  idTo: number,
  idFrom: number,
  statusTask: Status,
): void => {
  const tasksData = localStorage.getItem("tasks")
  if (tasksData) {
    const tasks = JSON.parse(tasksData)
    const indexTo = tasks.findIndex((t: Task) => t.id === idTo)
    const indexFrom = tasks.findIndex((t: Task) => t.id === idFrom)
    tasks[indexFrom].currentStatus = statusTask
    const tem = tasks[indexTo]
    tasks[indexTo] = tasks[indexFrom]
    tasks[indexFrom] = tem
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}
