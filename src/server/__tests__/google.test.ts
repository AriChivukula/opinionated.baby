/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/__tests__/google.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<o4U355aXDiYcjIi9pbHK5j3o4tG4U7pVkeakqH5bQSp8xStAsx9FFp5kpB1Tih0M4DBoQ4CdlYmhnkywcnjPxA==>>
 */

import {
  genAccessTokenInfo,
  getLoginURL,
} from "../google";


/* BESPOKE START <<DEPRECATE>> */
test(
  "getLoginURL",
  async (): Promise<void> => {
    const url: string = getLoginURL();
    expect(url)
      .toMatch("/accounts.google.com/");
  },
);

test(
  "genAccessTokenInfo",
  async (): Promise<void> => {
    await expect(genAccessTokenInfo("ERROR"))
      .rejects
      .toThrow(Error);
  },
);
/* BESPOKE END <<DEPRECATE>> */
