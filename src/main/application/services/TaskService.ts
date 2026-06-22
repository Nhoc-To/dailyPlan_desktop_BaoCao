import { NullFilterStrategy, TaskFilterStrategy } from "../strategies/TaskFilterStrategy";

export interface TaskInfo {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface Task extends TaskInfo {
  id: string | number;
}

export interface TaskUpdates extends Partial<TaskInfo> {
  [key: string]: unknown;
}

export interface TaskRepository {
  findAll(): Task[];
  findById(id: string | number): Task | null;
  create(taskInfo: TaskInfo): Task;
  update(id: string | number, updates: TaskUpdates): Task | null;
  delete(id: string | number): boolean;
}

export class TaskService {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async fetchAllTasks(strategy: TaskFilterStrategy = new NullFilterStrategy()): Promise<Task[]> {
    const allTasks = this.repository.findAll();
    return strategy.filter(allTasks); // Áp dụng Strategy pattern để lọc dữ liệu nếu cần
  }

  async fetchTaskDetails(id: string | number): Promise<Task | null> {
    return this.repository.findById(id);
  }

  async createNewTask(taskInfo: TaskInfo): Promise<Task> {
    // Các logic validation có thể đặt ở đây
    return this.repository.create(taskInfo);
  }

  async updateExistingTask(id: string | number, updates: TaskUpdates): Promise<Task | null> {
    return this.repository.update(id, updates);
  }

  async removeTask(id: string | number): Promise<boolean> {
    return this.repository.delete(id);
  }
}