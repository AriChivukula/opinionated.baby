import "jest-enzyme";
import "mutationobserver-shim";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { FourOhFour } from "../views/FourOhFour";

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
