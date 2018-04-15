import { EntityManager, getManager } from "typeorm";

import { User } from "../entity/user";
import { genAccessTokenInfo, getLoginURL } from "../google";

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
  "User",
  async (): Promise<void> => {
    const entityManager: EntityManager = getManager();
    const user: User | undefined = await entityManager.findOneById(User, 1);
    expect(user)
      .not
      .toBeNull();
  },
);
