import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';

function createWindow() {
  const win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(format({
    pathname: join(__dirname, 'static/index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

app.on('ready', createWindow);
