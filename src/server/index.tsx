import "@babel/polyfill";

import { createServer, proxy } from "aws-serverless-express";
import cors from "cors";
import express from "express";
import { server } from "./server";

const app: express.Express = express();
app.use(cors());

let lambdaHandler: (event: object, context: object) => void =
  (event: object, context: object): void => {
    return;
  };

if (process.env.ENV === "LAMBDA") {
  app.use("/", server);
  const serverless: object = createServer(
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
  lambdaHandler =
    (event: object, context: object): void => {
      proxy(serverless, event, context);
    };
} else {
  app.use("/", express.static("_stage2/website/static"));
  app.use("/graphql", server);
  app.listen(process.env.PORT);
}

export const handler: (event: object, context: object) => void = lambdaHandler;
