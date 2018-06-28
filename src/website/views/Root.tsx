/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::RootReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<9CEiTCcJWFmbDvTRynck4KuBtPU8/bHObwhVksgT3DQCnJbNknd+1HI2qGjcLBlzd//mQDCo/BxdTpd6B/nemg==>>
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

polyfill(_Root);
export { _Root as Root };
