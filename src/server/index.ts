/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/index.ts::module>>
 * BESPOKE<<main, handler>>
 * SIGNED<<vnNPjDaMg1AMT1OKhSpoKo83Y6cLO5wa0IjTVel+vGC3id9PfUElNluhWXpoTiG5Lt/LNkKq5fW3D4zaKfF0uw==>>
 */

import "@babel/polyfill";
import "newrelic";

import lambda from "aws-serverless-express";
import {
  json,
  urlencoded,
} from "body-parser";
import cors from "cors";
import express from "express";
import bearer from "express-bearer-token";
import helmet from "helmet";
import Rollbar from "rollbar";

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

app.use((new Rollbar(process.env.ROLLBAR)).errorHandler());
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
