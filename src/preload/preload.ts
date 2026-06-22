import { contextBridge, ipcRenderer } from 'electron';
import { Task } from '../shared/domain/entities';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  tasks: {
    fetchAll: (options?: { filterType?: 'status' | 'date'; value?: any }) =>
      ipcRenderer.invoke('tasks:fetchAll', options),

    create: (task: Omit<Task, 'id'>) =>
      ipcRenderer.invoke('tasks:create', task),

    update: (id: number, updates: Partial<Task>) =>
      ipcRenderer.invoke('tasks:update', id, updates),

    delete: (id: number) =>
      ipcRenderer.invoke('tasks:delete', id),

    deleteTasks: (ids: number[]) =>
      ipcRenderer.invoke('tasks:deleteTasks', ids)
  }
});

// Thêm kiểu cho TypeScript support
declare global {
  interface Window {
    api: {
      tasks: {
        fetchAll: (options?: { filterType?: 'status' | 'date'; value?: any }) => Promise<Task[]>;
        create: (task: Omit<Task, 'id'>) => Promise<Task>;
        update: (id: number, updates: Partial<Task>) => Promise<boolean>;
        delete: (id: number) => Promise<boolean>;
        deleteTasks: (ids: number[]) => Promise<boolean>;
      };
    };
  }
}