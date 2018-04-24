import * as React from "react";
import { Link } from "react-router-dom";
import { Typography } from "rmwc";

export function FourOhFour(): JSX.Element {
  return (
    <Link to="/">
      <Typography use="display4" tag="div">
        FourOhFour
      </Typography>
    </Link>
  );
}
