import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Environment,
  RecordSource,
  Store,
} from "relay-runtime";

import FourOhFour from "./views/FourOhFour";
import Root from "./views/Root";

export const website: (apiURL: string) => void =
  (apiURL: string): void => {
    const environment: Environment = new Environment({
      network: new RelayNetworkLayer([
        urlMiddleware({
          url: apiURL,
        }),
      ]),
      store: new Store(new RecordSource()),
    });
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(): JSX.Element => <Root environment={environment} />}
          />
          <Route
            path="/index.html"
            render={(): JSX.Element => <Root environment={environment} />}
          />
          <Route component={FourOhFour} />
        </Switch>
      </BrowserRouter>,
      document.getElementById("root"),
    );
  };
