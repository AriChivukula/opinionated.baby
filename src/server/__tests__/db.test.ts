/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/tests.ts::dbTest>>
 * BESPOKE<<imports, beforeAll, afterAll, beforeEach, afterEach, User>>
 * SIGNED<<DvKb6Cf/3S5ntCX98aiQeJyJIVcaQqZvKPcfygyc3ZXePJiAf8GEkuvrvvKM6h3JUEwwtU7KcDhsFhg2UCV3Sw==>>
 */

/* BESPOKE START <<imports>> */
import {
  getRepository,
} from "typeorm";

import {
  genSetupDB,
} from "../db";
import {
  User,
} from "../entity/User";
/* BESPOKE END <<imports>> */

beforeAll(
  async (): Promise<void> => {
    /* BESPOKE START <<beforeAll>> */
    await genSetupDB();
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
  "User",
  async (): Promise<void> => {
    /* BESPOKE START <<User>> */
    const loggedin: User | undefined = await getRepository(User)
      .findOne(1);
    expect(loggedin)
      .not
      .toBeDefined();
    /* BESPOKE END <<User>> */
  },
);
