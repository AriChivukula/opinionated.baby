import { EntityManager, getManager } from "typeorm";

import { User } from "../entity/User";
import { genAccessTokenInfo, getLoginURL } from "../google";
import { dbConnection } from "../server";

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

test(
  "Login",
  async (): Promise<void> => {
    await dbConnection();
    const entityManager: EntityManager = getManager();
    const loggedin: User | undefined = await entityManager.findOneById(User, 1);
    expect(loggedin)
      .not
      .toBeDefined();
  },
);
