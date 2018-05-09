/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::RootReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<uTge6si6pljgTiSHKtmwABtajsUWeYmyw7IID5T6MCH6dHRUFcwTyF4Y0MSche66/EjlOrNFIDd3vGm87Xl7kQ==>>
 */

import * as React from "react";

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

export class Root extends React.Component<IRootProps> {

  public async render(
  ): Promise<JSX.Element> {
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
