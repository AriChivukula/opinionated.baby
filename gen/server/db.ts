import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/db.ts",
  imports: [
    Import.new({
      module: "typeorm",
      names: ["createConnection", "getRepository"],
    }),
    Import.new({
      module: "./entity/User",
      names: ["User"],
    }),
    Import.new({
      module: "./google",
      names: ["genAccessTokenInfo", "IAccessTokenInfo"],
    }),
  ],
});
