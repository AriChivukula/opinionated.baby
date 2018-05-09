/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/tests.ts::pageTest>>
 * BESPOKE<<imports, beforeAll, afterAll, beforeEach, afterEach, PageUnloaded, PageLoggedOut, PageLoggedIn>>
 * SIGNED<<OI26QrNJ9x2cMUgvduPXW+aaHL3bYw7qqe9gz6zkPNORzuy38/u8HGboBxR55BHKwYz3zj52HesnO13QCVAA1Q==>>
 */

/* BESPOKE START <<imports>> */
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

import {
  Page,
} from "../views/Page";

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
/* BESPOKE END <<imports>> */

beforeAll(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeAll>> */
    /* BESPOKE END <<beforeAll>> */
  },
);

afterAll(
  async (): Promise<void> => {
    /* BESPOKE START <<afterAll>> */
    /* BESPOKE END <<afterAll>> */
  },
);

beforeEach(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeEach>> */
    /* BESPOKE END <<beforeEach>> */
  },
);

afterEach(
  async (): Promise<void> => {
    /* BESPOKE START <<afterEach>> */
    /* BESPOKE END <<afterEach>> */
  },
);

test(
  "PageUnloaded",
  async (): Promise<void> => {
    /* BESPOKE START <<PageUnloaded>> */
    expect(
      Enzyme.render(
        Enzyme.mount(
          context(ctx, <Page data={null} />),
        ),
      ),
    )
      .toMatchSnapshot();
    /* BESPOKE END <<PageUnloaded>> */
  },
);

test(
  "PageLoggedOut",
  async (): Promise<void> => {
    /* BESPOKE START <<PageLoggedOut>> */
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
    /* BESPOKE END <<PageLoggedOut>> */
  },
);

test(
  "PageLoggedIn",
  async (): Promise<void> => {
    /* BESPOKE START <<PageLoggedIn>> */
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
    /* BESPOKE END <<PageLoggedIn>> */
  },
);
