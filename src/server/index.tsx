import { createServer, proxy } from 'aws-serverless-express';
import * as cors from 'cors';
import * as express from 'express';
import server from './server';

const app = express();
app.use(cors());
let lambdaHandle = undefined;

if (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) {
  app.use('/', server);
  const serverless = createServer(
    app,
    undefined,
    [
      'application/octet-stream',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/jpeg',
      'image/png',
      'image/svg+xml'
    ]
  );
  lambdaHandle = (event: any, context: any) =>
    proxy(serverless, event, context);
} else {
  app.use('/', express.static('_bin/website'));
  app.use('/graphql', server);
  app.listen(8080);
}

export const handler = lambdaHandle;
