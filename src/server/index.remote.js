// @flow

import 'babel-polyfill';
import awsServerlessExpress from 'aws-serverless-express';
import cookieParser from 'cookie-parser'
import express from 'express';
import server from './server.js';

const app = express();
app.use(cookieParser());
app.use('/', server);

const types = [
  'application/octet-stream',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml'
]

const serverless = awsServerlessExpress.createServer(app, null, types)

export const handler = (event: Object, context: Object) =>
  awsServerlessExpress.proxy(serverless, event, context)
