// @flow

import type {TopBarQuery} from './__generated__/TopBarQuery.graphql.js';

import cookie from 'js-cookie';
import React, { Component } from 'react';
import {
  createFragmentContainer,
  commitMutation,
  graphql
} from 'react-relay';
import {
  Environment,
} from 'relay-runtime';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';
import {
  Grid,
  GridCell,
  GridInner
} from 'rmwc/Grid';
import {
  List,
  SimpleListItem
} from 'rmwc/List';
import {
  Toolbar,
  ToolbarFixedAdjust,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from 'rmwc/Toolbar';
import { Typography } from 'rmwc/Typography';
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
        login = <React.Fragment>
          <ToolbarTitle>{me.email}</ToolbarTitle>
          <ToolbarIcon
            use="exit_to_app"
            onClick={() => this.logout()}
          />
        </React.Fragment>;
      }
    }
    return (
      <div>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle>Opinionated Baby</ToolbarTitle>
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
        <Grid>
          <GridCell span={12}>
            <Typography use="display2" tag="div">
              A confidently immature starting point
            </Typography>
          </GridCell>
          <GridCell span={12}>
            <Typography use="subheading2" tag="div">
              The hardest part of building a new dynamic websites is avoiding
              all the dragons. Starting a development environment can freeze us
              with choice overload.
              {' '}
              <Typography theme="text-secondary-on-background">
                Opinionated Baby
              </Typography>
              {' '}
              solves this by moving the starting line past the quagmire of setup
              and into the pleasure of production logic.
            </Typography>
          </GridCell>
          <GridCell span={12}>
            <Typography use="display2" tag="div">
              Important choices I made for you
            </Typography>
          </GridCell>
          <GridCell span={3}>
            <List twoLine>
              <SimpleListItem
                graphic="memory"
                text="Lambda"
                secondaryText="Server(less)"
                onClick={() => this.goto('https://aws.amazon.com/lambda/')}
              />
              <SimpleListItem
                graphic="share"
                text="PostgresSQL"
                secondaryText="Database"
                onClick={() => this.goto('https://www.postgresql.org/')}
              />
              <SimpleListItem
                graphic="storage"
                text="S3"
                secondaryText="Storage"
                onClick={() => this.goto('https://aws.amazon.com/s3/')}
              />
              <SimpleListItem
                graphic="bug_report"
                text="Travis CI"
                secondaryText="CI/CD"
                onClick={() => this.goto('https://travis-ci.org/')}
              />
            </List>
          </GridCell>
          <GridCell span={3}>
            <List twoLine>
              <SimpleListItem
                graphic="description"
                text="JavaScript"
                secondaryText="Language"
                onClick={() => this.goto('https://developer.mozilla.org/en-US/docs/Web/JavaScript/')}
              />
              <SimpleListItem
                graphic="language"
                text="Babel"
                secondaryText="Transpiler"
                onClick={() => this.goto('https://babeljs.io/')}
              />
              <SimpleListItem
                graphic="merge_type"
                text="Flow"
                secondaryText="Typing"
                onClick={() => this.goto('https://flow.org/')}
              />
              <SimpleListItem
                graphic="cached"
                text="Node.js"
                secondaryText="Runtime"
                onClick={() => this.goto('https://nodejs.org/en/')}
              />
            </List>
          </GridCell>
          <GridCell span={3}>
            <List twoLine>
              <SimpleListItem
                graphic="unarchive"
                text="yarn"
                secondaryText="Dependency"
                onClick={() => this.goto('https://yarnpkg.com/en/')}
              />
              <SimpleListItem
                graphic="build"
                text="Gulp"
                secondaryText="Toolchain"
                onClick={() => this.goto('https://gulpjs.com/')}
              />
              <SimpleListItem
                graphic="playlist_add_check"
                text="Jest"
                secondaryText="Testing"
                onClick={() => this.goto('https://facebook.github.io/jest/')}
              />
              <SimpleListItem
                graphic="graphic_eq"
                text="GraphQL"
                secondaryText="API"
                onClick={() => this.goto('https://graphql.org/')}
              />
            </List>
          </GridCell>
          <GridCell span={3}>
            <List twoLine>
              <SimpleListItem
                graphic="flip_to_front"
                text="React"
                secondaryText="Interface"
                onClick={() => this.goto('https://reactjs.org/')}
              />
              <SimpleListItem
                graphic="local_library"
                text="Relay"
                secondaryText="Fetch"
                onClick={() => this.goto('http://facebook.github.io/relay/')}
              />
              <SimpleListItem
                graphic="style"
                text="Material Design"
                secondaryText="Theme"
                onClick={() => this.goto('https://material.io/components/web/')}
              />
              <SimpleListItem
                graphic="line_style"
                text="SASS"
                secondaryText="Style"
                onClick={() => this.goto('https://sass-lang.com/')}
              />
            </List>
          </GridCell>
          <GridCell span={12}>
            <Typography use="display2" tag="div">
              <span style={{textDecoration: 'line-through'}}>
                Self justification
              </span>
              {' '}
              Philosophy
            </Typography>
          </GridCell>
          <GridCell span={12}>
            <Typography use="subheading2" tag="div">
              This framework is one-size-fits-me. It{'\''}s an open source
              version of a system I use when building complex websites.
              Anyone may attempt to use, contribute, or critique it. The
              consistency with which feedback is incorporated will be nothing
              short of capricious. My general mission and purpose is to support
              the vitality and happy, healthy development of our
              {' '}
              <a href={'http://www.nic.baby/policies.html'}>
                babies and children
              </a>
              .
            </Typography>
          </GridCell>
          <GridCell span={12}>
            <Typography use="display2" tag="div">
              Release history
            </Typography>
          </GridCell>
          <GridCell span={4}>
            <Card>
              <CardPrimaryAction onClick={() => this.goto('https://github.com/arichiv/opinionated.baby/releases/tag/v0/')}>
                <CardMedia
                  square
                  style={{backgroundImage: 'url(images/v0.jpg)'}}
                />
                <Typography
                  use="display1"
                  style={{padding: '1rem'}}>
                  <Typography theme="text-secondary-on-background">
                    v0
                  </Typography>
                  {' '}
                  Cocksure Castle
                </Typography>
              </CardPrimaryAction>
            </Card>
          </GridCell>
        </Grid>
      </div>
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
