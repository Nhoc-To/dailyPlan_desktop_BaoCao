import { app, BrowserWindow, } from 'electron';
import { registerIpcHandlers } from './ipcHandlers';
import * as path from 'path';

function createMainWindow() {
  const mainWindow = new BrowserWindow({

    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },

    //chuẩn bị làm titlebar
    // titleBarStyle: 'hidden',
  });
  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  };
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});