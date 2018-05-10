import {
  Jest,
  Module,
} from "typescriptase";

export const dbTest: Module = Jest({
  destination: "src/server/__tests__/db.test.ts",
  tests: [
    "User",
  ],
});

export const googleTest: Module = Jest({
  destination: "src/server/__tests__/google.test.ts",
  tests: [
    "getLoginURL",
    "genAccessTokenInfo",
  ],
});
