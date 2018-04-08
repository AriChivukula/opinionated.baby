// @flow

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

export default function website_render(api_url: string) {
  const environment = new Environment({
    network: new RelayNetworkLayer([
      urlMiddleware({
        url: api_url,
      })
    ]),
    store: new Store(new RecordSource())
  })

  ReactDOM.render(
    <Root environment={environment} />,
    nullthrows(document.getElementById('root'))
  );
}
