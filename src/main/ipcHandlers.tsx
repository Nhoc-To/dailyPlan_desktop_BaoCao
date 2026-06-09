import { ipcMain } from 'electron';
import { RepositoryFactory } from './infrastructure/repositories/RepositoryFactory';
import { TaskService } from './application/services/TaskService';
import { TaskFilterStrategy, NullFilterStrategy, StatusFilterStrategy, DateFilterStrategy } from './application/strategies/TaskFilterStrategy';

const taskRepo = RepositoryFactory.getTaskRepository();
const taskService = new TaskService(taskRepo);

export function registerIpcHandlers() {
  ipcMain.handle('tasks:fetchAll', async (_, options?: { filterType?: 'status' | 'date'; value?: any }) => {
    let strategy: TaskFilterStrategy = new NullFilterStrategy();
    
    if (options?.filterType === 'status') {
      strategy = new StatusFilterStrategy(options.value);
    } else if (options?.filterType === 'date') {
      strategy = new DateFilterStrategy(options.value);
    }
    
    return await taskService.fetchAllTasks(strategy);
  });

  ipcMain.handle('tasks:create', async (_, task) => {
    return await taskService.createNewTask(task);
  });

  ipcMain.handle('tasks:update', async (_, id, updates) => {
    return await taskService.updateExistingTask(id, updates);
  });

  ipcMain.handle('tasks:deleteTasks', async (_, ids:number) => {
    return await taskService.removeTask(ids);
  });
}
