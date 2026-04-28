import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { SqliteTaskRepository } from './SqliteTaskRepository';

export class RepositoryFactory {
  // Lấy ra Repository tuỳ thuộc cấu hình tương lai (nếu đổi sang dùng MongoDB/JSON, cấu hình trong Factory này)
  public static getTaskRepository(): ITaskRepository {
    return new SqliteTaskRepository();
  }
}
