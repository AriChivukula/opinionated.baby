/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/tests.ts::fourohfourTest>>
 * BESPOKE<<imports, beforeAll, afterAll, beforeEach, afterEach, FourOhFour>>
 * SIGNED<<qymphyWDfNzM6mC+vb8XMrJeOj9fjVXyEfiiIm7EkJZusWz6a6SyqlpjsohYgJBjbOnLCaIX5KnezAHepNsQdw==>>
 */

/* BESPOKE START <<imports>> */
import "jest-enzyme";
import "mutationobserver-shim";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import {
  FourOhFour,
} from "../views/FourOhFour";

Enzyme.configure({
  adapter: new Adapter(),
});
/* BESPOKE END <<imports>> */

beforeAll(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeAll>> */
    /* BESPOKE END <<beforeAll>> */
  },
);

afterAll(
  async (): Promise<void> => {
    /* BESPOKE START <<afterAll>> */
    /* BESPOKE END <<afterAll>> */
  },
);

beforeEach(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeEach>> */
    /* BESPOKE END <<beforeEach>> */
  },
);

afterEach(
  async (): Promise<void> => {
    /* BESPOKE START <<afterEach>> */
    /* BESPOKE END <<afterEach>> */
  },
);

test(
  "FourOhFour",
  async (): Promise<void> => {
    /* BESPOKE START <<FourOhFour>> */
    expect(
      Enzyme.render(
        Enzyme.mount(
          <BrowserRouter>
            <FourOhFour />
          </BrowserRouter>,
        ),
      ),
    )
      .toMatchSnapshot();
    /* BESPOKE END <<FourOhFour>> */
  },
);
