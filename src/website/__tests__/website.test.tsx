import * as enzyme from "enzyme";
import * as adapter from "enzyme-adapter-react-16";
// tslint:disable-next-line:no-import-side-effect
import "jest-enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

import { FourOhFour } from "../views/FourOhFour";
import { Page } from "../views/Page";

enzyme.configure({
  adapter: new adapter(),
});

const environment: Environment = new Environment({
  network: new Network(),
  store: new Store(new RecordSource()),
});

test(
  "FourOhFour",
  async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const component: any = enzyme.render(
      <BrowserRouter>
        <FourOhFour />
      </BrowserRouter>,
    );
    expect(component)
      .toMatchSnapshot();
  },
);

test(
  "PageUnloaded",
  async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const component: any = enzyme.render(
      <Page data={undefined} />,
      {
        context: {
          relay: {
            environment,
            variables: {},
          },
        },
      },
    );
    expect(component)
      .toMatchSnapshot();
  },
);

test(
  "PageLoggedOut",
  async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const component: any = enzyme.render(
      <Page
        data={{
          __fragments: {
            TopBarQuery: {},
          },
          __id: "0",
          loginURL: "http://fake.com/",
          me: undefined,
        }}
      />,
      {
        context: {
          relay: {
            environment,
            variables: {},
          },
        },
      },
    );
    expect(component)
      .toMatchSnapshot();
  },
);

test(
  "PageLoggedIn",
  async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const component: any = enzyme.render(
      <Page
        data={{
          __fragments: {
            TopBarQuery: {},
          },
          __id: "0",
          loginURL: "http://fake.com/",
          me: {
            email: "TEST",
            googleID: "TEST",
            id: "TEST",
          },
        }}
      />,
      {
        context: {
          relay: {
            environment,
            variables: {},
          },
        },
      },
    );
    expect(component)
      .toMatchSnapshot();
  },
);
