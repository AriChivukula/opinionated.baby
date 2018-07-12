/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::Content>>
 * BESPOKE<<imports, render>>
 * SIGNED<<HGQ2naQjVCG8EdBOFyN/JsFC80EWUKgn2zE8tGwn+dqCbgH3trBWCjDHwkH1zccsaIX6CG1sxWtebWDqSSjozA==>>
 */

import * as React from "react";

/* BESPOKE START <<imports>> */
import {
  Card,
  CardMedia,
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

interface ITools {
  graphic: string;
  link: string;
  subtitle: string;
  title: string;
}

interface IReleases {
  titleA: string;
  titleB: string;
  version: string;
}

const tools: ITools[] = [
  {
    graphic: "star",
    link: "https://www.terraform.io/",
    subtitle: "Orchestration",
    title: "Terraform",
  },
  {
    graphic: "memory",
    link: "https://aws.amazon.com/lambda/",
    subtitle: "Server(less)",
    title: "Lambda",
  },
  {
    graphic: "bug_report",
    link: "https://rollbar.com/",
    subtitle: "Debugging",
    title: "Rollbar",
  },
  {
    graphic: "share",
    link: "https://travis-ci.org/",
    subtitle: "CI/CD",
    title: "Travis CI",
  },
  {
    graphic: "language",
    link: "https://www.typescriptlang.org/",
    subtitle: "Language",
    title: "TypeScript",
  },
  {
    graphic: "extension",
    link: "https://github.com/AriChivukula/typescriptase",
    subtitle: "Code Generation",
    title: "Typescriptase",
  },
  {
    graphic: "cached",
    link: "https://nodejs.org/en/",
    subtitle: "Runtime",
    title: "Node.js",
  },
  {
    graphic: "unarchive",
    link: "https://www.yarnpkg.com/",
    subtitle: "Dependency",
    title: "yarn",
  },
  {
    graphic: "playlist_add_check",
    link: "https://mochajs.org/",
    subtitle: "Testing",
    title: "Mocha",
  },
  {
    graphic: "line_style",
    link: "https://codeclimate.com/",
    subtitle: "Quality",
    title: "Code Climate",
  },
  {
    graphic: "graphic_eq",
    link: "https://graphql.org/",
    subtitle: "API",
    title: "GraphQL",
  },
  {
    graphic: "widgets",
    link: "https://tinkerpop.apache.org/",
    subtitle: "Model",
    title: "Tinkerpop",
  },
  {
    graphic: "flip_to_front",
    link: "https://reactjs.org/",
    subtitle: "Interface",
    title: "React",
  },
  {
    graphic: "build",
    link: "https://facebook.github.io/relay/",
    subtitle: "Fetch",
    title: "Relay",
  },
  {
    graphic: "local_library",
    link: "https://material.io/components/web/",
    subtitle: "Theme",
    title: "Material Design",
  },
  {
    graphic: "style",
    link: "https://sass-lang.com/",
    subtitle: "Style",
    title: "SASS",
  },
];

function renderContent(
): JSX.Element {
  return (
    <>
      {tools.map((item: ITools, index: number) => (
        <GridCell span={3} key={index}>
          <List twoLine>
            <a onClick={(): void => { goto(item.link); }}>
              <SimpleListItem
                graphic={item.graphic}
                text={item.title}
                secondaryText={item.subtitle}
              />
            </a>
          </List>
        </GridCell>
      ))}
    </>
  );
}

const releases: IReleases[] = [
  { titleA: "Bossy", titleB: "Biker", version: "v9" },
  { titleA: "Wild", titleB: "Warrior", version: "v8" },
  { titleA: "Pragmatic", titleB: "Plotter", version: "v7" },
  { titleA: "Radical", titleB: "Robot", version: "v6" },
  { titleA: "Fierce", titleB: "Feline", version: "v5" },
  { titleA: "Staunch", titleB: "Sibling", version: "v4" },
  { titleA: "Tilted", titleB: "Turtle", version: "v3" },
  { titleA: "Assertive", titleB: "Actor", version: "v2" },
  { titleA: "Dogged", titleB: "Dapper", version: "v1" },
  { titleA: "Cocksure", titleB: "Castle", version: "v0" },
];

function renderReleases(
): JSX.Element {
  return (
    <>
      {releases.map((item: IReleases, index: number) => (
        <GridCell span={4} key={index}>
          <Card>
            <CardPrimaryAction
              onClick={(): void => { goto(`https://github.com/AriChivukula/opinionated.baby/releases/tag/${item.version}/`); }}>
              <CardMedia
                square
                style={{backgroundImage: `url(images/${item.version}.jpg)`}}
              />
              <Typography
                use="headline4"
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
    </>
  );
}
/* BESPOKE END <<imports>> */

export function _Content(
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
      {renderContent()}
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
      {renderReleases()}
    </Grid>
  );
  /* BESPOKE END <<render>> */
}

export { _Content as Content };
