import * as React from "react";
import { Link } from "react-router-dom";
import { Typography } from "rmwc";

export const FourOhFour: () => JSX.Element =
  (): JSX.Element => (
    <Link to="/">
      <Typography use="display4" tag="div">
        FourOhFour
      </Typography>
    </Link>
  );
