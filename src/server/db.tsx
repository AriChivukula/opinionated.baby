import { createConnection } from "typeorm";

import { User } from "./entity/User";

export const dbConnection: () => Promise<void> = async (): Promise<void> => {
  await createConnection({
    database: process.env.DB_NAME,
    entities: [User],
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string, 10),
    type: "postgres",
    username: process.env.DB_USERNAME,
  });
};
