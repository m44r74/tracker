export interface Task {
  id: string
  projectId: string
  text: string
  assignedTo: {
    id: string
    name: string
  } | null
  description: string
  dueDate: string
  priority: string
  status: Status
  elapsedTime: number
}

export interface Project {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export type Status = 'todo' | 'inProgress' | 'blocked' | 'done'

export type ColumnData = {
  [column: string]: Task[];
};
