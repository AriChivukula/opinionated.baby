// @flow

import type {RootQuery} from './__generated__/RootQuery.graphql.js';

import React, { Component, Fragment } from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';
import url from 'url';

import Content from './Content.js';
import TopBar from './TopBar.js';

type Props = {
  data: ?RootQuery
}

class Page extends Component<Props> {

  render() {
    const url_parts = url.parse(window.location.href, true);
    if (!this.props.data || (url_parts.query && url_parts.query.code)) {
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
