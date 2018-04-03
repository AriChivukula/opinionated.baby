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
import Error from './Error.js';
import TopBar from './TopBar.js';

type Props = {
  environment: Environment
}

type State = {
  errorMessage: ?string,
  isBlockingUntilReload: bool
}

class Root extends Component<Props, State> {

  state = {
    errorMessage: null,
    isBlockingUntilReload: false
  }

  render() {
    const setError = (message) => this.setState({errorMessage: message});
    const clearError = () => this.setState({errorMessage: null});
    const blockUntilReload = () => this.setState({isBlockingUntilReload: true});

    return (
      <div>
        <Error
          message={this.state.errorMessage}
          clearError={clearError}
        />
        <QueryRenderer
          environment={this.props.environment}
          variables={{}}
          query={graphql`
            query RootQuery {
              ...TopBarQuery
            }
          `}
          render={({error, props}) => {
            if (error) {
              setError(error.message);
            }
            if (!props || this.state.isBlockingUntilReload) {
              return <LinearProgress determinate={false}></LinearProgress>;
            } else {
              return <TopBar blockUntilReload={blockUntilReload} data={props} />
            }
          }}
        />
      </div>
    );
  }
}

export default Root;
