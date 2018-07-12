/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/test.ts::Google>>
 * BESPOKE<<test>>
 * SIGNED<<4MD6HpCxEHJEieR4CvNaKXz0/Dkn5A4pwUpvUeSMYjRxHMbKdAMlTqAdsfWS0klw+sJtm2qRxU5a0lVikTwbKg==>>
 */

/* BESPOKE START <<test>> */
import "mocha";

import * as chai from "chai";

import {
  getLoginURL,
} from "../server/google";

it(
  "getLoginURL",
  async (): Promise<void> => {
    const url: string = getLoginURL();
    chai.expect(url).to.include("accounts.google.com");
  },
);
/* BESPOKE END <<test>> */
