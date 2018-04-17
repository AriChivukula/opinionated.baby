import * as React from "react";
import {
  Card,
  CardMedia,
  CardPrimaryAction,
  Grid,
  GridCell,
  List,
  SimpleListItem,
  Typography,
} from "rmwc";

import { goto } from "../util";

const maxWidth: number = 12;
const minWidth: number = 3;

interface IReleases {
  titleA: string;
  titleB: string;
  version: string;
}

const releases: IReleases[] = [
  { titleA: "Tilted", titleB: "Turtle", version: "v3" },
  { titleA: "Assertive", titleB: "Actor", version: "v2" },
  { titleA: "Dogged", titleB: "Dapper", version: "v1" },
  { titleA: "Cocksure", titleB: "Castle", version: "v0" },
];

export const Content: () => JSX.Element =
  (): JSX.Element => (
    <Grid>
      <GridCell span={maxWidth}>
        <Typography use="display2" tag="div">
          A confidently immature starting point
        </Typography>
      </GridCell>
      <GridCell span={maxWidth}>
        <Typography use="subheading2" tag="div">
          The hardest part of building a new dynamic website is avoiding
          all the dragons. Starting a development environment can freeze us
          with choice overload.
          {" "}
          <Typography
            theme="text-secondary-on-background"
            onClick={(): void => { goto("https://github.com/arichiv/opinionated.baby/"); }}>
            Opinionated Baby
          </Typography>
          {" "}
          solves this by moving the starting line past the quagmire of setup
          and into the pleasure of production logic.
        </Typography>
      </GridCell>
      <GridCell span={maxWidth}>
        <Typography use="display2" tag="div">
          Important choices I made for you
        </Typography>
      </GridCell>
      <GridCell span={minWidth}>
        <List twoLine>
          <SimpleListItem
            graphic="memory"
            text="Lambda"
            secondaryText="Server(less)"
            onClick={(): void => { goto("https://aws.amazon.com/lambda/"); }}
          />
          <SimpleListItem
            graphic="share"
            text="PostgreSQL"
            secondaryText="Database"
            onClick={(): void => { goto("https://www.postgresql.org/"); }}
          />
          <SimpleListItem
            graphic="storage"
            text="S3"
            secondaryText="Storage"
            onClick={(): void => { goto("https://aws.amazon.com/s3/"); }}
          />
          <SimpleListItem
            graphic="bug_report"
            text="Travis CI"
            secondaryText="CI/CD"
            onClick={(): void => { goto("https://travis-ci.org/"); }}
          />
        </List>
      </GridCell>
      <GridCell span={minWidth}>
        <List twoLine>
          <SimpleListItem
            graphic="language"
            text="TypeScript"
            secondaryText="Language"
            onClick={(): void => { goto("https://www.typescriptlang.org/"); }}
          />
          <SimpleListItem
            graphic="description"
            text="Babel"
            secondaryText="Transpiler"
            onClick={(): void => { goto("https://babeljs.io/"); }}
          />
          <SimpleListItem
            graphic="cached"
            text="Node.js"
            secondaryText="Runtime"
            onClick={(): void => { goto("https://nodejs.org/en/"); }}
          />
          <SimpleListItem
            graphic="desktop_mac"
            text="Electron"
            secondaryText="Desktop"
            onClick={(): void => { goto("https://electronjs.org/"); }}
          />
        </List>
      </GridCell>
      <GridCell span={minWidth}>
        <List twoLine>
          <SimpleListItem
            graphic="unarchive"
            text="yarn"
            secondaryText="Dependency"
            onClick={(): void => { goto("https://yarnpkg.com/en/"); }}
          />
          <SimpleListItem
            graphic="build"
            text="Gulp"
            secondaryText="Toolchain"
            onClick={(): void => { goto("https://gulpjs.com/"); }}
          />
          <SimpleListItem
            graphic="playlist_add_check"
            text="Jest"
            secondaryText="Testing"
            onClick={(): void => { goto("https://facebook.github.io/jest/"); }}
          />
          <SimpleListItem
            graphic="graphic_eq"
            text="GraphQL"
            secondaryText="API"
            onClick={(): void => { goto("https://graphql.org/"); }}
          />
        </List>
      </GridCell>
      <GridCell span={minWidth}>
        <List twoLine>
          <SimpleListItem
            graphic="flip_to_front"
            text="React"
            secondaryText="Interface"
            onClick={(): void => { goto("https://reactjs.org/"); }}
          />
          <SimpleListItem
            graphic="local_library"
            text="Relay"
            secondaryText="Fetch"
            onClick={(): void => { goto("http://facebook.github.io/relay/"); }}
          />
          <SimpleListItem
            graphic="style"
            text="Material Design"
            secondaryText="Theme"
            onClick={(): void => { goto("https://material.io/components/web/"); }}
          />
          <SimpleListItem
            graphic="line_style"
            text="SASS"
            secondaryText="Style"
            onClick={(): void => { goto("https://sass-lang.com/"); }}
          />
        </List>
      </GridCell>
      <GridCell span={maxWidth}>
        <Typography use="display2" tag="div">
          <span style={{textDecoration: "line-through"}}>
            Self justification
          </span>
          {" "}
          Philosophy
        </Typography>
      </GridCell>
      <GridCell span={maxWidth}>
        <Typography use="subheading2" tag="div">
          This framework is one-size-fits-me. It's an open source
          version of a system I use when building complex websites.
          Anyone may attempt to use, critique, or contribute to it. The
          consistency with which feedback is incorporated will be nothing
          short of capricious. My general mission and purpose is to support
          the vitality and happy, healthy development of our
          {" "}
          <Typography
            theme="text-secondary-on-background"
            onClick={(): void => { goto("http://www.nic.baby/policies.html"); }}>
            babies and children
          </Typography>
          .
        </Typography>
      </GridCell>
      <GridCell span={maxWidth}>
        <Typography use="display2" tag="div">
          Release history
        </Typography>
      </GridCell>
      {releases.map(
        (item: IReleases, index: number) => (
        <GridCell span={minWidth} key={index}>
          <Card>
            <CardPrimaryAction
              onClick={(): void => { goto(`https://github.com/arichiv/opinionated.baby/releases/tag/${item.version}/`); }}>
              <CardMedia
                square
                style={{backgroundImage: `url(images/${item.version}.jpg)`}}
              />
              <Typography
                use="display1"
                style={{padding: "1rem"}}>
                <Typography theme="text-secondary-on-background">
                  {item.version}
                </Typography>
                <br />
                {item.titleA}
                <br />
                {item.titleB}
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
      ))}
    </Grid>
  );
