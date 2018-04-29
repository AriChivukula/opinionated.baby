import { Bespoke, Import, Module, Renderable } from "typescriptase";

export const module: Renderable = Module.new({
  content: [
    Bespoke.new({name: "DEPRECATE"}),
  ],
  destination: "src/server/__tests__/db.test.ts",
  imports: [
    Import.new({
      module: "typeorm",
      names: ["getRepository"],
    }),
    Import.new({
      module: "../db",
      names: ["genSetupDB"],
    }),
    Import.new({
      module: "../entity/User",
      names: ["User"],
    }),
  ],
});
