// @flow

import '@babel/polyfill';
import express from 'express';
import server from './server.js';

const app = express();
app.use('/', express.static('_bin/website'));
app.use('/graphql', server);
app.listen(8080);
