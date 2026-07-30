// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, 
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
      webSecurity: false
    }
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // 页面加载完成后显示窗口
  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
