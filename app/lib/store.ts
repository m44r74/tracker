import { create } from 'zustand';
import { Task, User, Project } from '../types/types';
import { fetchTasks, addTaskToDB, updateTaskInDB, deleteTaskInDB } from '../api/api';
type Status = "todo" | "inProgress" | "done";

interface StoreState {
  tasks: Task[];
  users: User[];
  projects: Project[];
  currentUser: User | null;

  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void,


  loadTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;

  moveTaskToColumn: (taskId: string, newColumn: Status) => void
  updateTaskTime: (taskId: string, time: number) => void;
  setCurrentUser: (user: User) => void;
}

const initialUsers: User[] = [
  { id: '1', name: 'Kasia', email: 'ty@example.com', role: 'admin' },
  { id: '2', name: 'Mateusz', email: 'kasia@example.com', role: 'user' },
  { id: '3', name: 'Admin', email: 'marek@example.com', role: 'user' },
];

const initialProjects: Project[] = [
  { id: '1', name: 'Projekt A' },
  { id: '2', name: 'Projekt B' },
  { id: '3', name: 'Projekt C' },
];

const useStore = create<StoreState>((set, get) => ({
  tasks: [],
  users: initialUsers,
  projects: initialProjects,
  currentUser: initialUsers[0],

  setTasks: (action) =>
  set((state) => ({
    tasks: typeof action === 'function' ? action(state.tasks) : action,
  })),


  loadTasks: async () => {
    try {
      const tasks = await fetchTasks();
      set({ tasks });
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  },

  addTask: async (task) => {
    try {
      const savedTask = await addTaskToDB(task);
      set((state) => ({ tasks: [...state.tasks, savedTask] }));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  updateTask: async (task) => {
    try {
      const updatedTask = await updateTaskInDB(task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  },

  deleteTask: async (taskId) => {
    try {
      await deleteTaskInDB(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  },

  moveTaskToColumn: (taskId, newColumn) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newColumn } : task
      ),
    })),

  updateTaskTime: (taskId, time) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, elapsedTime: time } : task
      ),
    })),

  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useStore;
