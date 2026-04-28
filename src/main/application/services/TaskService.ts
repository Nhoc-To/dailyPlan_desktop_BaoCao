import { Task } from '../../../shared/domain/entities';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { NullFilterStrategy, TaskFilterStrategy } from '../strategies/TaskFilterStrategy';

export class TaskService {
  constructor(private repository: ITaskRepository) {}

  async fetchAllTasks(strategy: TaskFilterStrategy = new NullFilterStrategy()): Promise<Task[]> {
    const allTasks = await this.repository.getAllTasks();
    return strategy.filter(allTasks); // Áp dụng Strategy pattern để lọc dữ liệu nếu cần
  }

  async fetchTaskDetails(id: number): Promise<Task | null> {
    return this.repository.getTaskById(id);
  }

  async createNewTask(taskInfo: Omit<Task, 'id'>): Promise<Task> {
    // Các logic validation có thể đặt ở đây
    return this.repository.createTask(taskInfo);
  }

  async updateExistingTask(id: number, updates: Partial<Task>): Promise<boolean> {
    return this.repository.updateTask(id, updates);
  }

  async removeTask(id: number): Promise<boolean> {
    return this.repository.deleteTask(id);
  }
}
