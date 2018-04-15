import "jest-enzyme";
import * as enzyme from "enzyme";
import * as adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

import FourOhFour from "../views/FourOhFour";
import Page from "../views/Page";

enzyme.configure({
  adapter: new adapter()
});

const environment = new Environment({
  network: new Network(),
  store: new Store(new RecordSource())
});

test(
  "FourOhFour",
  async () => {
    const component = enzyme.render(
      <BrowserRouter>
        <FourOhFour />
      </BrowserRouter>
    );
    expect(component).toMatchSnapshot();
  }
);

test(
  "PageUnloaded",
  async () => {
    const component = enzyme.render(
      <Page data={null} />,
      {
        context: {
          relay:{
            environment: environment,
            variables: {}
          }
        }
      }
    );
    expect(component).toMatchSnapshot();
  }
);

test(
  "PageLoggedOut",
  async () => {
    const component = enzyme.render(
      <Page
        data={{
          __id: "0",
          __fragments: {
            "TopBarQuery": {}
          },
          me: null,
          loginURL: "http://fake.com/"
        }}
      />,
      {
        context: {
          relay:{
            environment: environment,
            variables: {}
          }
        }
      }
    );
    expect(component).toMatchSnapshot();
  }
);

test(
  "PageLoggedIn",
  async () => {
    const component = enzyme.render(
      <Page
        data={{
          __id: "0",
          __fragments: {
            "TopBarQuery": {}
          },
          me: {
            id: "TEST",
            googleID: "TEST",
            email: "TEST"
          },
          loginURL: "http://fake.com/"
        }}
      />,
      {
        context: {
          relay:{
            environment: environment,
            variables: {}
          }
        }
      }
    );
    expect(component).toMatchSnapshot();
  }
);
