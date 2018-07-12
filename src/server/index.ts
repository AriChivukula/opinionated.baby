/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::Index>>
 * BESPOKE<<main, handler>>
 * SIGNED<<4zMZbzOp/z/0yhs2rcJGxqHS6WKofygAF4d5we/BydKyQZIWgmhLr4z811sktN3Pnauy6VyOv7MJvzwyTKE+kw==>>
 */

import "@babel/polyfill";

import * as lambda from "aws-serverless-express";
import {
  json,
  urlencoded,
} from "body-parser";
import cors from "cors";
import express from "express";
import bearer from "express-bearer-token";
import helmet from "helmet";
import * as Rollbar from "rollbar";

import {
  graphQL,
} from "./server";

const app: express.Express = express();

let didSetup: boolean = false;

/* BESPOKE START <<main>> */
app.use(cors(), helmet(), bearer(), json(), urlencoded({ extended: true }));

app.use((req: express.Request, res: express.Response, next: () => void): void => {
  if (!didSetup) {
    didSetup = true;
  }
  next();
});

app.use("/graphql", graphQL);

app.use((new Rollbar({
  accessToken: process.env.TF_VAR_ROLLBAR_SERVER,
  verbose: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
})).errorHandler());
/* BESPOKE END <<main>> */

export function handler(
  event: object,
  context: object,
): void {
  /* BESPOKE START <<handler>> */
  lambda.proxy(
    lambda.createServer(
      app,
      undefined,
      [
        "application/octet-stream",
        "font/eot",
        "font/opentype",
        "font/otf",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
      ],
    ),
    event,
    // @ts-ignore
    context,
  );
  /* BESPOKE END <<handler>> */
}
