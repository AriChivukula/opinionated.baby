import {
  Jest,
  Module,
} from "typescriptase";

export const googleTest: Module = Jest({
  destination: "src/server/__tests__/google.test.ts",
  tests: [
    "getLoginURL",
    "genAccessTokenInfo",
  ],
});
