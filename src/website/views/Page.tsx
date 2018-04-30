/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views/Page.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<lRan6LFuH7s0t8DN80qmVDUX13HFntwRJCjNxXvFFW/x15HIRk2kZsfS0Ri4b4cRKvPy6ZvmTVUg2d2KcThH2w==>>
 */

import * as React from "react";
import {
  LinearProgress,
} from "rmwc";
import {
  Url,
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

interface IProps {
  data: TopBarQuery | null;
}

/* BESPOKE START <<DEPRECATE>> */
export class Page extends React.Component<IProps> {

  public render(): JSX.Element {
    const urlParts: URL = new URL(window.location.href);
    if (this.props.data === null) {
      return <LinearProgress determinate={false} />;
    } else if (urlParts.searchParams.has("code")) {
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
