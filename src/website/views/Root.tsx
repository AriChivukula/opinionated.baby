/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::RootReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<1fWdgtSxJqoOtTWfjdt/HnSg3Amo71oiDVfCXN9751mfD3q3Y2oU6+my7tSPiaCIVgnH8lKx+5iK5WlgNVsetQ==>>
 */

import * as React from "react";
import {
  polyfill,
} from "react-lifecycles-compat";

/* BESPOKE START <<imports>> */
import * as cookie from "js-cookie";

import {
  graphql,
  QueryRenderer,
} from "react-relay";
import {
  Environment,
} from "relay-runtime";

import {
  TopBarQuery,
} from "./__generated__/TopBarQuery.graphql";
import {
  Page,
} from "./Page";
/* BESPOKE END <<imports>> */

export interface IRootProps {
  environment: Environment;
}

class _Root extends React.Component<IRootProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<render>> */
    return (
      <QueryRenderer
        environment={this.props.environment}
        variables={{}}
        query={graphql`
          query RootQuery {
            ...TopBarQuery
          }
        `}
        render={({error, props}: {error: Error | null; props: TopBarQuery}): JSX.Element => {
          if (error !== null) {
            console.log(error);

            return <div />;
          } else {
            return <Page data={props} />;
          }
        }}
      />
    );
    /* BESPOKE END <<render>> */
  }

  /* BESPOKE START <<implementation>> */
  /* BESPOKE END <<implementation>> */
}

export const Root: React.Component<IRootProps> = polyfill(_Root);
