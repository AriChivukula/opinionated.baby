import {
  TopBarLoginMutationResponse,
 } from "./__generated__/TopBarLoginMutation.graphql";
import {
 TopBarLogoutMutationResponse,
} from "./__generated__/TopBarLogoutMutation.graphql";
import { TopBarQuery } from "./__generated__/TopBarQuery.graphql";

import * as cookie from "js-cookie";
import * as React from "react";
import {
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay";
import Relay from "relay-runtime";
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
  relay: Relay;
}

class TopBarRelay extends React.Component<IProps> {

  public render(): JSX.Element {
    const urlParts: UrlWithParsedQuery = parse(window.location.href, true);
    if ("code" in urlParts.query) {
      this.login(urlParts.query.code as string);

      return <div />;
    }
    let login: JSX.Element = (
      <ToolbarIcon
        use="person"
        onClick={(): void => { this.googleAuth(); }}
      />
    );
    if (this.props.data.me !== null) {
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
      goto(this.props.data.loginURL, true);
    }
  }

  private login(code: string): void {
    commitMutation(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation TopBarLoginMutation($input: LoginInput) {
            login(input: $input) {
              accessToken
            }
          }
        `,
        onCompleted: (response: TopBarLoginMutationResponse, errors: Error[]): void => {
          cookie.set(
            "accessToken",
            response.login.accessToken,
            { secure: process.env.ENV === "LAMBDA" },
          );
          goto("/", true);
        },
        variables: {
          input: {
            code,
          },
        },
      },
    );
  }

  private logout(): void {
    commitMutation(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation TopBarLogoutMutation($input: LogoutInput) {
            logout(input: $input) {
              accessToken
            }
          }
        `,
        onCompleted: (response: TopBarLogoutMutationResponse, errors: Error[]): void => {
          cookie.set(
            "accessToken",
            response.logout.accessToken,
            { secure: process.env.ENV === "LAMBDA" },
          );
          goto("/", true);
        },
        variables: {
          input: {
            dummy: "",
          },
        },
      },
    );
  }
}

export const TopBar: React.ComponentType = createFragmentContainer(
  TopBarRelay,
  graphql`
    fragment TopBarQuery on Query {
      loginURL,
      me {
        id,
        email
      }
    }
  `,
);
