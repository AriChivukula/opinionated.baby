// @flow

import type {RootQuery} from './__generated__/RootQuery.graphql.js';

import React, { Component, Fragment } from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';

import Content from './Content.js';
import TopBar from './TopBar.js';

type Props = {
  data: ?RootQuery
}

type State = {
  isBlockingUntilReload: bool
}

class Page extends Component<Props, State> {

  state = {
    isBlockingUntilReload: false
  }

  render() {
    if (!this.props.data || this.state.isBlockingUntilReload) {
      return <LinearProgress determinate={false} />;
    } else {
      return (
        <Fragment>
          <TopBar
            blockUntilReload={() => this.setState({isBlockingUntilReload: true})}
            data={this.props.data}
          />
          <Content />
        </Fragment>
      );
    }
  }
}

export default Page;
