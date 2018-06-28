/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::FourOhFourReact>>
 * BESPOKE<<imports, render>>
 * SIGNED<<5A3AGWjFsbLQWSY5gtb7ah98Fj53Y3uZum4Ik7ft8w/Lhsdb9ApAFpM3mLqnUzY8asJCTcmWKPSlFQ9RvuFYmA==>>
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

export function _FourOhFour,(
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

export const FourOhFour: React.ComponentType = polyfill(_FourOhFour);
