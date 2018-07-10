/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/website.ts::module>>
 * BESPOKE<<render>>
 * SIGNED<<xnsAl1/89keIKjheiAkSuVGkw8OGqGA9Q653KkN0+ADLVWpwnv0FhpP3Ajpg9X0f1BjJWZAYcyPK7TwlYk5xSA==>>
 */

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
  /* BESPOKE START <<render>> */
  const environment: Environment = new Environment({
    network: new RelayNetworkLayer([
      urlMiddleware({ url: apiURL }),
      authMiddleware({
        allowEmptyToken: true,
        token: (): string => cookie.get("accessToken") || "",
      }),
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
  /* BESPOKE END <<render>> */
}
