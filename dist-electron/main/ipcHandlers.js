"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIpcHandlers = registerIpcHandlers;
const electron_1 = require("electron");
const RepositoryFactory_1 = require("./infrastructure/repositories/RepositoryFactory");
const TaskService_1 = require("./application/services/TaskService");
const TaskFilterStrategy_1 = require("./application/strategies/TaskFilterStrategy");
const taskRepo = RepositoryFactory_1.RepositoryFactory.getTaskRepository();
const taskService = new TaskService_1.TaskService(taskRepo);
function registerIpcHandlers() {
    electron_1.ipcMain.handle('tasks:fetchAll', async (_, options) => {
        let strategy = new TaskFilterStrategy_1.NullFilterStrategy();
        if (options?.filterType === 'status') {
            strategy = new TaskFilterStrategy_1.StatusFilterStrategy(options.value);
        }
        else if (options?.filterType === 'date') {
            strategy = new TaskFilterStrategy_1.DateFilterStrategy(options.value);
        }
        return await taskService.fetchAllTasks(strategy);
    });
    electron_1.ipcMain.handle('tasks:create', async (_, task) => {
        return await taskService.createNewTask(task);
    });
    electron_1.ipcMain.handle('tasks:update', async (_, id, updates) => {
        return await taskService.updateExistingTask(id, updates);
    });
    electron_1.ipcMain.handle('tasks:deleteTasks', async (_, ids) => {
        return await taskService.removeTask(ids);
    });
}
