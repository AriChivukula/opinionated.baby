import { createConnection, EntityManager, getManager } from "typeorm";

import { Login } from "../entity/login";
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
  "Login",
  async (): Promise<void> => {
    await createConnection();
    const entityManager: EntityManager = getManager();
    const user: Login | undefined = await entityManager.findOneById(Login, 1);
    expect(user)
      .not
      .toBeDefined();
  },
);
