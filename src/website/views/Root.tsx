/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::Root>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<P1ff7Tq61T6TuGrXUQvDBChPYA3fkVQw5inLdp0dAapcC/WfbOxI0rMWNw2D4U6lQnQIs0JFh94DDLgp+a8NgA==>>
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
  Content_data as ContentQuery,
} from "./__generated__/Content_data.graphql";
import {
  TopBar_data as TopBarQuery,
} from "./__generated__/TopBar_data.graphql";
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
            ...Content_data
            ...TopBar_data
          }
        `}
        render={({error, props}: {error: Error | null; props: TopBarQuery | ContentQuery}): JSX.Element => {
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

export { _Root as Root };
