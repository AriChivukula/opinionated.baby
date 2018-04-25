import "@babel/polyfill";

import lambda from "aws-serverless-express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import bearer from "express-bearer-token";
import helmet from "helmet";

import { genSetupDB } from "./db";
import { graphQL } from "./server";
import { makeSync } from "./util";

const app: express.Express = express();
app.use(cors(), helmet(), bearer(), json(), urlencoded());

let didSetup: boolean = false;
app.use((req: express.Request, res: express.Response, next: () => void): void => {
  if (!didSetup) {
    makeSync(genSetupDB());
    didSetup = true;
  }
  next();
});

app.use("/graphql", graphQL);

if (process.env.ENV !== "LAMBDA") {
  app.use("/", express.static("_build_3/website"));
  app.listen(process.env.PORT);
}

const serverless: object = lambda.createServer(
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
);
export function handler(event: object, context: object): void {
  return lambda.proxy(serverless, event, context);
}
