// src/main/infrastructure/database/sqlite.ts
import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    // Đường dẫn database
    const dbPath = !app.isPackaged
      ? path.join(process.cwd(), 'database.sqlite')
      : path.join(app.getPath('userData'), 'database.sqlite');

    console.log('📁 Database path:', dbPath);

    // Tạo thư mục nếu chưa có
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Kết nối database
    db = new Database(dbPath);
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

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}