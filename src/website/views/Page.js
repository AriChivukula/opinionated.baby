// @flow

import type {RootQuery} from './__generated__/RootQuery.graphql.js';

import React, { Component, Fragment } from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';

import Content from './Content.js';
import TopBar from './TopBar.js';

type Props = {
  data: ?RootQuery
}

class Page extends Component<Props> {

  render() {
    if (!this.props.data) {
      return <LinearProgress determinate={false} />;
    } else {
      return (
        <Fragment>
          <TopBar data={this.props.data} />
          <Content />
        </Fragment>
      );
    }
  }
}

export default Page;
