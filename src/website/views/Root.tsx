import * as React from "react";

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

export interface IRootProps {
  environment: Environment;
}

class _Root extends React.Component<IRootProps> {

  public render(
  ): JSX.Element {
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
        render={({error, props}: {error: Error | null; props: unknown}): JSX.Element => {
          if (error !== null) {
            console.log(error);

            return <div />;
          } else {
            return <Page data={(props as TopBarQuery | ContentQuery)} />;
          }
        }}
      />
    );
  }
}

export { _Root as Root };
