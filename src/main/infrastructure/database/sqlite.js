"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = getDatabase;
exports.closeDatabase = closeDatabase;
// src/main/infrastructure/database/sqlite.ts
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
let db = null;
function getDatabase() {
    if (!db) {
        // Đường dẫn database
        const dbPath = !electron_1.app.isPackaged
            ? path_1.default.join(process.cwd(), 'database.sqlite')
            : path_1.default.join(electron_1.app.getPath('userData'), 'database.sqlite');
        console.log('📁 Database path:', dbPath);
        // Tạo thư mục nếu chưa có
        const dbDir = path_1.default.dirname(dbPath);
        if (!fs_1.default.existsSync(dbDir)) {
            fs_1.default.mkdirSync(dbDir, { recursive: true });
        }
        // Kết nối database
        db = new better_sqlite3_1.default(dbPath);
        db.pragma('foreign_keys = ON');
        // Tạo bảng
        db.exec(`
      CREATE TABLE IF NOT EXISTS Categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        color TEXT,
        status INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS Tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoryId INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        repeat TEXT,
        startDate TEXT NOT NULL,
        endDate TEXT,
        startTime TEXT,
        endTime TEXT,
        tags TEXT,
        color TEXT,
        completedDays TEXT DEFAULT '[]',
        status INTEGER DEFAULT 0,
        FOREIGN KEY (categoryId) REFERENCES Categories (id)
      );
    `);
        // Thêm dữ liệu mẫu cho Categories
        const insertCategory = db.prepare(`
      INSERT OR IGNORE INTO Categories (id, name, color, status) VALUES (?, ?, ?, ?)
    `);
        insertCategory.run(1, 'Học tập', '#ff5252', 1);
        insertCategory.run(2, 'Công việc', '#448aff', 1);
        insertCategory.run(3, 'Giải trí', '#69f0ae', 1);
        console.log('✅ Database initialized');
    }
    return db;
}
function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}
