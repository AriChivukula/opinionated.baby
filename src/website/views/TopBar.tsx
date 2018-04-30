/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views/TopBar.ts::module>>
 * BESPOKE<<TopBar::render, TopBar::googleAuth, TopBar::login, TopBar::logout, DEPRECATE>>
 * SIGNED<<UI4DS8SIuh/j/gZnS/dgsMnUJqwdPg+8jeFgeRzt2PDP1J+orv7vXGHPqE56vKnmjjSaOIQ0/HfbIujRnjYX1g==>>
 */

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
import {
  Url,
} from "url";

import {
  goto,
} from "../util";
import {
  TopBarLoginMutationResponse,
} from "./__generated__/TopBarLoginMutation.graphql";
import {
  TopBarLogoutMutationResponse,
} from "./__generated__/TopBarLogoutMutation.graphql";
import {
  TopBarQuery,
} from "./__generated__/TopBarQuery.graphql";

interface IProps {
  data: TopBarQuery;
  relay: Relay;
}

class TopBarRelay extends React.Component<IProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<TopBar::render>> */
    const urlParts: URL = new URL(window.location.href);
    if (urlParts.searchParams.has("code")) {
      this.login(urlParts.searchParams.get("code") as string);

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
                {document.title}
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
    /* BESPOKE END <<TopBar::render>> */
  }

  private googleAuth(
  ): void {
    /* BESPOKE START <<TopBar::googleAuth>> */
    if ("loginURL" in this.props.data) {
      goto(this.props.data.loginURL, true);
    }
    /* BESPOKE END <<TopBar::googleAuth>> */
  }

  private login(
    code: string,
  ): void {
    /* BESPOKE START <<TopBar::login>> */
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
    /* BESPOKE END <<TopBar::login>> */
  }

  private logout(
  ): void {
    /* BESPOKE START <<TopBar::logout>> */
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
    /* BESPOKE END <<TopBar::logout>> */
  }
}

/* BESPOKE START <<DEPRECATE>> */
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
/* BESPOKE END <<DEPRECATE>> */
