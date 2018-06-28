/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::FourOhFourReact>>
 * BESPOKE<<imports, render>>
 * SIGNED<<sTCnMB3AjDN/AsVbuIVFN3hP7ZzvxETW4wvosPT/fz9cDeBQdqXCN5kfwOkNLmCXzHIL1ewMf2tOx/I9K2jhzw==>>
 */

import * as React from "react";
import {
  polyfill,
} from "react-lifecycles-compat";

/* BESPOKE START <<imports>> */
import {
  Link,
} from "react-router-dom";
import {
  Typography,
} from "rmwc/Typography";
/* BESPOKE END <<imports>> */

export function _FourOhFour(
): JSX.Element {
  /* BESPOKE START <<render>> */
  return (
    <Link to="/">
      <Typography use="headline2" tag="div">
        FourOhFour
      </Typography>
    </Link>
  );
  /* BESPOKE END <<render>> */
}

polyfill(_FourOhFour);
export const FourOhFour: React.ComponentType = _FourOhFour;
