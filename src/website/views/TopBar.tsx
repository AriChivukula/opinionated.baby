import * as React from "react";
import {
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay";
import {
  PayloadError,
} from "relay-runtime";

import * as cookie from "js-cookie";

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
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
  TopBar_data as TopBarQuery,
} from "./__generated__/TopBar_data.graphql";

export interface ITopBarProps {
  data: TopBarQuery;
}

class __TopBar extends React.Component<ITopBarProps> {

  public render(
  ): JSX.Element {
    const urlParts: URL = new URL(window.location.href);
    if (urlParts.searchParams.has("code")) {
      this.login(urlParts.searchParams.get("code") as string);

      return <div />;
    }
    let actionItem: JSX.Element = <MaterialIcon
      onClick={(): void => this.googleAuth()}
      icon="person"
    />;
    if (this.props.data.me !== null) {
      actionItem = <MaterialIcon
        onClick={(): void => this.logout()}
        icon="exit_to_app"
      />;
    }

    return (
      <>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon
                  onClick={(): void => goto("https://github.com/arichiv/opinionated.baby/")}
                  icon="code"
                />
              </TopAppBarIcon>
              <TopAppBarTitle>{document.title}</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              <TopAppBarIcon actionItem tabIndex={0}>
                {actionItem}
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </>
    );
  }

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
        onCompleted: (response: unknown, errors: readonly PayloadError[] | null | undefined): void => {
          cookie.set(
            "accessToken",
            (response as TopBarLoginMutationResponse).login.accessToken,
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
        onCompleted: (response: unknown, errors: readonly PayloadError[] | null | undefined): void => {
          cookie.set(
            "accessToken",
            (response as TopBarLogoutMutationResponse).logout.accessToken,
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
}

const _TopBar = createFragmentContainer(
  __TopBar,
  {
    data: graphql`
      fragment TopBar_data on Query {
        loginURL,
        me {
          id,
          email
        }
      }
    `,
  },
);

export { _TopBar as TopBar };
