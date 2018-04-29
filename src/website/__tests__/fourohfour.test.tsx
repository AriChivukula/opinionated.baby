/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/__tests__/fourohfour.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<</zYVSQmAsQsoJhj2L2faY4pCyMx7kovNbWy7P8xvhgE+cBQB7LUMILtPYv4tszpqLNk9HtAVjcxxsstWoIIP/Q==>>
 */

import "jest-enzyme";
import "mutationobserver-shim";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import {
  FourOhFour,
} from "../views/FourOhFour";


/* BESPOKE START <<DEPRECATE>> */
Enzyme.configure({
  adapter: new Adapter(),
});

test(
  "FourOhFour",
  async (): Promise<void> => {
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
  },
);
/* BESPOKE END <<DEPRECATE>> */
