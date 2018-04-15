import { TopBarQuery } from "./__generated__/TopBarQuery.graphql";

import * as React from "react";
import { LinearProgress } from "rmwc";
import { parse, UrlWithParsedQuery } from "url";

import { Content } from "./Content";
import { TopBar } from "./TopBar";

interface IProps {
  data: TopBarQuery | undefined;
}

export class Page extends React.Component<IProps> {

  public render(): JSX.Element {
    const urlParts: UrlWithParsedQuery = parse(window.location.href, true);
    if (this.props.data === undefined || "code" in urlParts.query) {
      return <LinearProgress determinate={false} />;
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
