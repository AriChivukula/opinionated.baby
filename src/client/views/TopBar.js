// @flow

import type {TopBarQuery} from './__generated__/TopBarQuery.graphql.js';

import cookie from 'js-cookie';
import React, { Component, Fragment } from 'react';
import {
  createFragmentContainer,
  commitMutation,
  graphql
} from 'react-relay';
import {
  Environment,
} from 'relay-runtime';
import {
  Toolbar,
  ToolbarFixedAdjust,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from 'rmwc/Toolbar';
import url from 'url';

type Props = {
  data: ?TopBarQuery,
  blockUntilReload: () => void,
  relay: {
    environment: Environment
  }
}

class TopBar extends Component<Props> {

  static defaultProps = {
    relay: {
      environment: null
    }
  }

  componentDidMount() {
    const url_parts = url.parse(window.location.href, true);
    if (url_parts.query && url_parts.query.code) {
      this.login(url_parts.query.code);
    }
  }

  render() {
    let login = (
      <ToolbarIcon
        use="person"
        onClick={() => this.googleAuth()}
      />
    );
    const data = this.props.data;
    if (data != null) {
      const me = data.me;
      if (me != null) {
        login = (
          <Fragment>
            <ToolbarTitle>{me.email}</ToolbarTitle>
            <ToolbarIcon
              use="exit_to_app"
              onClick={() => this.logout()}
            />
          </Fragment>
        );
      }
    }
    return (
      <Fragment>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle>
                Opinionated Baby
              </ToolbarTitle onClick={() => this.goto('https://github.com/arichiv/opinionated.baby/')}>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {login}
              <ToolbarIcon
                use="code"
                onClick={() => this.goto('https://github.com/arichiv/opinionated.baby/')}
              />
              <ToolbarIcon
                use="info"
                onClick={() => this.goto('http://chivuku.la/')}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </Fragment>
    );
  }

  googleAuth(): void {
    const data = this.props.data;
    if (data != null) {
      window.location = data.loginURL;
    }
  }

  login(code: string): void {
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
          cookie.set('access_token', response.login.accessToken);
          window.location = '/';
        }
      }
    );
    this.props.blockUntilReload();
  }

  logout(): void {
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
          cookie.set('access_token', response.logout.accessToken);
          window.location = '/';
        }
      }
    );
    this.props.blockUntilReload();
  }

  goto(url: string): void {
    window.location = url;
  }
}

export default createFragmentContainer(
  TopBar,
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
