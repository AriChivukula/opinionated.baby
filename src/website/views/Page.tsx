/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::PageReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<tkBAMF9WhupbomPX1wQwne/w4RXPQ0XUE0DC7r9ewEriQOxNMUNg99rAYvGAqGi60MAkmQi5hRcjj7iexWyPWQ==>>
 */

import * as React from "react";
import {
  polyfill,
} from "react-lifecycles-compat";

/* BESPOKE START <<imports>> */
import {
  LinearProgress,
} from "rmwc/LinearProgress";
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
/* BESPOKE END <<imports>> */

export interface IPageProps {
  data: TopBarQuery | null;
}

class _Page extends React.Component<IPageProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<render>> */
    const urlParts: URL = new URL(window.location.href);
    if (this.props.data === null) {
      return <LinearProgress determinate={false} />;
    } else if (urlParts.searchParams.has("code")) {
      return (
        <>
          <TopBar {...this.props} />
          <LinearProgress determinate={false} />
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
    /* BESPOKE END <<render>> */
  }

  /* BESPOKE START <<implementation>> */
  /* BESPOKE END <<implementation>> */
}

polyfill(_Page);
export { _Page as Page };
