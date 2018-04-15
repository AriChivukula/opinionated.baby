import { TopBarQuery } from "./__generated__/TopBarQuery.graphql";

import * as cookie from "js-cookie";
import * as React from "react";
import {
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay";
import {
  Environment,
} from "relay-runtime";
import {
  Toolbar,
  ToolbarFixedAdjust,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from "rmwc";
import { parse } from "url";

import { goto } from "../util";

interface IProps {
  data: TopBarQuery;
  relay: {
    environment: Environment;
  };
}

class TopBarRelay extends React.Component<IProps> {

  public componentDidMount(): void {
    const url_parts = parse(window.location.href, true);
    if (url_parts.query && url_parts.query.code) {
      this.login(url_parts.query.code as string);
    }
  }

  public render(): JSX.Element {
    let login = (
      <ToolbarIcon
        use="person"
        onClick={() => this.googleAuth()}
      />
    );
    const data = this.props.data;
    if (data !== null) {
      const me = data.me;
      if (me !== null) {
        login = (
          <>
            <ToolbarTitle>{me.email}</ToolbarTitle>
            <ToolbarIcon
              use="exit_to_app"
              onClick={() => this.logout()}
            />
          </>
        );
      }
    }
    return (
      <>
        <Toolbar fixed waterfall>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle onClick={goto("https://github.com/arichiv/opinionated.baby/")}>
                Opinionated Baby
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {login}
              <ToolbarIcon
                use="code"
                onClick={goto("https://github.com/arichiv/opinionated.baby/")}
              />
              <ToolbarIcon
                use="info"
                onClick={goto("http://chivuku.la/")}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </>
    );
  }

  private googleAuth(): void {
    const data = this.props.data;
    if (data != null) {
      (window as any).location = data.loginURL;
    }
  }

  private login(code: string): void {
    commitMutation(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation TopBarLoginMutation($code: String!) {
            login(code: $code) {
              accessToken
            }
          }
        `,
        variables: {
          code: code
        },
        onCompleted: (response, errors) => {
          cookie.set("access_token", response.login.accessToken);
          (window as any).location = "/";
        }
      }
    );
  }

  private logout(): void {
    commitMutation(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation TopBarLogoutMutation {
            logout {
              accessToken
            }
          }
        `,
        variables: {},
        onCompleted: (response, errors) => {
          cookie.set("access_token", response.logout.accessToken);
          (window as any).location = "/";
        }
      }
    );
  }
}

export const TopBar: React.ComponentType = createFragmentContainer(
  TopBarRelay,
  graphql`
    fragment TopBarQuery on Query @argumentDefinitions(
      access_token: {type: "String!"}
    ) {
      loginURL,
      me(access_token: $access_token) {
        googleID,
        email
      }
    }
  `,
);
