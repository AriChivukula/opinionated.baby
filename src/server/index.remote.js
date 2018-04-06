// @flow

import 'babel-polyfill';
import awsServerlessExpress from 'aws-serverless-express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import express from 'express';
import server from './server.js';

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(server);

const types = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
];

const serverless = awsServerlessExpress.createServer(app, null, types)

export const handler = (event: Object, context: Object, callback: (?Object, ?Object) => void) => {
  const payload = {
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*"
      }
  };
  callback(null, payload);
  return awsServerlessExpress.proxy(serverless, event, context);
}
