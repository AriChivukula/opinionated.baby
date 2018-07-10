/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/index.ts::module>>
 * BESPOKE<<main, handler>>
 * SIGNED<<Ue2WYNaafqMjyFmHyFd3o8qYipyDDl0NuElGbLFyfCZp6M1Hg162MfhTzCqAOsJSiCXQl41FZfffgED2tgQx9w==>>
 */

import "@babel/polyfill";

import * as lambda from "aws-serverless-express";
import {
  json,
  urlencoded,
} from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as bearer from "express-bearer-token";
import * as helmet from "helmet";
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
    // @ts-lint
    context,
  );
  /* BESPOKE END <<handler>> */
}
