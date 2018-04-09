// @flow

import React, { Component } from 'react';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';
import {
  Grid,
  GridCell
} from 'rmwc/Grid';
import {
  List,
  SimpleListItem
} from 'rmwc/List';
import { Typography } from 'rmwc/Typography';

import { goto } from '../util.js';

type Props = {
}

class Content extends Component<Props> {

  render() {
    return (
      <Grid>
        <GridCell span={12}>
          <Typography use="display2" tag="div">
            A confidently immature starting point
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="subheading2" tag="div">
            The hardest part of building a new dynamic website is avoiding
            all the dragons. Starting a development environment can freeze us
            with choice overload.
            {' '}
            <Typography
              theme="text-secondary-on-background"
              onClick={goto('https://github.com/arichiv/opinionated.baby/')}>
              Opinionated Baby
            </Typography>
            {' '}
            solves this by moving the starting line past the quagmire of setup
            and into the pleasure of production logic.
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="display2" tag="div">
            Important choices I made for you
          </Typography>
        </GridCell>
        <GridCell span={3}>
          <List twoLine>
            <SimpleListItem
              graphic="memory"
              text="Lambda"
              secondaryText="Server(less)"
              onClick={goto('https://aws.amazon.com/lambda/')}
            />
            <SimpleListItem
              graphic="share"
              text="PostgreSQL"
              secondaryText="Database"
              onClick={goto('https://www.postgresql.org/')}
            />
            <SimpleListItem
              graphic="storage"
              text="S3"
              secondaryText="Storage"
              onClick={goto('https://aws.amazon.com/s3/')}
            />
            <SimpleListItem
              graphic="bug_report"
              text="Travis CI"
              secondaryText="CI/CD"
              onClick={goto('https://travis-ci.org/')}
            />
          </List>
        </GridCell>
        <GridCell span={3}>
          <List twoLine>
            <SimpleListItem
              graphic="description"
              text="JavaScript"
              secondaryText="Language"
              onClick={goto('https://developer.mozilla.org/en-US/docs/Web/JavaScript/')}
            />
            <SimpleListItem
              graphic="language"
              text="Babel"
              secondaryText="Transpiler"
              onClick={goto('https://babeljs.io/')}
            />
            <SimpleListItem
              graphic="cached"
              text="Node.js"
              secondaryText="Runtime"
              onClick={goto('https://nodejs.org/en/')}
            />
            <SimpleListItem
              graphic="desktop_mac"
              text="Electron"
              secondaryText="Desktop"
              onClick={goto('https://electronjs.org/')}
            />
          </List>
        </GridCell>
        <GridCell span={3}>
          <List twoLine>
            <SimpleListItem
              graphic="unarchive"
              text="yarn"
              secondaryText="Dependency"
              onClick={goto('https://yarnpkg.com/en/')}
            />
            <SimpleListItem
              graphic="build"
              text="Gulp"
              secondaryText="Toolchain"
              onClick={goto('https://gulpjs.com/')}
            />
            <SimpleListItem
              graphic="playlist_add_check"
              text="Jest"
              secondaryText="Testing"
              onClick={goto('https://facebook.github.io/jest/')}
            />
            <SimpleListItem
              graphic="graphic_eq"
              text="GraphQL"
              secondaryText="API"
              onClick={goto('https://graphql.org/')}
            />
          </List>
        </GridCell>
        <GridCell span={3}>
          <List twoLine>
            <SimpleListItem
              graphic="flip_to_front"
              text="React"
              secondaryText="Interface"
              onClick={goto('https://reactjs.org/')}
            />
            <SimpleListItem
              graphic="local_library"
              text="Relay"
              secondaryText="Fetch"
              onClick={goto('http://facebook.github.io/relay/')}
            />
            <SimpleListItem
              graphic="style"
              text="Material Design"
              secondaryText="Theme"
              onClick={goto('https://material.io/components/web/')}
            />
            <SimpleListItem
              graphic="line_style"
              text="SASS"
              secondaryText="Style"
              onClick={goto('https://sass-lang.com/')}
            />
          </List>
        </GridCell>
        <GridCell span={12}>
          <Typography use="display2" tag="div">
            <span style={{textDecoration: 'line-through'}}>
              Self justification
            </span>
            {' '}
            Philosophy
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="subheading2" tag="div">
            This framework is one-size-fits-me. It{'\''}s an open source
            version of a system I use when building complex websites.
            Anyone may attempt to use, critique, or contribute to it. The
            consistency with which feedback is incorporated will be nothing
            short of capricious. My general mission and purpose is to support
            the vitality and happy, healthy development of our
            {' '}
            <Typography
              theme="text-secondary-on-background"
              onClick={goto('http://www.nic.baby/policies.html')}>
              babies and children
            </Typography>
            .
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="display2" tag="div">
            Release history
          </Typography>
        </GridCell>
        <GridCell span={4}>
          <Card>
            <CardPrimaryAction onClick={goto('https://github.com/arichiv/opinionated.baby/releases/tag/v3/')}>
              <CardMedia
                square
                style={{backgroundImage: 'url(images/v3.jpg)'}}
              />
              <Typography
                use="display1"
                style={{padding: '1rem'}}>
                <Typography theme="text-secondary-on-background">
                  v3
                </Typography>
                <br />
                Tilted Turtle
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
        <GridCell span={4}>
          <Card>
            <CardPrimaryAction onClick={goto('https://github.com/arichiv/opinionated.baby/releases/tag/v2/')}>
              <CardMedia
                square
                style={{backgroundImage: 'url(images/v2.jpg)'}}
              />
              <Typography
                use="display1"
                style={{padding: '1rem'}}>
                <Typography theme="text-secondary-on-background">
                  v2
                </Typography>
                <br />
                Assertive Actor
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
        <GridCell span={4}>
          <Card>
            <CardPrimaryAction onClick={goto('https://github.com/arichiv/opinionated.baby/releases/tag/v1/')}>
              <CardMedia
                square
                style={{backgroundImage: 'url(images/v1.jpg)'}}
              />
              <Typography
                use="display1"
                style={{padding: '1rem'}}>
                <Typography theme="text-secondary-on-background">
                  v1
                </Typography>
                <br />
                Dogged Dapper
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
        <GridCell span={4}>
          <Card>
            <CardPrimaryAction onClick={goto('https://github.com/arichiv/opinionated.baby/releases/tag/v0/')}>
              <CardMedia
                square
                style={{backgroundImage: 'url(images/v0.jpg)'}}
              />
              <Typography
                use="display1"
                style={{padding: '1rem'}}>
                <Typography theme="text-secondary-on-background">
                  v0
                </Typography>
                <br />
                Cocksure Castle
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
      </Grid>
    );
  }
}

export default Content;
