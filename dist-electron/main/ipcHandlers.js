"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIpcHandlers = setupIpcHandlers;
// src/main/ipcHandlers.ts
const electron_1 = require("electron");
const SqliteTaskRepository_1 = require("./infrastructure/repositories/SqliteTaskRepository");
const taskRepo = new SqliteTaskRepository_1.SqliteTaskRepository();
function setupIpcHandlers() {
    electron_1.ipcMain.handle('tasks:fetchAll', async () => {
        return taskRepo.findAll();
    });
    electron_1.ipcMain.handle('tasks:create', async (event, task) => {
        return taskRepo.create(task);
    });
    electron_1.ipcMain.handle('tasks:update', async (event, id, updates) => {
        return taskRepo.update(id, updates);
    });
    electron_1.ipcMain.handle('tasks:delete', async (event, id) => {
        return taskRepo.delete(id);
    });
}
// THÊM default export
exports.default = setupIpcHandlers;
