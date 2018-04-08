// @flow

import '@babel/polyfill';
import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

function createWindow() {
  const win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'static/index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

app.on('ready', createWindow);
