/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views/Root.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<IXwHnJRIyIUIHFwJHEtDB9dPoi/BcjO+v/VRqOgPUihRjfMdtUbURintymWh+5oXE+k93DZ8b906P6bDB6vj4A==>>
 */

import * as cookie from "js-cookie";
import * as React from "react";
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

/* BESPOKE START <<DEPRECATE>> */
interface IProps {
  environment: Environment;
}

export class Root extends React.Component<IProps> {

  public render(): JSX.Element {
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
  }
}
/* BESPOKE END <<DEPRECATE>> */
