/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/application/index.ts::module>>
 * BESPOKE<<main>>
 * SIGNED<<Q4kKbsCCVfghhxOaEjGqVw6kl6Q23/bJEey3PpbbQhBZpsS6/zarvn8Ojj3Z1HIagNUliJkvOa4+E/t8O89D4A==>>
 */

import "@babel/polyfill";

import {
  app,
  BrowserWindow,
} from "electron";

/* BESPOKE START <<main>> */
app.on(
  "ready",
  (): void => {
    const win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
    win.loadURL("http://127.0.0.1:8080/");
  },
);
/* BESPOKE END <<main>> */
