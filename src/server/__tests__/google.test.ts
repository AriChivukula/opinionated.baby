/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/__tests__/google.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<UalGILUNJ6aLZjGPHNVNtihJ+Itp27vvW9Srw2A5uEPp91NVrZ9AndPTzQNjq03dppel7PzIoAxB4tITt56V4w==>>
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
