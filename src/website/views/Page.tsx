/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::PageReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<Zvb5KXBxIFox/KxU9YqlEmbLmHNhcFyB9MdzgGwP9vxHPuQi6Er6jVbL28KH5FRAuiuVvK/KtXgd+r8jOppiVg==>>
 */

import * as React from "react";

/* BESPOKE START <<imports>> */
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
/* BESPOKE END <<imports>> */

export interface IPageProps {
  data: TopBarQuery | null;
}

export class Page extends React.Component<IPageProps> {

  public async render(
  ): Promise<JSX.Element> {
    /* BESPOKE START <<render>> */
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
    /* BESPOKE END <<render>> */
  }

  /* BESPOKE START <<implementation>> */
  /* BESPOKE END <<implementation>> */
}
