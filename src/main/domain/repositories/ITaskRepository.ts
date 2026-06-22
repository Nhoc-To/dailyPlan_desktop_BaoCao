// src/main/domain/repositories/ITaskRepository.ts
import Database from 'better-sqlite3';
import { getDatabase } from '../../infrastructure/database/sqlite';
import { Task, TaskInfo, TaskUpdates, TaskRepository as ITaskRepository } from '../../application/services/TaskService';

interface TaskRow {
    id: number;
    categoryId: number | null;
    name: string;
    description: string | null;
    repeat: string | null;
    startDate: string;
    endDate: string | null;
    startTime: string | null;
    endTime: string | null;
    tags: string | null;
    color: string | null;
    completedDays: string | null;
    status: number;
}

function mapRowToTask(row: TaskRow): Task {
    return {
        id: row.id,
        categoryId: row.categoryId,
        name: row.name,
        description: row.description,
        repeat: row.repeat,
        startDate: row.startDate,
        endDate: row.endDate,
        startTime: row.startTime,
        endTime: row.endTime,
        tags: row.tags ? JSON.parse(row.tags) : [],
        color: row.color,
        completedDays: row.completedDays ?? '[]',
        status: row.status === 1,
        title: ''
    };
}

export class TaskRepository implements ITaskRepository {
    private db: Database.Database;

    constructor() {
        this.db = getDatabase();
    }

    // Lấy tất cả tasks
    findAll(): Task[] {
        const stmt = this.db.prepare(`
      SELECT 
        id, categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      FROM Tasks 
      ORDER BY startDate DESC
    `);
        return stmt.all().map((row) => mapRowToTask(row as TaskRow));
    }

    // Tìm task theo id
    findById(id: number | string): Task | null {
        const stmt = this.db.prepare(`
      SELECT 
        id, categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      FROM Tasks 
      WHERE id = ?
    `);
        const row = stmt.get(id) as TaskRow | undefined;
        return row ? mapRowToTask(row) : null;
    }

    // Tạo task mới
    create(task: TaskInfo): Task {
        const stmt = this.db.prepare(`
      INSERT INTO Tasks (
        categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const result = stmt.run(
            task.categoryId ?? null,
            task.name,
            task.description ?? null,
            task.repeat ?? null,
            task.startDate,
            task.endDate ?? null,
            task.startTime ?? null,
            task.endTime ?? null,
            task.tags ? JSON.stringify(task.tags) : null,
            task.color ?? null,
            task.completedDays ?? '[]',
            task.status ? 1 : 0
        );
        return { ...task, id: result.lastInsertRowid as number };
    }

    // Cập nhật task
    update(id: number | string, updates: TaskUpdates): Task | null {
        const fields: string[] = [];
        const values: unknown[] = [];

        const fieldMap: [string, string, (v: unknown) => unknown][] = [
            ['categoryId', 'categoryId = ?', (v) => v],
            ['name', 'name = ?', (v) => v],
            ['description', 'description = ?', (v) => v],
            ['repeat', 'repeat = ?', (v) => v],
            ['startDate', 'startDate = ?', (v) => v],
            ['endDate', 'endDate = ?', (v) => v],
            ['startTime', 'startTime = ?', (v) => v],
            ['endTime', 'endTime = ?', (v) => v],
            ['tags', 'tags = ?', (v) => JSON.stringify(v)],
            ['color', 'color = ?', (v) => v],
            ['completedDays', 'completedDays = ?', (v) => v],
            ['status', 'status = ?', (v) => (v ? 1 : 0)],
        ];

        for (const [key, sql, transform] of fieldMap) {
            if (updates[key] !== undefined) {
                fields.push(sql);
                values.push(transform(updates[key]));
            }
        }

        if (fields.length === 0) return null;

        values.push(id);
        const stmt = this.db.prepare(`
      UPDATE Tasks 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `);
        stmt.run(...values);
        return this.findById(id);
    }

    // Xóa task
    delete(id: number | string): boolean {
        const stmt = this.db.prepare('DELETE FROM Tasks WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }

    // Lấy tasks theo khoảng thời gian
    findByDateRange(startDate: string, endDate: string): Task[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Tasks 
      WHERE (startDate BETWEEN ? AND ?) 
         OR (endDate BETWEEN ? AND ?)
         OR (startDate <= ? AND (endDate >= ? OR endDate IS NULL))
      ORDER BY startDate ASC
    `);
        return stmt
            .all(startDate, endDate, startDate, endDate, startDate, startDate)
            .map((row) => mapRowToTask(row as TaskRow));
    }

    // Toggle complete status cho một ngày cụ thể
    toggleCompleteDay(id: number | string, date: string): boolean {
        const task = this.findById(id);
        if (!task) return false;

        let completedDays: string[] = [];
        try {
            completedDays = JSON.parse((task.completedDays as string) ?? '[]');
        } catch {
            completedDays = [];
        }

        if (completedDays.includes(date)) {
            completedDays = completedDays.filter((d) => d !== date);
        } else {
            completedDays.push(date);
        }

        // Kiểm tra nếu complete hết tất cả các ngày
        const start = new Date(task.startDate as string);
        const end = new Date((task.endDate as string) ?? (task.startDate as string));
        const totalDays =
            Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
        const status = completedDays.length >= totalDays;

        this.update(id, {
            completedDays: JSON.stringify(completedDays),
            status,
        });

        return true;
    }
}

export { Task };
