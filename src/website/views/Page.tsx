/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views/Page.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<Uxwp3mVlZV+d+i2D4cOqOYgpaD+CNonFPp5Zw/QZdFmpYQVRRJd++xZrsOiD8mK1n22WZxRbnVuVN5UOhneN7Q==>>
 */

import * as React from "react";
import {
  LinearProgress,
} from "rmwc";
import {
  parse,
  UrlWithParsedQuery,
} from "url";

import {
  TopBarQuery,
} from "./__generated__/TopBarQuery.graphql";
import {
  Content,
} from "./Content";
import {
  TopBar,
} from "./TopBar";


/* BESPOKE START <<DEPRECATE>> */
interface IProps {
  data: TopBarQuery | null;
}

export class Page extends React.Component<IProps> {

  public render(): JSX.Element {
    const urlParts: UrlWithParsedQuery = parse(window.location.href, true);
    if (this.props.data === null) {
      return <LinearProgress determinate={false} />;
    } else if ("code" in urlParts.query) {
      return (
        <>
          <LinearProgress determinate={false} />
          <TopBar {...this.props} />
        </>
      );
    } else {
      return (
        <>
          <TopBar {...this.props} />
          <Content />
        </>
      );
    }
  }
}
/* BESPOKE END <<DEPRECATE>> */
