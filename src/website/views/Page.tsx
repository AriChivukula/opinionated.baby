/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views/Page.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<L5hDmnYU+O9E8+oixjGQzg1aagrkNa87Vzpqut9qDsFqwcRdr8kN4TgLhZ8v49ypDbJuAwXtyVQ5jzl34OWtFw==>>
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

interface IProps {
  data: TopBarQuery | null;
}

/* BESPOKE START <<DEPRECATE>> */
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
