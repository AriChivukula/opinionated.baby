import { TopBarQuery } from "./__generated__/TopBarQuery.graphql";

import * as cookie from "js-cookie";
import * as React from "react";
import {
  graphql,
  QueryRenderer,
} from "react-relay";
import {
  Environment,
} from "relay-runtime";

import { Page } from "./Page";

interface IProps {
  environment: Environment;
}

export class Root extends React.Component<IProps> {

  public render(): React.Element {
    return (
      <QueryRenderer
        environment={this.props.environment}
        variables={{
          accessToken: cookie.get("accessToken") !== undefined
            ? cookie.get("accessToken") : "",
        }}
        query={graphql`
          query RootQuery($accessToken: String!) {
            ...TopBarQuery @arguments(accessToken: $accessToken)
          }
        `}
        render={({error, props}: {error: Error | null | undefined; props: TopBarQuery}): React.Element => {
          if (error !== undefined) {
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
