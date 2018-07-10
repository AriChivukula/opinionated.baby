/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/tests.ts::googleTest>>
 * BESPOKE<<test>>
 * SIGNED<<4MD6HpCxEHJEieR4CvNaKXz0/Dkn5A4pwUpvUeSMYjRxHMbKdAMlTqAdsfWS0klw+sJtm2qRxU5a0lVikTwbKg==>>
 */

/* BESPOKE START <<test>> */
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
/* BESPOKE END <<test>> */
