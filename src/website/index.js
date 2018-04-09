// @flow

import '@babel/polyfill';
import website from './website.js';

let api_url = 'http://127.0.0.1:8080/graphql/';

if (window.location.hostname == 'opinionated.baby') {
  api_url = 'https://api.opinionated.baby/opinionatedbaby/graphql/'
} else if (window.location.hostname == 'beta.opinionated.baby') {
  api_url = 'https://api-beta.opinionated.baby/betaopinionatedbaby/graphql/'
}

window.onload = () => website(api_url);
