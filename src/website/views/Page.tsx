import { RootQuery } from './__generated__/RootQuery.graphql';

import * as React from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';
import { parse } from 'url';

import Content from './Content';
import TopBar from './TopBar';

type Props = {
  data: ?RootQuery
}

class Page extends React.Component<Props> {

  render() {
    const url_parts = parse(window.location.href, true);
    if (!this.props.data || (url_parts.query && url_parts.query.code)) {
      return <LinearProgress determinate={false} />;
    } else {
      return (
        <>
          <TopBar data={this.props.data} />
          <Content />
        </>
      );
    }
  }
}

export default Page;
