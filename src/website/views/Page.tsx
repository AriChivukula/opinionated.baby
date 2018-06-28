/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::PageReact>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<lM2/e937oBWgNNrqpWTTg5Z6xTtqk0OFAgoDNM9x4Uv3CTyOJ+nsIhXv5JvUOQLMhK4+7iSIy/TFqG0aE+Zu2g==>>
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

// @ts-lint
export const Page: React.Component<IPageProps> = polyfill(_Page);
