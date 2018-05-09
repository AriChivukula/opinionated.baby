/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/views.ts::FourOhFourReact>>
 * BESPOKE<<imports, render>>
 * SIGNED<<AxbaFWc8b0iRT5UjUMQt2/a8mwRNQxOELQy3qLDQPesiDEasnJSv0hqbfVASTqmwhtQB13oHnGri1pE7xOSl1Q==>>
 */

import * as React from "react";

/* BESPOKE START <<imports>> */
import {
  Link,
} from "react-router-dom";
import {
  Typography,
} from "rmwc";
/* BESPOKE END <<imports>> */

export async function FourOhFour(
): Promise<JSX.Element> {
  /* BESPOKE START <<render>> */
  return (
    <Link to="/">
      <Typography use="display4" tag="div">
        FourOhFour
      </Typography>
    </Link>
  );
  /* BESPOKE END <<render>> */
}
