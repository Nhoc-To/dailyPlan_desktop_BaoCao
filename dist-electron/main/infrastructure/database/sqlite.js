"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
class DatabaseConnection {
    static instance;
    constructor() { }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            // Lưu ở appData để không bị mất khi update app, nhưng khi dev thì lưu ở thư mục gốc
            const dbPath = !electron_1.app.isPackaged
                ? path_1.default.join(__dirname, '../../../../database.sqlite')
                : path_1.default.join(electron_1.app.getPath('userData'), 'database.sqlite');
            DatabaseConnection.instance = new better_sqlite3_1.default(dbPath, { verbose: console.log });
            // Init schema
            DatabaseConnection.instance.exec(`
        CREATE TABLE IF NOT EXISTS Categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          color TEXT,
          status BOOLEAN
        );

        CREATE TABLE IF NOT EXISTS Tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          categoryId INTEGER,
          name TEXT,
          description TEXT,
          repeat TEXT,
          startDate TEXT,
          endDate TEXT,
          startTime TEXT,
          endTime TEXT,
          tags TEXT,
          color TEXT,
          completedDays TEXT,
          status BOOLEAN,
          FOREIGN KEY (categoryId) REFERENCES Categories (id)
        );

        CREATE TABLE IF NOT EXISTS Notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          taskId INTEGER,
          content TEXT,
          FOREIGN KEY (taskId) REFERENCES Tasks (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS Reminders (
          id TEXT PRIMARY KEY,
          taskId INTEGER,
          time TEXT,
          FOREIGN KEY (taskId) REFERENCES Tasks (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS Students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT,
          gender TEXT,
          phone TEXT,
          email TEXT,
          status TEXT
        );

        -- Thêm một số Category mặc định (nếu chưa có)
        INSERT INTO Categories (name, color, status)
        SELECT 'Học tập', '#ff5252', 1
        WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE name = 'Học tập');

        INSERT INTO Categories (name, color, status)
        SELECT 'Công việc', '#448aff', 1
        WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE name = 'Công việc');

        INSERT INTO Categories (name, color, status)
        SELECT 'Giải trí', '#69f0ae', 1
        WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE name = 'Giải trí');
      `);
            // Migration cho table Tasks cũ (thêm description và repeat nếu chưa có)
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN description TEXT;");
            }
            catch (e) { /* Column already exists */ }
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN repeat TEXT;");
            }
            catch (e) { /* Column already exists */ }
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN color TEXT;");
            }
            catch (e) { /* Column already exists */ }
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN startTime TEXT;");
            }
            catch (e) { /* Column already exists */ }
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN endTime TEXT;");
            }
            catch (e) { /* Column already exists */ }
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN tags TEXT;");
            }
            catch (e) { /* Column already exists */ }
            try {
                DatabaseConnection.instance.exec("ALTER TABLE Tasks ADD COLUMN completedDays TEXT;");
            }
            catch (e) { /* Column already exists */ }
        }
        return DatabaseConnection.instance;
    }
}
exports.default = DatabaseConnection;
