/**
  * This file is partially generated; only edit bespoke sections.
  *
  * SOURCE<<gen/application/index.ts::module>>
  * BESPOKE<<DEPRECATE>>
  * SIGNED<<X5wik9iu7i14RHhfc1dT1JUgQ/SOSYhn9DXbe+SLZGWwapwO4Bs034IyLdu4sm8ZydpVrAExOzQbHvrYlCo/Lg==>>
  */

import "@babel/polyfill";

import { app, BrowserWindow } from "electron";

/* BESPOKE START <<DEPRECATE>> */
app.on(
  "ready",
  (): void => {
    const win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
    win.loadURL("http://127.0.0.1:8080/");
  },
);
/* BESPOKE END <<DEPRECATE>> */
