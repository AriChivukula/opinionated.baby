// @flow

import '@babel/polyfill';
import client from './client.js';

window.onload = () => client('http://127.0.0.1:8080/graphql/');
