/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::Page>>
 * BESPOKE<<imports, render, implementation>>
 * SIGNED<<uiHZWck8TbLb4b455x7GYdRIQ+FwbgTyiIg8tLSEQoXfr+zh6N9RJusY7Qe/i014G74hTF4jmq6sUDR1aSLyjA==>>
 */

import * as React from "react";

/* BESPOKE START <<imports>> */
import {
  LinearProgress,
} from "rmwc/LinearProgress";
import {
  Url,
} from "url";

import {
  ContentQuery,
} from "./__generated__/ContentQuery.graphql";
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
  data: TopBarQuery | ContentQuery | null;
}

class _Page extends React.Component<IPageProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<render>> */
    const urlParts: URL = new URL(window.location.href);
    // @ts-ignore
    const ProgressJSX = <LinearProgress determinate={false} />;
    if (this.props.data === null) {
      return ProgressJSX;
    } else if (urlParts.searchParams.has("code")) {
      // @ts-ignore
      const TopBarJSX = <TopBar {...this.props} />;
      return (
        <>
          {TopBarJSX}
          {ProgressJSX}
        </>
      );
    } else {
      // @ts-ignore
      const TopBarJSX = <TopBar {...this.props} />;
      // @ts-ignore
      const ContentJSX = <Content {...this.props} />;
      return (
        <>
          {TopBarJSX}
          {ContentJSX}
        </>
      );
    }
    /* BESPOKE END <<render>> */
  }

  /* BESPOKE START <<implementation>> */
  /* BESPOKE END <<implementation>> */
}

export { _Page as Page };
