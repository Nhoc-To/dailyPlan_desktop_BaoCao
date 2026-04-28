import { Task } from '../../../shared/domain/entities';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import DatabaseConnection from '../database/sqlite';

export class SqliteTaskRepository implements ITaskRepository {
  private db = DatabaseConnection.getInstance();

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const stmt = this.db.prepare(
      'INSERT INTO Tasks (categoryId, name, description, repeat, startDate, endDate, startTime, endTime, tags, color, completedDays, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    const info = stmt.run(
      task.categoryId,
      task.name,
      task.description || null,
      task.repeat || null,
      task.startDate,
      task.endDate,
      task.startTime || null,
      task.endTime || null,
      task.tags || null,
      task.color || null,
      task.completedDays || '[]',
      task.status ? 1 : 0
    );
    return { id: info.lastInsertRowid as number, ...task };
  }

  async getTaskById(id: number): Promise<Task | null> {
    const stmt = this.db.prepare('SELECT * FROM Tasks WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return { ...row, status: Boolean(row.status) };
  }

  async getAllTasks(): Promise<Task[]> {
    const stmt = this.db.prepare('SELECT * FROM Tasks');
    const rows = stmt.all() as any[];
    return rows.map((row) => ({ ...row, status: Boolean(row.status) }));
  }

  async updateTask(id: number, task: Partial<Task>): Promise<boolean> {
    const fields = Object.keys(task)
      .map((k) => `${k} = ?`)
      .join(', ');
    const values = Object.values(task).map(v => typeof v === 'boolean' ? (v ? 1 : 0) : v);
    
    if (fields.length === 0) return false;

    const stmt = this.db.prepare(`UPDATE Tasks SET ${fields} WHERE id = ?`);
    const info = stmt.run(...values, id);
    return info.changes > 0;
  }

  async deleteTask(id: number): Promise<boolean> {
    const stmt = this.db.prepare('DELETE FROM Tasks WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
  }
}
