import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

class DatabaseConnection {
  private static instance: Database.Database;

  private constructor() {}

  public static getInstance(): Database.Database {
    if (!DatabaseConnection.instance) {
      // Lưu ở appData để không bị mất khi update app, nhưng khi dev thì lưu ở thư mục gốc
      const dbPath = !app.isPackaged 
        ? path.join(__dirname, '../../../../database.sqlite')
        : path.join(app.getPath('userData'), 'database.sqlite');
      
      DatabaseConnection.instance = new Database(dbPath, { verbose: console.log });

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
    }
    return DatabaseConnection.instance;
  }
}

export default DatabaseConnection;
