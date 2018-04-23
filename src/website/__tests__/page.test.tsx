import "jest-enzyme";
import "mutationobserver-shim";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern";
import context from "react-test-context-provider";
import {
  Environment,
  RecordSource,
  Store,
} from "relay-runtime";

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

const ctx: object = {
  relay: {
    environment,
    variables: {},
  },
};

test(
  "PageUnloaded",
  async (): Promise<void> => {
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(ctx, <Page data={null} />),
        ),
      ),
    )
      .toMatchSnapshot();
  },
);

test(
  "PageLoggedOut",
  async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const props: any = {
      data: {
        __fragments: {
          TopBarQuery: {},
        },
        __id: "0",
        loginURL: "http://fake.com/",
        me: null,
      },
    };
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(ctx, <Page {...props} />),
        ),
      ),
    )
      .toMatchSnapshot();
  },
);

test(
  "PageLoggedIn",
  async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const props: any = {
      data: {
        __fragments: {
          TopBarQuery: {},
        },
        __id: "0",
        loginURL: "http://fake.com/",
        me: {
          email: "TEST",
          id: "TEST",
        },
      },
    };
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(ctx, <Page {...props} />),
        ),
      ),
    )
      .toMatchSnapshot();
  },
);
