// @flow

import type {RootQuery} from './__generated__/RootQuery.graphql.js';

import React, { Component } from 'react';
import {
  graphql,
  QueryRenderer
} from 'react-relay';
import {
  Environment,
} from 'relay-runtime';
import { LinearProgress } from 'rmwc/LinearProgress';
import TopBar from './TopBar.js';
import cookie from 'js-cookie';

type Props = {
  environment: Environment
}

type State = {
  isBlockingUntilReload: bool
}

class Root extends Component<Props, State> {

  state = {
    isBlockingUntilReload: false
  }

  render() {
    const blockUntilReload = () => this.setState({isBlockingUntilReload: true});
    let access_token = cookie.get('access_token');
    if (!access_token) {
      access_token = '';
    }

    return (
      <QueryRenderer
        environment={this.props.environment}
        variables={{
          access_token: access_token
        }}
        query={graphql`
          query RootQuery($access_token: String!) {
            ...TopBarQuery @arguments(access_token: $access_token)
          }
        `}
        render={({error, props}) => {
          if (error) {
            console.log(error);
            return <div />;
          } else if (!props || this.state.isBlockingUntilReload) {
            return <LinearProgress determinate={false}></LinearProgress>;
          } else {
            return <TopBar blockUntilReload={blockUntilReload} data={props} />
          }
        }}
      />
    );
  }
}

export default Root;
