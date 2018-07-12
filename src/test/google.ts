/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/test.ts::google>>
 * BESPOKE<<test>>
 * SIGNED<<4MD6HpCxEHJEieR4CvNaKXz0/Dkn5A4pwUpvUeSMYjRxHMbKdAMlTqAdsfWS0klw+sJtm2qRxU5a0lVikTwbKg==>>
 */

/* BESPOKE START <<test>> */
import "mocha";

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";

import {
  genAccessTokenInfo,
  getLoginURL,
} from "../server/google";

chai.use(chaiAsPromised);

it(
  "getLoginURL",
  async (): Promise<void> => {
    const url: string = getLoginURL();
    chai.expect(url).to.include("accounts.google.com");
  },
);
/* BESPOKE END <<test>> */
