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
import { parse, UrlWithParsedQuery } from "url";

import { goto } from "../util";

interface IProps {
  data: TopBarQuery;
  relay: {
    environment: Environment;
  };
}

class TopBarRelay extends React.Component<IProps> {

  public componentDidMount(): void {
    const urlParts: UrlWithParsedQuery = parse(window.location.href, true);
    if ("code" in urlParts.query) {
      this.login(urlParts.query.code as string);
    }
  }

  public render(): React.Element {
    let login: React.Element = (
      <ToolbarIcon
        use="person"
        onClick={(): void => { this.googleAuth(); }}
      />
    );
    if ("me" in this.props.data) {
      login = (
        <>
          <ToolbarTitle>{this.props.data.me.email}</ToolbarTitle>
          <ToolbarIcon
            use="exit_to_app"
            onClick={(): void => { this.logout(); }}
          />
        </>
      );
    }

    return (
      <>
        <Toolbar fixed waterfall>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle onClick={(): void => { goto("https://github.com/arichiv/opinionated.baby/"); }}>
                Opinionated Baby
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {login}
              <ToolbarIcon
                use="code"
                onClick={(): void => { goto("https://github.com/arichiv/opinionated.baby/"); }}
              />
              <ToolbarIcon
                use="info"
                onClick={(): void => { goto("http://chivuku.la/"); }}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </>
    );
  }

  private googleAuth(): void {
    if ("loginURL" in this.props.data) {
      window.open(this.props.data.loginURL);
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
        onCompleted: (response: object, errors: object): void => {
          cookie.set("accessToken", response.login.accessToken);
          window.open("/");
        },
        variables: {
          code,
        },
      },
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
        onCompleted: (response: object, errors: object): void => {
          cookie.set("accessToken", response.logout.accessToken);
          window.open("/");
        },
        variables: {},
      },
    );
  }
}

// tslint:disable-next-line:variable-name
export const TopBar: React.ComponentType = createFragmentContainer(
  TopBarRelay,
  graphql`
    fragment TopBarQuery on Query @argumentDefinitions(
      accessToken: {type: "String!"}
    ) {
      loginURL,
      me(accessToken: $accessToken) {
        googleID,
        email
      }
    }
  `,
);
