import { Bespoke, Import, Module } from "typescriptase";

export const userEntity: Module = Module.new({
  content: [
    Import.new({
      name: "typeorm",
      with: ["Column", "Entity", "PrimaryColumn"],
    }),
    Bespoke.new({
      name: "DEPRECATE",
    }),
  ],
  destination: "src/server/entity/User.ts",
});
