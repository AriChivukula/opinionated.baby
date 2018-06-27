/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::RootReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<gMIF8UpVVL82bKe3h5hks3leg9xgncZlMpe7iI1YBko4QmdbaN/NWzhDJ+XChPhVDRLOzy0Dk87YdKXuRkLG5w==>>
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
  Page,
} from "./Page";

type TopBarQuery = any;
/* BESPOKE END <<imports>> */

export interface IRootProps {
  environment: Environment;
}

export class Root extends React.Component<IRootProps> {

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
