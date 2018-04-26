/**
 * DO NOT MANUALLY EDIT; this file is fully generated.
 *
 * SOURCE<<gen/application/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<JO2Uxo5FJqRw/ghAVr2Q8TPCn5dyd5QgFw+3mJpFayLxQ/oLehCDhofx/zzgZLYqyB8y0MKaqrTsJxNe/ns80w==>>
 */

/* BESPOKE START <<DEPRECATE>> */
import "@babel/polyfill";

import { app, BrowserWindow } from "electron";

app.on(
  "ready",
  (): void => {
    const win: BrowserWindow = new BrowserWindow({width: 800, height: 600});
    win.loadURL("http://127.0.0.1:8080/");
  },
);
/* BESPOKE END <<DEPRECATE>> */
