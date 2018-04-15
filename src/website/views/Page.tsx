import { TopBarQuery } from "./__generated__/TopBarQuery.graphql";

import * as React from "react";
import { LinearProgress } from "rmwc";
import { parse, UrlWithParsedQuery } from "url";

import { Content } from "./Content";
import { TopBar } from "./TopBar";

interface IProps {
  data: TopBarQuery;
}

export class Page extends React.Component<IProps> {

  public render(): React.Element {
    const urlParts: UrlWithParsedQuery = parse(window.location.href, true);
    if (!("me" in this.props.data) || "code" in urlParts.query) {
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
