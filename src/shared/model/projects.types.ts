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
  comments: number[]
}

export type TaskFile = {
  id: number
  name: string
  url: string
}

export type Comment = {
  id: number
  text: string
  date: string
  author: string
  replies: number[]
}
