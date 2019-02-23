/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::Content>>
 * BESPOKE<<imports, render, implementation, relay>>
 * SIGNED<<0LZX0PmRN5L/T0xOoPH2438jXkgZ4eFMq+XtZ/pyVuEFIyfNW/jjsRGPiF+eSVU1UPvW03SLl2ce1lV48AiGHw==>>
 */

import * as React from "react";
import {
  createFragmentContainer,
  graphql,
  MappedFragmentProps,
  RemoveRelayProp,
} from "react-relay";

/* BESPOKE START <<imports>> */
import {
  Card,
  CardMedia,
  CardMediaContent,
  CardPrimaryAction,
} from "@rmwc/card";
import {
  Cell,
  Grid,
} from "@material/react-layout-grid";
import List, {ListItem, ListItemGraphic, ListItemText} from "@material/react-list";
import {
  Headline2,
  Headline4,
  Body1,
} from "@material/react-typography";
import MaterialIcon from '@material/react-material-icon';

import {
  goto,
} from "../utility";

import {
  ContentQuery,
} from "./__generated__/ContentQuery.graphql";
/* BESPOKE END <<imports>> */

export interface IContentProps {
  data: ContentQuery;
}

class __Content extends React.Component<IContentProps> {

  public render(
  ): JSX.Element {
    /* BESPOKE START <<render>> */
    return (
      <Grid>
        <Cell columns={12}>
          <Headline2>
            A confidently immature starting point
          </Headline2>
        </Cell>
        <Cell columns={12}>
          <Body1>
            The hardest part of building a new dynamic website is avoiding
            all the dragons. Starting a development environment can freeze us
            with choice overload.
            {" "}
            <Body1
              class="textSecondaryOnBackground"
              onClick={(): void => { goto("https://github.com/AriChivukula/opinionated.baby/"); }}>
              Opinionated Baby
            </Body1>
            {" "}
            solves this by moving the starting line past the quagmire of setup
            and into the pleasure of production logic.
          </Body1>
        </Cell>
        <Cell columns={12}>
          <Headline2>
            Important choices I made for you
          </Headline2>
        </Cell>
        {this.renderTools()}
        <Cell columns={12}>
          <Headline2>
            <span style={{textDecoration: "line-through"}}>
              Self justification
            </span>
            {" "}
            Philosophy
          </Headline2>
        </Cell>
        <Cell columns={12}>
          <Body1>
            This framework is one-size-fits-me. It's an open source
            version of a system I use when building complex websites.
            Anyone may attempt to use, critique, or contribute to it. The
            consistency with which feedback is incorporated will be nothing
            short of capricious. My general mission and purpose is to support
            the vitality and happy, healthy development of our
            {" "}
            <Body1
              class="textSecondaryOnBackground"
              onClick={(): void => { goto("http://www.nic.baby/policies.html"); }}>
              babies and children
            </Body1>
            .
          </Body1>
        </Cell>
        <Cell columns={12}>
          <Headline2>
            Release history
          </Headline2>
        </Cell>
        {this.renderReleases()}
      </Grid>
    );
    /* BESPOKE END <<render>> */
  }

  /* BESPOKE START <<implementation>> */
  private renderReleases(
  ): JSX.Element {
    return (
      <>
        {Array(...(this.props.data.releases || [])).sort((a: any, b: any) => parseInt(a.id) - parseInt(b.id)).map((item: any, index: number) => (
          <Cell columns={4} key={index}>
            <Card>
              <CardPrimaryAction>
                <CardMedia
                  square
                  style={{backgroundImage: `url(images/v${item.id}.jpg)`}}
                />
                <Headline4
                  style={{padding: "1rem"}}
                  onClick={(): void => { goto(`https://github.com/AriChivukula/opinionated.baby/releases/tag/v${item.id}/`); }}>
                  <Headline4 class="textSecondaryOnBackground">
                    v{item.id}
                  </Headline4>
                  <br />
                  {item.title}
                  <br />
                  {item.subtitle}
                </Headline4>
              </CardPrimaryAction>
            </Card>
          </Cell>
        ))}
      </>
    );
  }

  private renderTools(
  ): JSX.Element {
    return (
      <>
        {this.props.data.tools!.map((item: any, index: number) => (
          <Cell columns={3} key={index}>
            <List twoLine>
              <a onClick={(): void => { goto(item.link); }}>
                <ListItem>
                  <ListItemGraphic graphic={<MaterialIcon icon={item.icon} />} />
                  <ListItemText
                    primaryText={item.title}
                    secondaryText={item.id}
                  />
                <ListItem/>
              </a>
            </List>
          </Cell>
        ))}
      </>
    );
  }
  /* BESPOKE END <<implementation>> */
}

const _Content: React.ComponentType<MappedFragmentProps<RemoveRelayProp<IContentProps>>> = createFragmentContainer(
  __Content,
  /* BESPOKE START <<relay>> */
  graphql`
    fragment ContentQuery on Query {
      releases {
        id
        title
        subtitle
      }
      tools {
        id
        icon
        link
        title
      }
    }
  `,
  /* BESPOKE END <<relay>> */
);

export { _Content as Content };
