/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/db.ts::module>>
 * BESPOKE<<genSetupDB, genUserForAccessToken>>
 * SIGNED<<Y84cuycv+XtGSB0uosxzy3VIR+SgwFtq42TvVzHX2l8Nb3kw+v3lccifi4LkSq5XG0P3iexTzxA2nZNQVhhLcQ==>>
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
    user.id = info.data.user_id;
    user.email = info.data.email;
    await getRepository(User)
      .save(user);
  }

  return user;
  /* BESPOKE END <<genUserForAccessToken>> */
}
