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
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Root from './views/Root.js';
import FourOhFour from './views/FourOhFour.js';

export default function website_render(api_url: string) {
  const environment = new Environment({
    network: new RelayNetworkLayer([
      urlMiddleware({
        url: api_url,
      })
    ]),
    store: new Store(new RecordSource())
  })

  const root = () => <Root environment={environment} />;

  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={root} />
        <Route path="/index.html" render={root} />
        <Route component={FourOhFour} />
      </Switch>
    </BrowserRouter>,
    nullthrows(document.getElementById('root'))
  );
}
