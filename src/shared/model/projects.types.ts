export type Project = {
  id: number
  name: string
  tasks: Task[]
}

export type Task = {
  id: number | string
  title: string
  description: string
  createdDate: string
  timeInProgress: string
  endDate: string
  priority: "low" | "medium" | "high"
  files: TaskFile[]
  currentStatus: "queue" | "done" | "development"
  subTasks: Task[]
  comments: Comment[]
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
  replies: Comment[]
}
