import "@babel/polyfill";

import lambda from "aws-serverless-express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import bearer from "express-bearer-token";
import helmet from "helmet";

import { setupDB } from "./db";
import { server } from "./server";
import { makeSync } from "./util";

const app: express.Express = express();
app.use(cors(), helmet(), bearer(), json(), urlencoded());

let didSetup: boolean = false;
app.use((req: express.Request, res: express.Response, next: () => void): void => {
  if (!didSetup) {
    makeSync(setupDB());
    didSetup = true;
  }
  next();
});

let lambdaHandler: ((event: object, context: object) => void) | null = null;

app.use("/graphql", server);

if (process.env.ENV === "LAMBDA") {
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
  lambdaHandler = (event: object, context: object): void => lambda.proxy(serverless, event, context);
} else {
  app.use("/", express.static("_build_3/website"));
  app.listen(process.env.PORT);
}

export const handler: ((event: object, context: object) => void) | null = lambdaHandler;
