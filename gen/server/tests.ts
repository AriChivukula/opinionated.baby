import {
  Jest,
  Module,
} from "typescriptase";

export const dbTest: Module = Jest(
  "src/server/__tests__/db.test.ts",
  [
    "User",
  ],
);

export const googleTest: Module = Jest(
  "src/server/__tests__/google.test.ts",
  [
    "getLoginURL",
    "genAccessTokenInfo",
  ],
);
