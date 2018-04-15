import * as React from "react";
import { Link } from "react-router-dom";
import { Typography } from "rmwc";

// tslint:disable-next-line:variable-name
export const FourOhFour: () => React.Element =
  (): React.Element => (
    <Link to="/">
      <Typography use="display4" tag="div">
        FourOhFour
      </Typography>
    </Link>
  );
