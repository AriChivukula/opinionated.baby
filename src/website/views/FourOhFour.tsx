/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::FourOhFourReact>>
 * BESPOKE<<imports, render>>
 * SIGNED<<n2H56tSGN93qWOdwfEeh8BWEt/NWibC5yiJszD2OAFNpDRjTevdTIDPYeSaP1AQGUuKD89kyBQxUpODtK5un9Q==>>
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

// @ts-lint
export const FourOhFour: React.ComponentType = polyfill(_FourOhFour);
