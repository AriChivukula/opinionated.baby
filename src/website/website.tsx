import * as cookie from "js-cookie";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  authMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import {
  Environment,
  INetwork,
  RecordSource,
  Store,
} from "relay-runtime";

import {
  FourOhFour,
} from "./views/FourOhFour";
import {
  Root,
} from "./views/Root";

export function render(
  apiURL: string,
): void {
  const environment: Environment = new Environment({
    network: new RelayNetworkLayer([
      urlMiddleware({ url: apiURL }),
      authMiddleware({
        allowEmptyToken: true,
        token: (): string => cookie.get("accessToken") || "",
      }) as INetwork,
    ]),
    store: new Store(new RecordSource()),
  });
  const renderer: () => JSX.Element = (): JSX.Element => <Root environment={environment} />;
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={renderer} />
        <Route path="/index.html" render={renderer} />
        <Route component={FourOhFour} />
      </Switch>
    </BrowserRouter>,
    document.getElementById("root"),
  );
}
