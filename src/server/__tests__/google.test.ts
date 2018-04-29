/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/__tests__/google.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<Dr+DlQ+ZSjZqEstWIlKkKPjLbgFuI9TKu34TvBcnaRMAPuzTWYQKRjPgiVmAQ4iizIqNBDTpGbshiZmVhF6SWQ==>>
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
