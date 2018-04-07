// @flow

import 'babel-polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import context from 'react-test-context-provider';
import {
  Environment,
  RecordSource,
  Store,
} from 'relay-runtime';
import {
  urlMiddleware,
  RelayNetworkLayer
} from 'react-relay-network-modern';

import TopBar from '../views/TopBar.js';

Enzyme.configure({
  adapter: new Adapter()
});

const environment = new Environment({
  network: new RelayNetworkLayer([
    urlMiddleware({
      url: 'http://127.0.0.1:8080',
    })
  ]),
  store: new Store(new RecordSource())
});

test(
  'TopBar',
  async () => {
    const component = Enzyme.render(
      Enzyme.mount(
        context(
          {
            relay:{
              environment: environment,
              variables: {}
            }
          },
          // $FlowFixMe
          <TopBar
            data={{
              __id: '0',
              __fragments: {
                'TopBarQuery': {}
              },
              me: {
                id: 'TEST',
                googleID: 'TEST',
                email: 'TEST'
              },
              loginURL: 'http://fake.com/'
            }}
            blockUntilReload={() => {}}
          />
        )
      )
    );
    expect(component.html()).toMatchSnapshot();
  }
);
