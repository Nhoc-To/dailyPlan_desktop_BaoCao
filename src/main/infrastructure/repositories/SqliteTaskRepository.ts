// src/main/infrastructure/repositories/SqliteTaskRepository.ts
import { getDatabase } from '../database/sqlite';
import { TaskRepository as ITaskRepository, Task, TaskInfo, TaskUpdates } from '../../application/services/TaskService';
import Database from 'better-sqlite3';

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

export class SqliteTaskRepository implements ITaskRepository {
    private database: Database.Database;

    constructor() {
        this.database = getDatabase();
    }

    findAll(): Task[] {
        const rows = this.database.prepare(`
      SELECT * FROM Tasks ORDER BY startDate DESC
    `).all() as TaskRow[];
        return rows.map((row) => this.mapRowToTask(row));
    }

    findById(id: number | string): Task | null {
        const row = this.database.prepare('SELECT * FROM Tasks WHERE id = ?').get(id) as TaskRow | undefined;
        if (!row) return null;
        return this.mapRowToTask(row);
    }

    create(task: TaskInfo): Task {
        const stmt = this.database.prepare(`
      INSERT INTO Tasks (
        categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const result = stmt.run(
            task.categoryId || null,
            task.title || task.name, // Use title or name
            task.description || null,
            task.repeat || null,
            task.startDate,
            task.endDate || null,
            task.startTime || null,
            task.endTime || null,
            task.tags ? JSON.stringify(task.tags) : null,
            task.color || null,
            task.completedDays || '[]',
            task.status ? 1 : 0
        );
        return { ...task, id: result.lastInsertRowid as number };
    }

    update(id: number | string, updates: TaskUpdates): Task | null {
        const fields: string[] = [];
        const values: unknown[] = [];

        if (updates.name !== undefined || updates.title !== undefined) {
            fields.push('name = ?');
            values.push(updates.title ?? updates.name);
        }
        if (updates.description !== undefined) {
            fields.push('description = ?');
            values.push(updates.description);
        }
        if (updates.startDate !== undefined) {
            fields.push('startDate = ?');
            values.push(updates.startDate);
        }
        if (updates.endDate !== undefined) {
            fields.push('endDate = ?');
            values.push(updates.endDate);
        }
        if (updates.startTime !== undefined) {
            fields.push('startTime = ?');
            values.push(updates.startTime);
        }
        if (updates.endTime !== undefined) {
            fields.push('endTime = ?');
            values.push(updates.endTime);
        }
        if (updates.color !== undefined) {
            fields.push('color = ?');
            values.push(updates.color);
        }
        if (updates.completedDays !== undefined) {
            fields.push('completedDays = ?');
            values.push(updates.completedDays);
        }
        if (updates.status !== undefined) {
            fields.push('status = ?');
            values.push(updates.status ? 1 : 0);
        }

        if (fields.length === 0) return null;

        values.push(id);
        this.database.prepare(`UPDATE Tasks SET ${fields.join(', ')} WHERE id = ?`).run(...values);
        return this.findById(id);
    }

    delete(id: number | string): boolean {
        const result = this.database.prepare('DELETE FROM Tasks WHERE id = ?').run(id);
        return result.changes > 0;
    }

    findByDateRange(startDate: string, endDate: string): Task[] {
        const rows = this.database.prepare(`
      SELECT * FROM Tasks 
      WHERE startDate >= ? AND startDate <= ? 
      ORDER BY startDate DESC
    `).all(startDate, endDate) as TaskRow[];
        return rows.map((row) => this.mapRowToTask(row));
    }

    toggleCompleteDay(id: number | string, date: string): boolean {
        const task = this.findById(id);
        if (!task) return false;

        const completedDays: string[] = JSON.parse((task.completedDays as string) || '[]');
        const index = completedDays.indexOf(date);
        if (index > -1) {
            completedDays.splice(index, 1);
        } else {
            completedDays.push(date);
        }
        return this.update(id, { completedDays: JSON.stringify(completedDays) }) !== null;
    }

    private mapRowToTask(row: TaskRow): Task {
        return {
            id: row.id,
            title: row.name, // Map row.name to title which is required by Task
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
            completedDays: row.completedDays || '[]',
            status: row.status === 1,
        };
    }
}
