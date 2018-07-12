/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/test.ts::Neptune>>
 * BESPOKE<<test>>
 * SIGNED<<4MD6HpCxEHJEieR4CvNaKXz0/Dkn5A4pwUpvUeSMYjRxHMbKdAMlTqAdsfWS0klw+sJtm2qRxU5a0lVikTwbKg==>>
 */

/* BESPOKE START <<test>> */
import "mocha";

import * as chai from "chai";

import {
  neptuneInit,
  createOrUpdateUser,
} from "../server/neptune";

it(
  "createOrUpdateUser",
  async (): Promise<void> => {
    await neptuneInit();
    await createOrUpdateUser();
  },
);
/* BESPOKE END <<test>> */
