/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::TopBar>>
 * BESPOKE<<imports, render, implementation, relay>>
 * SIGNED<<nERiIastBWG6bZUM0PoT5oM6/QwQWmfo3Q1Ag5q6pFRHzZsUX8oTuH3BurNfT+8w5OUItXuFsRmbGfNix4VLDw==>>
 */

import * as React from "react";
import {
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay";

/* BESPOKE START <<imports>> */
import * as cookie from "js-cookie";

import * as Relay from "relay-runtime";
import {
  Toolbar,
  ToolbarFixedAdjust,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from "rmwc/Toolbar";
import {
  Url,
} from "url";

import {
  goto,
} from "../utility";
import {
  TopBarLoginMutationResponse,
} from "./__generated__/TopBarLoginMutation.graphql";
import {
  TopBarLogoutMutationResponse,
} from "./__generated__/TopBarLogoutMutation.graphql";
import {
  TopBarQuery,
} from "./__generated__/TopBarQuery.graphql";
/* BESPOKE END <<imports>> */

export interface ITopBarProps {
  data: TopBarQuery;
}

class __TopBar extends React.Component<ITopBarProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<render>> */
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
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </>
    );
    /* BESPOKE END <<render>> */
  }

  /* BESPOKE START <<implementation>> */
  private googleAuth(
  ): void {
    if ("loginURL" in this.props.data) {
      goto(this.props.data.loginURL, true);
    }
  }

  private login(
    code: string,
  ): void {
    commitMutation(
      // @ts-ignore
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
            {
              domain: ".opinionated.baby",
              secure: true,
            },
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

  private logout(
  ): void {
    commitMutation(
      // @ts-ignore
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
            {
              domain: ".opinionated.baby",
              secure: true,
            },
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
  /* BESPOKE END <<implementation>> */
}

const _TopBar: React.ComponentType = createFragmentContainer(
  __TopBar,
  /* BESPOKE START <<relay>> */
  graphql`
    fragment TopBarQuery on Query {
      loginURL,
      me {
        id,
        email
      }
    }
  `,
  /* BESPOKE END <<relay>> */
);

export { _TopBar as TopBar };
