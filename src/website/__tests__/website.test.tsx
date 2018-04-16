import "jest-enzyme";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern";
import { BrowserRouter } from "react-router-dom";
import context from "react-test-context-provider";
import {
  Environment,
  RecordSource,
  Store,
} from "relay-runtime";

import { FourOhFour } from "../views/FourOhFour";
import { Page } from "../views/Page";

Enzyme.configure({
  adapter: new Adapter(),
});

const environment: Environment = new Environment({
  network: new RelayNetworkLayer([
    urlMiddleware({
      url: "http://127.0.0.1:8080",
    }),
  ]),
  store: new Store(new RecordSource()),
});

test(
  "FourOhFour",
  async (): Promise<void> => {
    expect(
      Enzyme.render(
        Enzyme.mount(
          <BrowserRouter>
            <FourOhFour />
          </BrowserRouter>,
        ),
      ),
    )
      .toMatchSnapshot();
  },
);

test(
  "PageUnloaded",
  async (): Promise<void> => {
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(
            {
              relay: {
                environment,
                variables: {},
              },
            },
            <Page data={undefined} />,
          ),
        ),
      ),
    )
      .toMatchSnapshot();
  },
);

test(
  "PageLoggedOut",
  async (): Promise<void> => {
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(
            {
              relay: {
                environment,
                variables: {},
              },
            },
            <Page
              // @ts-ignore
              data={{
                __fragments: {
                  TopBarQuery: {},
                },
                __id: "0",
                loginURL: "http://fake.com/",
                // tslint:disable-next-line:no-null-keyword
                me: null,
              }}
            />,
          ),
        ),
      ),
    )
      .toMatchSnapshot();
  },
);

test(
  "PageLoggedIn",
  async (): Promise<void> => {
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(
            {
              relay: {
                environment,
                variables: {},
              },
            },
            <Page
              // @ts-ignore
              data={{
                __fragments: {
                  TopBarQuery: {},
                },
                __id: "0",
                loginURL: "http://fake.com/",
                me: {
                  email: "TEST",
                  id: "TEST",
                },
              }}
            />,
          ),
        ),
      ),
    )
      .toMatchSnapshot();
  },
);
