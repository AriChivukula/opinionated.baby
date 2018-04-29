/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/__tests__/db.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<GN34SU740JCURqCRWoLW8beZiSezAqJJx9pKabqO4Sjzmh/00R7gT1W9coIggroJNS0V5/oK+pw1wConHjlPQw==>>
 */

import { getRepository } from "typeorm";

import { genSetupDB } from "../db";
import { User } from "../entity/User";

/* BESPOKE START <<DEPRECATE>> */
beforeAll(
  async (): Promise<void> => {
    await genSetupDB();
  },
);

test(
  "User",
  async (): Promise<void> => {
    const loggedin: User | undefined = await getRepository(User)
      .findOne(1);
    expect(loggedin)
      .not
      .toBeDefined();
  },
);
/* BESPOKE END <<DEPRECATE>> */
