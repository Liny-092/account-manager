// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // 先隐藏窗口，防止加载时出现白屏闪烁
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 关键：无需修改前端代码即可使用 localStorage 和全局变量
      webSecurity: false       // 允许本地文件协议，避免跨域限制
    }
  });

  // 加载 Vue 打包后的 dist/index.html
  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // 页面加载完成后显示窗口，提升体验
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
