/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/__tests__/fourohfour.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<MEuNYAQw3fIKRU4Qrv1XhG3D65ZTbfR29exZpC9WpnfhQug7+fUHn9g2LnWvvhn1FWSJd1xb2OJ/QXVxcUN1hw==>>
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
