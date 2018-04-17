import "@babel/polyfill";

import lambda from "aws-serverless-express";
import cors from "cors";
import express from "express";
import { server } from "./server";

const app: express.Express = express();
app.use(cors());

if (process.env.ENV === "LAMBDA") {
  app.use("/", server);
  // tslint:disable-next-line:no-any
  exports.handler = (event: object, context: object): any => lambda.proxy(
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
} else {
  app.use("/", express.static("_build_3/website"));
  app.use("/graphql", server);
  app.listen(process.env.PORT);
}
