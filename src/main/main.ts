import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import registerIpcHandlers from './ipcHandlers';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      // Vô hiệu hóa nodeIntegration để bảo mật
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Trong chế độ dev, load URL Vite
  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Trong production, load file html build ra
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();
  console.log('đã tạo cửa sổ mới');
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
