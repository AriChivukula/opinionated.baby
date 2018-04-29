/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/application/index.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<4daoNMwtz3BC9HjR2W0Hb46N/H35VygcDVojt95aJ8lVuJDF4n1OeD2QZZsIlpiyFOjq7ZDFeCvtEG7MAx8faw==>>
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
