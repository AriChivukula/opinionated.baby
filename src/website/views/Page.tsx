import { TopBarQuery } from './__generated__/TopBarQuery.graphql';

import * as React from 'react';
// @ts-ignore
import { LinearProgress } from 'rmwc/LinearProgress';
import { parse } from 'url';

import Content from './Content';
import TopBar from './TopBar';

type Props = {
  data: TopBarQuery
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
