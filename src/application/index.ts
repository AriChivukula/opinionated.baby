import "@babel/polyfill";

import { app, BrowserWindow } from "electron";

app.on(
  "ready",
  (): void => {
    const win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
    win.loadURL("http://127.0.0.1:8080/");
  },
);
