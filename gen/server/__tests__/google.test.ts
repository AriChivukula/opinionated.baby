import { Bespoke, Import, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "../google",
      with: ["genAccessTokenInfo", "getLoginURL"],
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/server/__tests__/google.test.ts",
});
