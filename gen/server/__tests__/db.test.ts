import { Bespoke, Import, Module } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "typeorm",
      with: ["getRepository"],
    }),
    Import.new({
      name: "../db",
      with: ["genSetupDB"],
    }),
    Import.new({
      name: "../entity/User",
      with: ["User"],
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/server/__tests__/db.test.ts",
});
