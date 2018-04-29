import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/root.ts",
  imports: [
    Import.new({
      module: "express",
      nameDefault: "express",
    }),
    Import.new({
      module: "./db",
      names: ["genUserForAccessToken"],
    }),
    Import.new({
      module: "./google",
      names: ["genAccessToken", "getLoginURL"],
    }),
    Import.new({
      module: "./util",
      names: ["genNullOnThrow"],
    }),
  ],
});
