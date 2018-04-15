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

  public render(): JSX.Element {
    return (
      <QueryRenderer
        environment={this.props.environment}
        variables={{
          access_token: cookie.get("access_token") !== undefined
            ? cookie.get("access_token") : "",
        }}
        query={graphql`
          query RootQuery($access_token: String!) {
            ...TopBarQuery @arguments(access_token: $access_token)
          }
        `}
        render={({error, props}: {error: Error | null | undefined; props: TopBarQuery}): JSX.Element => {
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
