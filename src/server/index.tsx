import { createServer, proxy } from "aws-serverless-express";
import * as cors from "cors";
import * as express from "express";
import { server } from "./server";

const app: express.Express = express();
app.use(cors());

let lambdaHandler: (event: object, context: object) => void =
  (event: object, context: object): void => {
    return;
  };

if ("LAMBDA_TASK_ROOT" in process.env && "AWS_EXECUTION_ENV" in process.env) {
  app.use("/", server);
  const serverless: object = createServer(
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
  );
  lambdaHandler =
    (event: object, context: object): void => {
      // @ts-ignore
      proxy(serverless, event, context);
    };
} else {
  app.use("/", express.static("_bin/website"));
  app.use("/graphql", server);
  app.listen(process.env.PORT);
}

export const handler: (event: object, context: object) => void = lambdaHandler;
