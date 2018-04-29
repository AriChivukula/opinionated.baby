/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/__tests__/fourohfour.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<+PZcAC52Ew5ylQxTx8fiIs7j7tZtTqUoCVw+/R4bAAGYLTYV0zYqgAGpa4c82Pb73AWRL26+3cp+AosnFogSKA==>>
 */

import "jest-enzyme";
import "mutationobserver-shim";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { FourOhFour } from "../views/FourOhFour";

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
