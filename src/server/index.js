// @flow

import '@babel/polyfill';
import lambda from 'aws-serverless-express';
import cors from 'cors';
import express from 'express';
import server from './server.js';

const app = express();
app.use(cors());
app.use('/graphql', server);
let lambdaHandle = undefined;

if (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) {
  const server = lambda.createServer(
    app,
    null,
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
  lambdaHandle =
    (event: Object, context: Object) => lambda.proxy(server, event, context);
} else {
  app.use('/', express.static('_bin/website'));
  app.listen(8080);
}

export const handler = lambdaHandle;
