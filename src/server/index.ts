/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/index.ts::module>>
 * BESPOKE<<main, handler>>
 * SIGNED<<wk0RxDdf7rQb5KfcgjNqlo+l5wCeOkUz+lc8iB0QOaTdXGH6nkayMoBPe3PoQVDfqtKU09PC7Ppw8766uAfhSg==>>
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
