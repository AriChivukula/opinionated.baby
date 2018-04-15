import { TopBarQuery } from './__generated__/TopBarQuery.graphql';

import * as cookie from 'js-cookie';
import * as React from 'react';
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
// @ts-ignore
} from 'rmwc/Toolbar';
import { parse } from 'url';

import { goto } from '../util';

type Props = {
  data: TopBarQuery,
  relay: {
    environment: Environment
  }
}

class TopBar extends React.Component<Props> {

  componentDidMount() {
    const url_parts = parse(window.location.href, true);
    if (url_parts.query && url_parts.query.code) {
      this.login(url_parts.query.code as string);
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
              <ToolbarTitle onClick={goto('https://github.com/arichiv/opinionated.baby/')}>
                Opinionated Baby
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {login}
              <ToolbarIcon
                use="code"
                onClick={goto('https://github.com/arichiv/opinionated.baby/')}
              />
              <ToolbarIcon
                use="info"
                onClick={goto('http://chivuku.la/')}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </>
    );
  }

  googleAuth(): void {
    const data = this.props.data;
    if (data != null) {
      (window as any).location = data.loginURL;
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
          (window as any).location = '/';
        }
      }
    );
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
          (window as any).location = '/';
        }
      }
    );
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
