/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::TopBar>>
 * BESPOKE<<imports, render, implementation, relay>>
 * SIGNED<<hd2ZWjeP0VtTjkfdN4rwFpSBZLkIPAMKCzxcVDOPfjT8xU3ghNViT+tPmjxhfKOpcEIG8S8byXmKg0nZgMwQBw==>>
 */

import * as React from "react";
import {
  _FragmentRefs,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay";

/* BESPOKE START <<imports>> */
import * as cookie from "js-cookie";

import {
  SimpleTopAppBar,
  TopAppBarFixedAdjust,
} from "rmwc/TopAppBar";
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
  data: _FragmentRefs<TopBarQuery>;
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
    let actionItem: object = {
      onClick: (): void => this.googleAuth(),
      use: "person",
    };
    if (this.props.data.me !== null) {
      actionItem = {
        onClick: (): void => this.logout(),
        use: "exit_to_app",
      };
    }

    return (
      <>
        <SimpleTopAppBar
          title={document.title}
          fixed={true}
          navigationIcon={{
            onClick: (): void => goto("https://github.com/arichiv/opinionated.baby/"),
            use: "code",
          }}
          actionItems={[actionItem]}
        />
        <TopAppBarFixedAdjust />
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

const _TopBar: React.ComponentType<ITopBarProps> = createFragmentContainer(
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
