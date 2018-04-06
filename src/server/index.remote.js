// @flow

import 'babel-polyfill';
import cookieParser from 'cookie-parser'
import express from 'express';
import server from './server.js';

const app = express();
app.use(cookieParser());
app.use('/', server);
app.listen(parseInt(8080));
