/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/tests.ts::googleTest>>
 * BESPOKE<<imports, beforeAll, afterAll, beforeEach, afterEach, getLoginURL, genAccessTokenInfo>>
 * SIGNED<<vUOisHxAamMRwL8PCqh8BOBLLdOL6noNhhx1i+ZimSYE+PXqLUuoyBT2bYBt7m2eGss6ydIbdDbyDE5UYx+1fA==>>
 */

/* BESPOKE START <<imports>> */
import {
  genAccessTokenInfo,
  getLoginURL,
} from "../google";
/* BESPOKE END <<imports>> */

beforeAll(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeAll>> */
    /* BESPOKE END <<beforeAll>> */
  },
);

afterAll(
  async (): Promise<void> => {
    /* BESPOKE START <<afterAll>> */
    /* BESPOKE END <<afterAll>> */
  },
);

beforeEach(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeEach>> */
    /* BESPOKE END <<beforeEach>> */
  },
);

afterEach(
  async (): Promise<void> => {
    /* BESPOKE START <<afterEach>> */
    /* BESPOKE END <<afterEach>> */
  },
);

test(
  "getLoginURL",
  async (): Promise<void> => {
    /* BESPOKE START <<getLoginURL>> */
    const url: string = getLoginURL();
    expect(url)
      .toMatch("/accounts.google.com/");
    /* BESPOKE END <<getLoginURL>> */
  },
);

test(
  "genAccessTokenInfo",
  async (): Promise<void> => {
    /* BESPOKE START <<genAccessTokenInfo>> */
    await expect(genAccessTokenInfo("ERROR"))
      .rejects
      .toThrow(Error);
    /* BESPOKE END <<genAccessTokenInfo>> */
  },
);
