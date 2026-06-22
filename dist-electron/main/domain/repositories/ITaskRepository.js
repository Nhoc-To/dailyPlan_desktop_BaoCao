"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const sqlite_1 = require("../../infrastructure/database/sqlite");
class TaskRepository {
    db;
    constructor() {
        this.db = (0, sqlite_1.getDatabase)();
    }
    // Lấy tất cả tasks
    findAll() {
        const stmt = this.db.prepare(`
      SELECT 
        id, categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      FROM Tasks 
      ORDER BY startDate DESC
    `);
        const rows = stmt.all();
        return rows.map(row => ({
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
            completedDays: row.completedDays || '[]',
            status: row.status === 1
        }));
    }
    // Tìm task theo id
    findById(id) {
        const stmt = this.db.prepare(`
      SELECT 
        id, categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      FROM Tasks 
      WHERE id = ?
    `);
        const row = stmt.get(id);
        if (!row)
            return null;
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
            completedDays: row.completedDays || '[]',
            status: row.status === 1
        };
    }
    // Tạo task mới
    create(task) {
        const stmt = this.db.prepare(`
      INSERT INTO Tasks (
        categoryId, name, description, repeat, 
        startDate, endDate, startTime, endTime, 
        tags, color, completedDays, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const result = stmt.run(task.categoryId || null, task.name, task.description || null, task.repeat || null, task.startDate, task.endDate || null, task.startTime || null, task.endTime || null, task.tags ? JSON.stringify(task.tags) : null, task.color || null, task.completedDays || '[]', task.status ? 1 : 0);
        return { ...task, id: result.lastInsertRowid };
    }
    // Cập nhật task
    update(id, updates) {
        const fields = [];
        const values = [];
        if (updates.categoryId !== undefined) {
            fields.push('categoryId = ?');
            values.push(updates.categoryId);
        }
        if (updates.name !== undefined) {
            fields.push('name = ?');
            values.push(updates.name);
        }
        if (updates.description !== undefined) {
            fields.push('description = ?');
            values.push(updates.description);
        }
        if (updates.repeat !== undefined) {
            fields.push('repeat = ?');
            values.push(updates.repeat);
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
        if (updates.tags !== undefined) {
            fields.push('tags = ?');
            values.push(JSON.stringify(updates.tags));
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
        if (fields.length === 0)
            return null;
        values.push(id);
        const stmt = this.db.prepare(`
      UPDATE Tasks 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `);
        stmt.run(values);
        return this.findById(id);
    }
    // Xóa task
    delete(id) {
        const stmt = this.db.prepare('DELETE FROM Tasks WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Lấy tasks theo khoảng thời gian
    findByDateRange(startDate, endDate) {
        const stmt = this.db.prepare(`
      SELECT * FROM Tasks 
      WHERE (startDate BETWEEN ? AND ?) 
         OR (endDate BETWEEN ? AND ?)
         OR (startDate <= ? AND (endDate >= ? OR endDate IS NULL))
      ORDER BY startDate ASC
    `);
        const rows = stmt.all(startDate, endDate, startDate, endDate, startDate, startDate);
        return rows.map(row => ({
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
            completedDays: row.completedDays || '[]',
            status: row.status === 1
        }));
    }
    // Toggle complete status cho một ngày cụ thể
    toggleCompleteDay(id, date) {
        const task = this.findById(id);
        if (!task)
            return false;
        let completedDays = [];
        try {
            completedDays = JSON.parse(task.completedDays || '[]');
        }
        catch (e) {
            completedDays = [];
        }
        if (completedDays.includes(date)) {
            completedDays = completedDays.filter(d => d !== date);
        }
        else {
            completedDays.push(date);
        }
        // Kiểm tra nếu complete hết tất cả các ngày
        const start = new Date(task.startDate);
        const end = new Date(task.endDate || task.startDate);
        const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
        const status = completedDays.length >= totalDays;
        this.update(id, {
            completedDays: JSON.stringify(completedDays),
            status
        });
        return true;
    }
}
exports.TaskRepository = TaskRepository;
