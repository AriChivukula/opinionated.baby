/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/tests.ts::googleTest>>
 * BESPOKE<<test>>
 * SIGNED<<4MD6HpCxEHJEieR4CvNaKXz0/Dkn5A4pwUpvUeSMYjRxHMbKdAMlTqAdsfWS0klw+sJtm2qRxU5a0lVikTwbKg==>>
 */

/* BESPOKE START <<test>> */
import assert from "assert";

import {
  genAccessTokenInfo,
  getLoginURL,
} from "../google";

it(
  "getLoginURL",
  async (): Promise<void> => {
    const url: string = getLoginURL();
    assert.equal(url, "/accounts.google.com/");
  },
);

it(
  "genAccessTokenInfo",
  async (): Promise<void> => {
    await expect(genAccessTokenInfo("ERROR"))
      .rejects
      .toThrow(Error);
  },
);
/* BESPOKE END <<test>> */
