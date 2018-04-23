import { getRepository } from "typeorm";

import { dbConnection } from "../db";
import { User } from "../entity/User";

beforeAll(
  async (): Promise<void> => {
    await dbConnection();
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
