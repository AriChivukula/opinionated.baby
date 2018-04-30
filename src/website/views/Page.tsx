/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views/Page.ts::module>>
 * BESPOKE<<Page::render>>
 * SIGNED<<uu8jXVvXcS44SULo+5CNSff7x6gnT8ZQI9WNbrAgYOE/yIIAx1K6AaPWwdsB9jWRxnHW9jVV/rfUAjBe8qZTFw==>>
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

export class Page extends React.Component<IProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<Page::render>> */
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
    /* BESPOKE END <<Page::render>> */
  }
}
