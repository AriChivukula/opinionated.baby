// @flow

import '@babel/polyfill';
import 'jest-enzyme';
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

import Page from '../views/Page.js';

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
  'PageUnloaded',
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
          <Page data={null} />
        )
      )
    );
    expect(component).toMatchSnapshot();
  }
);

test(
  'PageLoggedOut',
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
          <Page
            data={{
              __id: '0',
              __fragments: {
                'TopBarQuery': {}
              },
              me: null,
              loginURL: 'http://fake.com/'
            }}
          />
        )
      )
    );
    expect(component).toMatchSnapshot();
  }
);

test(
  'PageLoggedIn',
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
          <Page
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
          />
        )
      )
    );
    expect(component).toMatchSnapshot();
  }
);
