/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::FourOhFourReact>>
 * BESPOKE<<imports, render>>
 * SIGNED<<hOqvB+7Y3dPhm7Hr3I6tXSjkwmBleUL1GhKD5fv8nVsTA/m9MxxFgHi+wyeC4RMfw4bI1thpn19F1t20zP+UBA==>>
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

export { _FourOhFour as FourOhFour };
