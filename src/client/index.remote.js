// @flow

import '@babel/polyfill';
import client from './client.js';

window.onload = () => client('https://api.opinionated.baby/opinionatedbaby/');
