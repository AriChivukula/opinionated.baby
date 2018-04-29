/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/application/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<d1Eay9HK9PrsLVNl2NoKaCQ+ZqifYE0zX9xAi6SV8bb9nmQjNj+gJoRu9Asmor0fWDyOpgcG68TgEPEodJq83Q==>>
 */

import "@babel/polyfill";

import {
  app,
  BrowserWindow,
} from "electron";


/* BESPOKE START <<DEPRECATE>> */
app.on(
  "ready",
  (): void => {
    const win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
    win.loadURL("http://127.0.0.1:8080/");
  },
);
/* BESPOKE END <<DEPRECATE>> */
