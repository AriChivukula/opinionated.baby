// @flow

import 'babel-polyfill';
import nullthrows from 'nullthrows';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Environment,
  RecordSource,
  Store,
} from 'relay-runtime';
import {
  urlMiddleware,
  RelayNetworkLayer
} from 'react-relay-network-modern';
import Root from './views/Root.js';

const environment = new Environment({
  network: new RelayNetworkLayer([
    urlMiddleware({
      url: '/graphql',
      credentials: 'same-origin',
    }),
  ]),
  store: new Store(new RecordSource())
});

function client_render() {
  ReactDOM.render(
    <Root environment={environment} />,
    nullthrows(document.getElementById('root'))
  );
}

window.onload = client_render;
