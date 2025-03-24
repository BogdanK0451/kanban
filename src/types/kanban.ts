export interface Task {
  title: string
  description: string
  completed: boolean
  due: Date
}

export interface Column {
  title: string
  tasks: Task[]
}

export interface Kanban {
  columns: Column[]
}
