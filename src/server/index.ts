/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/index.ts::module>>
 * BESPOKE<<main, handler>>
 * SIGNED<<6b5kVh/2N+cJEEFsC5+ob8ojmdeO1BTCpvmWVeQ4jgojKfUbKJVh6Qd9fI42v72gpJER/Sye6/2kYLd/R2RG9g==>>
 */

import "@babel/polyfill";

import lambda from "aws-serverless-express";
import {
  json,
  urlencoded,
} from "body-parser";
import cors from "cors";
import express from "express";
import bearer from "express-bearer-token";
import helmet from "helmet";
import Raven from "raven";

import {
  genSetupDB,
} from "./db";
import {
  graphQL,
} from "./server";
import {
  makeSync,
} from "./util";

const app: express.Express = express();

let didSetup: boolean = false;

/* BESPOKE START <<main>> */
Raven.config(process.env.SENTRY)
  .install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());

app.use(cors(), helmet(), bearer(), json(), urlencoded({ extended: true }));

app.use((req: express.Request, res: express.Response, next: () => void): void => {
  if (!didSetup) {
    makeSync(genSetupDB());
    didSetup = true;
  }
  next();
});

app.use("/graphql", graphQL);
/* BESPOKE END <<main>> */

export function handler(
  event: object,
  context: object,
): void {
  /* BESPOKE START <<handler>> */
  lambda.proxy(
    lambda.createServer(
      app,
      null,
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
    context,
  );
  /* BESPOKE END <<handler>> */
}
