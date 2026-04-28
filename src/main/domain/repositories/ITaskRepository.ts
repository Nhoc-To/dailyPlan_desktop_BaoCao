import { Task } from '../../../shared/domain/entities';

export interface ITaskRepository {
  createTask(task: Omit<Task, 'id'>): Promise<Task>;
  getTaskById(id: number): Promise<Task | null>;
  getAllTasks(): Promise<Task[]>;
  updateTask(id: number, task: Partial<Task>): Promise<boolean>;
  deleteTask(id: number): Promise<boolean>;
}
