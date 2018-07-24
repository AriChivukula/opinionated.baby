/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::website>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
import * as cookie from "js-cookie";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  authMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
// @ts-ignore
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
}
/* BESPOKE END <<custom>> */
