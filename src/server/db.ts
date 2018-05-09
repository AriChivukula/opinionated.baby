/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/db.ts::module>>
 * BESPOKE<<genSetupDB, genUserForAccessToken>>
 * SIGNED<<i8J5R+WP8/e/uASbkf6b3PIKtWLgnROnCwP/WWyVyc/x1vdYDM40JpHHdA9aQqB0iThjf2DJIEsyWJ0B/WwcTQ==>>
 */

import {
  createConnection,
  getRepository,
} from "typeorm";

import {
  User,
} from "./entity/User";
import {
  genAccessTokenInfo,
  IAccessTokenInfo,
} from "./google";

export async function genSetupDB(
): Promise<void> {
  /* BESPOKE START <<genSetupDB>> */
  await createConnection({
    database: process.env.DB_NAME,
    entities: [User],
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string, 10),
    type: "postgres",
    username: process.env.DB_USERNAME,
  });
  /* BESPOKE END <<genSetupDB>> */
}

export async function genUserForAccessToken(
  accessToken: string,
): Promise<User> {
  /* BESPOKE START <<genUserForAccessToken>> */
  const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);
  let user: User | undefined = await getRepository(User)
    .findOne(info.data.user_id);
  if (user === undefined) {
    user = new User();
    if (info.data.user_id === undefined) {
      throw new Error("Missing user id");
    }
    user.id = info.data.user_id;
    if (info.data.email === undefined) {
      throw new Error("Missing email");
    }
    user.email = info.data.email;
    await getRepository(User)
      .save(user);
  }

  return user;
  /* BESPOKE END <<genUserForAccessToken>> */
}
