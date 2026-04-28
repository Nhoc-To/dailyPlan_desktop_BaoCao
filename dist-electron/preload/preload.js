"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('api', {
    tasks: {
        fetchAll: (options) => electron_1.ipcRenderer.invoke('tasks:fetchAll', options),
        create: (task) => electron_1.ipcRenderer.invoke('tasks:create', task),
        update: (id, updates) => electron_1.ipcRenderer.invoke('tasks:update', id, updates),
        delete: (id) => electron_1.ipcRenderer.invoke('tasks:delete', id)
    }
});
