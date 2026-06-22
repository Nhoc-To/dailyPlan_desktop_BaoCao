// src/main/infrastructure/repositories/RepositoryFactory.ts
import { TaskRepository as ITaskRepository } from '../../application/services/TaskService';
import { SqliteTaskRepository } from './SqliteTaskRepository';

export class RepositoryFactory {
    // Lấy ra Repository tuỳ thuộc cấu hình tương lai (nếu đổi sang dùng MongoDB/JSON, cấu hình trong Factory này)
    static getTaskRepository(): ITaskRepository {
        return new SqliteTaskRepository();
    }
}