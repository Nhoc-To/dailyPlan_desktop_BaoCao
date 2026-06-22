// src/main/ipcHandlers.ts
import { ipcMain } from 'electron';
import { RepositoryFactory } from './infrastructure/repositories/RepositoryFactory';

const taskRepo = RepositoryFactory.getTaskRepository();

export function setupIpcHandlers() {
  ipcMain.handle('tasks:fetchAll', async () => {
    return taskRepo.findAll();
  });

  ipcMain.handle('tasks:create', async (event, task) => {
    return taskRepo.create(task);
  });

  ipcMain.handle('tasks:update', async (event, id, updates) => {
    return taskRepo.update(id, updates);
  });

  ipcMain.handle('tasks:delete', async (event, id) => {
    return taskRepo.delete(id);
  });
}

// THÊM default export
export default setupIpcHandlers;