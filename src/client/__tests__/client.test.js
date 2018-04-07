// @flow

import 'babel-polyfill';
import express from 'express';
import React from 'react';
import renderer from 'react-test-renderer';
import {
  Environment,
  RecordSource,
  Store,
} from 'relay-runtime';
import {
  urlMiddleware,
  RelayNetworkLayer
} from 'react-relay-network-modern';

import Root from '../views/Root.js';
import server from '../../server/server.js';

express()
  .use(server)
  .listen(8080);

test(
  'Root',
  async () => {
    const environment = new Environment({
      network: new RelayNetworkLayer([
        urlMiddleware({
          url: 'http://127.0.0.1:8080',
        })
      ]),
      store: new Store(new RecordSource())
    });
    const component = renderer.create(
      <Root environment={environment} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  }
);
