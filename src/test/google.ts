/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/test.ts::google>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
import "mocha";

import * as chai from "chai";

import {
  genLoginURL,
} from "../server/google";

it(
  "getLoginURL",
  async (): Promise<void> => {
    const url: string = await genLoginURL();
    chai.expect(url).to.include("accounts.google.com");
  },
);
/* BESPOKE END <<custom>> */
