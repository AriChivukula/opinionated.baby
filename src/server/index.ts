import "@babel/polyfill";

import lambda from "aws-serverless-express";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { server } from "./server";

const app: express.Express = express();
app.use(cors());
app.use(helmet());

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
