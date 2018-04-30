/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/__tests__/db.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<bfRyRd6MqmAzRQWBHuVonNZ3LRzOLoMJDJED5XsIfXg8Kch+65eJE9csIpt7FXmQHHprB5lARwQYZBCzELpDhg==>>
 */

import {
  getRepository,
} from "typeorm";

import {
  genSetupDB,
} from "../db";
import {
  User,
} from "../entity/User";

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
