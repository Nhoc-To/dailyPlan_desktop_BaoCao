"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteTaskRepository = void 0;
const sqlite_1 = __importDefault(require("../database/sqlite"));
class SqliteTaskRepository {
    db = sqlite_1.default.getInstance();
    async createTask(task) {
        const stmt = this.db.prepare('INSERT INTO Tasks (categoryId, name, description, repeat, startDate, endDate, startTime, endTime, tags, color, completedDays, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = stmt.run(task.categoryId, task.name, task.description || null, task.repeat || null, task.startDate, task.endDate, task.startTime || null, task.endTime || null, task.tags || null, task.color || null, task.completedDays || '[]', task.status ? 1 : 0);
        return { id: info.lastInsertRowid, ...task };
    }
    async getTaskById(id) {
        const stmt = this.db.prepare('SELECT * FROM Tasks WHERE id = ?');
        const row = stmt.get(id);
        if (!row)
            return null;
        return { ...row, status: Boolean(row.status) };
    }
    async getAllTasks() {
        const stmt = this.db.prepare('SELECT * FROM Tasks');
        const rows = stmt.all();
        return rows.map((row) => ({ ...row, status: Boolean(row.status) }));
    }
    async updateTask(id, task) {
        const fields = Object.keys(task)
            .map((k) => `${k} = ?`)
            .join(', ');
        const values = Object.values(task).map(v => typeof v === 'boolean' ? (v ? 1 : 0) : v);
        if (fields.length === 0)
            return false;
        const stmt = this.db.prepare(`UPDATE Tasks SET ${fields} WHERE id = ?`);
        const info = stmt.run(...values, id);
        return info.changes > 0;
    }
    async deleteTask(id) {
        const stmt = this.db.prepare('DELETE FROM Tasks WHERE id = ?');
        const info = stmt.run(id);
        return info.changes > 0;
    }
    async deleteTasks(ids) {
        if (ids.length === 0) {
            return false;
        }
        const placeholders = ids.map(() => '?').join(',');
        const stmt = this.db.prepare(`DELETE FROM Tasks
     WHERE id IN (${placeholders})`);
        const info = stmt.run(...ids);
        return info.changes > 0;
    }
}
exports.SqliteTaskRepository = SqliteTaskRepository;
