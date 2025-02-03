export type Project = {
  id: number
  name: string
}

export type Status = "queue" | "done" | "development"

export type Task = {
  id: number
  projectId: number
  title: string
  description: string
  createdDate: string
  timeInProgress: string
  endDate: string
  priority: "low" | "medium" | "high"
  files: TaskFile[]
  currentStatus: Status
  subTasks: number[]
}

export type TaskFile = {
  id: string
  name: string
  size: number
  type: string
}

export type Comment = {
  id: number
  taskId: number
  parentCommentId: number | null
  text: string
  date: string
  author: string
}
