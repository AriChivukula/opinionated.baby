/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/__tests__/db.test.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<HaQ+sO4ACf1iYcseDHwV6+Cw4XgjI9KSemPuSN52Lqj1ae/oXuQ60TXcdNdsz2rsvBPK6sZKZdBoAFHV8lcZPg==>>
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
