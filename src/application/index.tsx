import "@babel/polyfill";

import { app, BrowserWindow } from "electron";
import { join } from "path";
import { format } from "url";

const createWindow: () => void =
  (): void => {
    const win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
    win.loadURL(format({
      pathname: join(__dirname, "../website/index.html"),
      protocol: "file:",
      slashes: true,
    }));
  };

app.on("ready", createWindow);
