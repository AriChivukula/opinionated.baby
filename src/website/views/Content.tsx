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
} from "rmwc/Card";
import {
  Grid,
  GridCell,
} from "rmwc/Grid";
import {
  List,
  SimpleListItem,
} from "rmwc/List";
import {
  Typography,
} from "rmwc/Typography";

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
        <GridCell span={12}>
          <Typography use="headline2" tag="div">
            A confidently immature starting point
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="body1" tag="div">
            The hardest part of building a new dynamic website is avoiding
            all the dragons. Starting a development environment can freeze us
            with choice overload.
            {" "}
            <Typography
              use="body1"
              theme="text-secondary-on-background"
              onClick={(): void => { goto("https://github.com/AriChivukula/opinionated.baby/"); }}>
              Opinionated Baby
            </Typography>
            {" "}
            solves this by moving the starting line past the quagmire of setup
            and into the pleasure of production logic.
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="headline2" tag="div">
            Important choices I made for you
          </Typography>
        </GridCell>
        {this.renderTools()}
        <GridCell span={12}>
          <Typography use="headline2" tag="div">
            <span style={{textDecoration: "line-through"}}>
              Self justification
            </span>
            {" "}
            Philosophy
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="body1" tag="div">
            This framework is one-size-fits-me. It's an open source
            version of a system I use when building complex websites.
            Anyone may attempt to use, critique, or contribute to it. The
            consistency with which feedback is incorporated will be nothing
            short of capricious. My general mission and purpose is to support
            the vitality and happy, healthy development of our
            {" "}
            <Typography
              use="body1"
              theme="text-secondary-on-background"
              onClick={(): void => { goto("http://www.nic.baby/policies.html"); }}>
              babies and children
            </Typography>
            .
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="headline2" tag="div">
            Release history
          </Typography>
        </GridCell>
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
        {this.props.data.releases!.map((item: any, index: number) => (
          <GridCell span={4} key={index}>
            <Card>
              <CardPrimaryAction
                onClick={(): void => { goto(`https://github.com/AriChivukula/opinionated.baby/releases/tag/v${item.id}/`); }}>
                <CardMedia
                  square
                  style={{backgroundImage: `url(images/v${item.id}.jpg)`}}
                />
                <Typography
                  use="headline4"
                  style={{padding: "1rem"}}>
                  <Typography use="headline4" theme="text-secondary-on-background">
                    v{item.id}
                  </Typography>
                  <br />
                  {item.title}
                  <br />
                  {item.subtitle}
                </Typography>
              </CardPrimaryAction>
            </Card>
          </GridCell>
        ))}
      </>
    );
  }

  private renderTools(
  ): JSX.Element {
    return (
      <>
        {this.props.data.tools!.map((item: any, index: number) => (
          <GridCell span={3} key={index}>
            <List twoLine>
              <a onClick={(): void => { goto(item.link); }}>
                <SimpleListItem
                  graphic={item.icon}
                  text={item.title}
                  secondaryText={item.id}
                />
              </a>
            </List>
          </GridCell>
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
