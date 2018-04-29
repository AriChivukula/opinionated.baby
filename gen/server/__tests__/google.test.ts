import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/__tests__/google.test.ts",
  imports: [
    Import.new({
      module: "../google",
      names: ["genAccessTokenInfo", "getLoginURL"],
    }),
  ],
});
